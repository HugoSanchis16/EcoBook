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

    $book = Book::getByGuid($db, $input->guid);
    $asigneeCopies = Book::getCountOfCopiesByBookGuid($db, $input->guid);
    logAPI($asigneeCopies);

    if ($asigneeCopies != 0)
        createException("There are " . $asigneeCopies . " students who have copies of this book");
    else
        $book->delete();


    $db->commit();
    Response::sendResponse([
        "data" => true
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
