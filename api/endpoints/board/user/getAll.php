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
        "search" => "sometimes|string",
    ]);

    $board = Board::getByGuid($db, $input->guid);
    $users = $board->users($input->search);
    $users = UserResource::getBoardUsersArrayResource(...$users);

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $users
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
