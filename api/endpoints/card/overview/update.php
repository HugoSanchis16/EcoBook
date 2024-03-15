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
        'description' => 'sometimes|string',
    ]);

    $card = Card::getByGuid($db, $input->guid);
    $card->title = $input->title;
    $card->description = $input->description;
    $card->update();

    $db->commit();

    Response::sendResponse([
        "status" => true,
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
