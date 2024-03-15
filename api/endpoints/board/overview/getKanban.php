<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'guid' => 'required|string',
    ]);

    $board = Board::getByGuid($db, $input->guid);
    $statuses = $board->status();

    $finalStatus = [];
    foreach ($statuses as $status) {
        $newStatus = StatusResource::getStatusResource($status);
        $newStatus->{'cards'} = CardResource::getCardsArrayResource(...$status->cards());
        $finalStatus[] = $newStatus;
    }

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $finalStatus
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
