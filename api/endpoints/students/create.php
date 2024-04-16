<?php

include_once '../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = postInput();
try {

    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'nia' => 'required|numeric',
        'name' => 'required|string',
        'surname' => 'required|string',
        'phone' => 'required|string',
        'email' => 'required|string',
        'course' => 'required|string',
        'repeater' => 'required|bool',
        "subjects" => "required|array"
    ]);


    $student_exist = Student::getByNia($db, $input->nia);
    if (!$student_exist) {
        $student = new Student($db);
        $student->nia = $input->nia;
        $student->createdBy = $userid;
        $student->store();

        $studentProfile = new StudentProfile($db);
        $studentProfile->student_id = $student->id;
        $studentProfile->name = $input->name;
        $studentProfile->surnames = $input->surname;
        $studentProfile->phone = $input->phone;
        $studentProfile->email = $input->email;
        $studentProfile->store();

        $course = Course::getByGuid($db, $input->course);
        $allSubjects = $input->subjects;
        if (!$input->repeater) {
            $allSubjects = Subject::getAllSubjectsByCourse($db, $course->id);
        }

        foreach ($allSubjects as $subject) {
            //Just in case the subject is the subject_guid
            if (gettype($subject) === "string") $subject = Subject::getByGuid($db, $subject);

            $newStudentSubjectCourse = new StudentSubjectCourse($db);
            $newStudentSubjectCourse->student_id = $student->id;
            $newStudentSubjectCourse->course_id = $course->id;
            $newStudentSubjectCourse->subject_id = $subject->id;
            $newStudentSubjectCourse->store();
        }
    } else {
        createException("Nia already exist", 409);
    }

    $db->commit();

    Response::sendResponse();
} catch (\Exception $th) {
    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), 'code' => $th->getCode())));
}
