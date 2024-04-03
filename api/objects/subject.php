<?php

class Subject
{
    private PDO $conn;
    private static string $table_name = "subject";


    public int  $id;
    public string $guid;
    public int $course_id;
    public String $name;
    public String $abbr;
    public string $created;
    public string|null $updated;
    public string|null $deleted;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    private function searchableValues(): array
    {
        return [
            $this->name,
            $this->abbr,
            array(
                "from" => $this->course(),
                "what" => [
                    'name',
                ]
            )
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            name=:name,
            abbr=:abbr,
            course_id=:course_id,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":guid", createGUID());
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":abbr", $this->abbr);
        $stmt->bindParam(":course_id", $this->course_id);
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
            SET name=:name, abbr=:abbr, updated=:updated, deleted=:deleted, searchdata=:searchdata
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":abbr", $this->abbr);
        $stmt->bindParam(":updated", $this->updated);
        $stmt->bindParam(":deleted", $this->deleted);
        $stmt->bindParam(":searchdata", convertSearchValues($this->searchableValues()));
        $stmt->bindParam(":id", $this->id);

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function delete(): bool
    {
        $this->deleted = newDate();
        return $this->update();
    }

    function course(): Course
    {
        return Course::get($this->conn, $this->course_id);
    }


    public static function get(PDO $db, int $id): Subject
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Student not found");
    }

    public static function getByGuid(PDO $db, string $guid): Subject
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Student not found");
    }

    public static function getAll(PDO $db, int $page, int $offset, string $search = ""): array
    {
        $query = "
        SELECT s.*
        FROM `" . self::$table_name . "` s 
        WHERE deleted IS NULL";

        applySearchOnQuery($query);
        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }
    public static function getAllNames(PDO $db): array
    {
        $query = "
        SELECT s.*
        FROM `" . self::$table_name . "` s
        WHERE deleted IS NULL";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {
            $arrayToReturn = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrayToReturn[] = self::getMainObject($db, $row);
            }
            return $arrayToReturn;
        }
        createException($stmt->errorInfo());
    }


    public static function getAllCount(PDO $db, string $search = ""): int
    {
        $query = "
        SELECT COUNT(s.id) as total
        FROM `" . self::$table_name . "` s
        WHERE deleted IS NULL
        ";

        applySearchOnQuery($query);

        $stmt = $db->prepare($query);

        applySearchOnBindedValue($search, $stmt);

        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }


    private static function getMainObject(PDO $db, array $row): Subject
    {
        $newObj = new Subject($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->course_id = $row['course_id'];
        $newObj->name = $row['name'];
        $newObj->abbr = $row['abbr'];
        $newObj->created = $row['created'];
        $newObj->updated = $row['updated'];
        $newObj->deleted = $row['deleted'];
        return $newObj;
    }
}
