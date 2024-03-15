<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'guid' => 'required|string',
        'title' => 'required|string',
        'content' => 'sometimes|string',
    ]);

    $wiki = Wiki::getByGuid($db, $input->guid);
    $wiki->title = $input->title;
    $wiki->content = $input->content;
    $wiki->update();

    $db->commit();

    Response::sendResponse([
        "status" => true,
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
