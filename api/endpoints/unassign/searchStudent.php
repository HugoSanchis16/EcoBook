<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
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

        foreach ($copies as $copy) {
            $book = Book::get($db, $copy->book_id);
            $copy->book_name = $book->name;
        }
    } else {
        createException("Nia not exist", 409);
    }

    $copiesFormat = CopyResource::getAssignCopiesArray($copies);

    $db->commit();
    Response::sendResponse([
        "data" => $copiesFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
