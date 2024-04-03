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

    $courses = Course::getAll($db, $input->page, $input->offset, $input->search);
    $coursesCount = Course::getAllCount($db, $input->search);

    $coursesFormat = CourseResource::getCoursesArray($courses);

    $totalPages = ceil($coursesCount / $input->offset);

    $db->commit();
    Response::sendResponse([
        "courses" => $coursesFormat,
        "totalPages" => $totalPages
    ]);
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
