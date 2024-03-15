<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'board_guid' => 'required|string',
        'name' => 'required|string',
        'color' => 'required|string',
    ]);

    $board = Board::getByGuid($db, $input->board_guid);

    $allStatus = Status::getAllByBoard($db, $board->id);

    $newStatus = new Status($db);
    $newStatus->name = $input->name;
    $newStatus->color = $input->color;
    $newStatus->position = count($allStatus) + 1;
    $newStatus->store();

    $db->commit();

    Response::sendResponse(["status" => true]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
