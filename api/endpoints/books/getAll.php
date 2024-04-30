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
        'search' => 'sometimes|string',
        'filter' => 'sometimes|string'
    ]);

    $search = isset($input->search) ? $input->search : "";
    $filter = isset($input->filter) ? json_decode($input->filter) : [];

    $books = Book::getAll($db, $input->page, $input->offset, $input->search, $filter);
    $booksCount = Book::getAllCount($db, $input->search, $filter);

    $booksFormat = BookResource::getBooksArrayList($books);


    $totalPages = ceil($booksCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "books" => $booksFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
