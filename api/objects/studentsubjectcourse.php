<?php

class StudentSubjectCourse
{
    private PDO $conn;
    private static string $table_name = "studentsubjectcourse";


    public int  $id;
    public int $student_id;
    public int $subject_id;
    public int $course_id;


    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            course_id=:course_id,
            student_id=:student_id,
            subject_id=:subject_id
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":course_id", $this->course_id);
        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindParam(":subject_id", $this->subject_id);

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }


    function course(): Course
    {
        return Course::get($this->conn, $this->course_id);
    }

    function subject(): Subject
    {
        return Subject::get($this->conn, $this->subject_id);
    }

    function student(): Student
    {
        return Student::get($this->conn, $this->student_id);
    }


    public static function get(PDO $db, int $id): StudentSubjectCourse
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Subject not found");
    }

    private static function getMainObject(PDO $db, array $row): StudentSubjectCourse
    {
        $newObj = new StudentSubjectCourse($db);
        $newObj->id = intval($row['id']);
        $newObj->course_id = intval($row['course_id']);
        $newObj->student_id = intval($row['student_id']);
        $newObj->subject_id = intval($row['subject_id']);
        return $newObj;
    }
}
