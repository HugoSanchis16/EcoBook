<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();
try {
    $db->beginTransaction();
    checkAuth();

    $token = getallheaders()['Authorization'];
    $session = Session::getByToken($db, $token);
    $session->endat = newDate();
    $session->update();

    $db->commit();

    Response::sendResponse([
        "status" => true
    ]);

} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}