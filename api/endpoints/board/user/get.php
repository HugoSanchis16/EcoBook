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

    $wiki = Wiki::getByGuid($db, $input->guid);

    $wiki = WikiResource::getWikiResource($wiki);

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $wiki
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
