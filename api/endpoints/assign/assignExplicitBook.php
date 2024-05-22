<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'uniqid' => 'required|numeric'
    ]);

    $copy = Copy::getByUniqId($db, $input->uniqid);

    if ($copy) {
        $isAsigned = History::checkIfCopyIsAssigned($db, $copy->id);
        if (!$isAsigned) {
            createException("The Copy is Asigned");
        } else {
            $isGoodCopy = Copy::checkIfCopyIsGoodCopy($db, $copy->uniqid);
            if (!$isGoodCopy) {
                createException("This copy is broken");
            }
        }
        logAPI($isAsigned);
    } else {
        createException("Copy Not Exist");
    }

    $db->commit();
    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
