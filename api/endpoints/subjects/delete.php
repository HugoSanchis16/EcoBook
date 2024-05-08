<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {
    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'guid' => 'required|string',
    ]);

    $subject = Subject::getByGuid($db, $input->guid);
    $books = Book::getBySubject($db, $subject->id);

    foreach ($books as $book) {
        $asigneeCopies = Book::getCountOfCopiesByBookGuid($db, $book->guid);
        if ($asigneeCopies != 0)
            createException("There are " . $asigneeCopies . " students who have copies of any book of this subject");
        else {
            $subject->delete();
            $book->delete();
        }
    }

    $db->commit();

    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
