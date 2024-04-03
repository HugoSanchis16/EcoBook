<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    checkAuth(false);

    $input = validate($data, [
        'guid' => 'required|string',
    ]);

    $course = Course::getByGuid($db, $input->guid);
    $course->delete();

    $db->commit();

    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
