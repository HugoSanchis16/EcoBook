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

    $subject = Subject::getByGuid($db, $input->guid);
    $subject->delete();

    Book::deleteBySubject($db, $subject->id);


    $db->commit();

    Response::sendResponse([]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
