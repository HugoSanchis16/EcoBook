<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'card_guid' => 'required|string',
        'status_guid' => 'required|string',
    ]);

    $status = Status::getByGuid($db, $input->status_guid);

    $card = Card::getByGuid($db, $input->card_guid);
    $card->statusid = $status->id;
    $card->update();

    $db->commit();

    Response::sendResponse([
        "status" => true,
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
