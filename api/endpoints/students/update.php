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
        'nia' => 'required|numeric',
        'name' => 'required|string',
        'surnames' => 'required|string',
        'email' => 'required|string',
        'phone' => 'required|numeric',
    ]);

    $student = Student::getByGuid($db, $input->guid);
    $student->nia = $input->nia;
    $student->update();

    $profile = $student->profile();
    $profile->name = $input->name;
    $profile->surnames = $input->surnames;
    $profile->phone = $input->phone;
    $profile->email = $input->email;
    $profile->update();

    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
