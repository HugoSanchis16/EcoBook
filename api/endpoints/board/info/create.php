<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'name' => 'required|string',
        'description' => 'sometimes|string',
        'prefix' => 'required|string',
    ]);

    $newBoard = new Board($db);
    $newBoard->name = $input->name;
    $newBoard->description = $input->description;
    $newBoard->prefix = $input->prefix;
    $newBoard->store();

    $newBoardRelation = new Userboard($db);
    $newBoardRelation->userid = $userid;
    $newBoardRelation->boardid = $newBoard->id;
    $newBoardRelation->roleid = ADMIN_ROLE;
    $newBoardRelation->store();

    //Todo
    $todoStatus = new Status($db);
    $todoStatus->boardid = $newBoard->id;
    $todoStatus->name = 'To Do';
    $todoStatus->color = '#85C1E9';
    $todoStatus->position = 1;
    $todoStatus->store();

    //Doing
    $todoStatus = new Status($db);
    $todoStatus->boardid = $newBoard->id;
    $todoStatus->name = 'Doing';
    $todoStatus->color = '#F9E79F';
    $todoStatus->position = 2;
    $todoStatus->store();

    //Done
    $todoStatus = new Status($db);
    $todoStatus->boardid = $newBoard->id;
    $todoStatus->name = 'Done';
    $todoStatus->color = '#A9DFBF';
    $todoStatus->position = 3;
    $todoStatus->store();

    $db->commit();

    Response::sendResponse(["status" => true]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
