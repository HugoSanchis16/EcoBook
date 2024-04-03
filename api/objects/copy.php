<?php

class Copy
{
    private PDO $conn;
    private static string $table_name = "copy";


    public int $id;
    public string $guid;
    public string $uniqid;
    public int $state;
    public int $book_id;
    public int|null $student_id;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
        $this->state = 5;
    }

    private function searchableValues(): array
    {
        return [
            $this->uniqid,
            array(
                "from" => $this->student(),
                "what" => [
                    "studentProfile.name",
                    "studentProfile.surnames",
                ]
            ),
        ];
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            uniqid=:uniqid,
            state=:state,
            book_id=:book_id,
            student_id=:student_id,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);


        $this->guid = createGUID();
        $this->uniqid = createRandomNumber();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindParam(":uniqid", $this->uniqid);
        $stmt->bindParam(":state", $this->state);
        $stmt->bindParam(":book_id", $this->book_id);
        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));

        try {
            $stmt->execute();
            return $this->id = $this->conn->lastInsertId();
        } catch (\Exception $th) {
            createException($stmt->errorInfo(), $stmt->errorCode());
        }
    }

    function update(): bool
    {
        $query = "
            UPDATE `" . self::$table_name . "` 
            SET state=:state, student_id=:student_id, updated=:updated, searchdata=:searchdata
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":state", $this->state);
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":student_id", $this->student_id);
        $stmt->bindValue(":updated", newDate());
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($stmt->errorInfo());
        }
    }

    function book(): Book
    {
        return Book::get($this->conn, $this->book_id);
    }

    function student(): Student|null
    {
        if ($this->student_id)
            return Student::get($this->conn, $this->student_id);
        else return null;
    }

    public static function get(PDO $db, int $id): Copy
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Copy not found");
    }

    public static function getAll(PDO $db, int $page, int $offset, string $search = ""): array
    {
        $query = "
        SELECT c.*
        FROM `" . self::$table_name . "` c
        WHERE 1 
        ";

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

    public static function getAllByBook(PDO $db, int $book_id, int $page, int $offset, string $search = ""): array
    {
        $query = "
        SELECT c.*
        FROM `" . self::$table_name . "` c
        WHERE c.book_id = :book_id
        ";

        applySearchOnQuery($query);
        doPagination($offset, $page, $query);

        $stmt = $db->prepare($query);
        $stmt->bindParam(":book_id", $book_id);

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

    public static function getByGuid(PDO $db, string $guid): Copy
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Copy not found");
    }


    public static function getByBookId(PDO $db, int $book_id): Copy
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE book_id=:book_id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":book_id", $book_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    public static function getByStudentId(PDO $db, int $student_id): Copy
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE student_id=:student_id";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":student_id", $student_id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }

    private static function getMainObject(PDO $db, array $row): Copy
    {
        $newObj = new Copy($db);
        $newObj->id = intval($row['id']);
        $newObj->book_id = intval($row['book_id']);
        $newObj->student_id = $row["student_id"] === null ? null : intval($row['student_id']);
        $newObj->guid = $row['guid'];
        $newObj->uniqid = $row['uniqid'];
        $newObj->state = $row['state'];
        return $newObj;
    }
}
