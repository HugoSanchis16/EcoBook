<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'search' => 'sometimes|string',
    ]);

    $allBoards = Userboard::getAllBoardsByUserid($db, $userid, $input->search);
    $boards = BoardResource::getBoardsArrayResource(...$allBoards);

    $db->commit();
    Response::sendResponse(["status" => true, "boards" => $boards]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
