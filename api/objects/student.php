<?php

class Student
{
    private PDO $conn;
    private static string $table_name = "student";


    public int $id;
    public string $guid;
    public int $nia;
    public int $createdBy;
    public string $searchdata;
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
            $this->nia,
            array(
                "from" => $this->profile(),
                "what" => [
                    'name',
                    'surnames',
                    'email'
                ]
            )
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            nia=:nia,
            createdby=:createdby,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindParam(":nia", $this->nia);
        $stmt->bindParam(":createdby", $this->createdBy);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));

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
            SET nia=:nia, updated=:updated, deleted=:deleted, searchdata=:searchdata
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nia", $this->nia);
        $stmt->bindParam(":updated", $this->updated);
        $stmt->bindParam(":deleted", $this->deleted);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));
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

    function profile(): StudentProfile|bool
    {
        if (isset($this->id)) {
            return StudentProfile::getByStudentId($this->conn, $this->id);
        } else return false;
    }


    public static function get(PDO $db, int $id): Student
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

    public static function getByGuid(PDO $db, string $guid): Student
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

    public static function getByNia(PDO $db, int $nia): Student | bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE nia=:nia AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":nia", $nia);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    private static function getMainObject(PDO $db, array $row): Student
    {
        $newObj = new Student($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->nia = intval($row['nia']);
        $newObj->created = $row['created'];
        $newObj->updated = $row['updated'];
        $newObj->deleted = $row['deleted'];
        $newObj->createdBy = intval($row['createdby']);
        return $newObj;
    }
}
