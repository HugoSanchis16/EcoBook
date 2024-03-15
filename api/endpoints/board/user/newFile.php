<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'title' => 'required|string',
        'guid' => 'required|string',
    ]);

    $board = Board::getByGuid($db, $input->guid);

    $newFile = new Wiki($db);
    $newFile->title = $input->title;
    $newFile->boardid = $board->id;
    $newFile->store();

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "guid" => $newFile->guid
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
