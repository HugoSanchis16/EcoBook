<?php

class History
{
    private PDO $conn;
    private static string $table_name = "history";


    public int $id;
    public string $guid;
    public int $copy_id;
    public int $course_id;
    public int $student_id;
    public int $initialState;
    public int $finalState;
    public string $initialDate;
    public string|null $finalDate;
    public string|null $observations;
    public string|null $updated;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    private function searchableValues(): array
    {
        return [
            array(
                "from" => $this->course(),
                "what" => [
                    'name',
                    'abbr',
                ]
            ),
            array(
                "from" => $this->copy(),
                "what" => [
                    "book.name",
                    "book.isbn",
                ]
            ),
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            copy_id=:copy_id,
            course_id=:course_id,
            student_id=:student_id,
            initialstate=:initialstate,
            ";

        $stmt = $this->conn->prepare($query);


        $this->guid = createGUID();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindParam(":copy_id", $this->copy_id);
        $stmt->bindParam(":course_id", $this->course_id);
        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindParam(":initialstate", $this->initialState);
        $stmt->bindParam(":searchdata", convertSearchValues($this->searchableValues()));

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function update(): bool
    {
        $query = "
            UPDATE `" . self::$table_name . "` 
            SET finalstate=:finalstate, finaldate=:finaldate, observations=:observations, updated=:updated
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":finalstate", $this->finalState);
        $stmt->bindParam(":finaldate", $this->finalDate);
        $stmt->bindParam(":observations", $this->observations);
        $stmt->bindParam(":updated", $this->updated);
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function copy(): Copy
    {
        return Copy::get($this->conn, $this->copy_id);
    }

    function course(): Course
    {
        return Course::get($this->conn, $this->course_id);
    }

    function student(): Student|null
    {
        return Student::get($this->conn, $this->student_id);
    }

    public static function get(PDO $db, int $id): History
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("History not found");
    }

    public static function getByCopyId(PDO $db, int $copy_id): History
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE copy_id=:copy_id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":copy_id", $copy_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    private static function getMainObject(PDO $db, array $row): History
    {
        $newObj = new History($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->copy_id = intval($row['copy_id']);
        $newObj->course_id = intval($row['course_id']);
        $newObj->initialState = $row['initialstate'];
        $newObj->finalState = $row['finalstate'];
        $newObj->initialDate = $row['initialdate'];
        $newObj->finalDate = $row['finaldate'];
        $newObj->observations = $row['observations'];
        $newObj->updated = $row['updated'];
        return $newObj;
    }
}
