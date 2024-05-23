<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'uniqid' => 'required|numeric',
        'subject' => 'required|string',
    ]);

    $copy = Copy::getByUniqId($db, $input->uniqid);
    $subject = Subject::getByGuid($db, $input->subject);
    $book = Book::getBySubject($db, $subject->id);

    if ($copy) {
        // History::checkIfStudentHaveABookOfACopy($db, $copy->id);
        $isAsigned = History::checkIfCopyIsAssigned($db, $copy->id);
        if (!$isAsigned) {
            createException("The Copy is already asigned", 406);
        } else {
            $isGoodCopy = Copy::checkIfCopyIsGoodCopy($db, $copy->uniqid, $book[0]->id);
            if (!$isGoodCopy) {
                createException("This copy is not available", 304);
            }
        }
    } else {
        createException("Copy Not Exist", 400);
    }

    $db->commit();
    Response::sendResponse([
        "uniqIdOfCopy" => $input->subject
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
