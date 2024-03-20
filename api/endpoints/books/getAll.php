<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'page' => 'required|numeric',
        'offset' => 'required|numeric',
        'search' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : "";
    logAPI("3");

    //check if user exist
    $books = Book::getAll($db, $input->page, $input->offset, $input->search);

    $db->commit();
    $booksFormat = BookResource::getBooksArray($books);
    Response::sendResponse([
        "books" => $booksFormat
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
