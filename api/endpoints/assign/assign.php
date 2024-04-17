<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    checkAuth();

    $input = validate($data, [
        'nia' => 'required|numeric',
        'subjects' => 'required|array',
        "repeater" => "required|bool",
        "course" => "required|string"
    ]);

    $student = Student::getByNia($db, $input->nia);
    $course = Course::getByGuid($db, $input->course);

    $subjects = Subject::getAllSubjectsByCourse($db, $course->id);
    if ($input->repeater) {
        $subjects = $input->subjects;
    }

    foreach ($subjects as $subject) {
        if (gettype($subject) === "string") $subject = Subject::getByGuid($db, $subject);
        $copy = Copy::getFirstCopyAvailable($db, $subject->guid);
        if ($copy) {
            if (History::checkIfStudentHaveSubjectAssigned($db, $subject->id, $student->id)) continue;

            $newHistory = new History($db);
            $newHistory->copy_id = $copy->id;
            $newHistory->subject_id = $subject->id;
            $newHistory->student_id = $student->id;
            $newHistory->initialState = $copy->state;
            $newHistory->store();
        } else createException("Some subjects have not enough copies available");
    }

    $db->commit();
    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
