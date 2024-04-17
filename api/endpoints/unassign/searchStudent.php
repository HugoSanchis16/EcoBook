<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        "nia" => "required|numeric"
    ]);

    //check if user exist
    $student = Student::getByNia($db, $input->nia);
    if ($student) {
        $copies = Copy::getCopiesByUserId($db, $student->id);
    } else {
        createException("Nia not exist", 409);
    }

    $db->commit();
    Response::sendResponse([
        "data" => $copies
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
