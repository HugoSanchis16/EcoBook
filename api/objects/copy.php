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

    public function __construct(PDO $db)
    {
        $this->conn = $db;
        $this->state = 4;
    }

    private function searchableValues(): array
    {
        return [
            array(
                "from" => $this,
                "what" => [
                    'uniqid'
                ]
            )
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
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);


        $this->guid = createGUID();
        $this->uniqid = createRandomNumber();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindParam(":uniqid", $this->uniqid);
        $stmt->bindParam(":state", $this->state);
        $stmt->bindParam(":book_id", $this->book_id);
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
            SET state=:state, updated=:updated, searchdata=:searchdata
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":state", $this->state);
        $stmt->bindParam(":id", $this->id);
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

    public static function getAllByBookId(PDO $db, int $book_id): array
    {
        $query = "
        SELECT c.*
        FROM `" . self::$table_name . "` c
        WHERE c.book_id = :book_id
        ";

        $stmt = $db->prepare($query);
        $stmt->bindParam(":book_id", $book_id);

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

    public static function getByUniqId(PDO $db, string $uniqid): Copy|bool
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE uniqid=:uniqid";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":uniqid", $uniqid);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException("Invalid credentials");
    }



    public static function getAllCount(PDO $db, string $search = "", int $book_id): int
    {
        $query = "
        SELECT COUNT(id) as total
        FROM `" . self::$table_name . "` 
        WHERE book_id=:book_id
        ";

        applySearchOnQuery($query);

        $stmt = $db->prepare($query);
        $stmt->bindParam(":book_id", $book_id);
        applySearchOnBindedValue($search, $stmt);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllCountDashboard(PDO $db): int
    {
        $query = "
        SELECT COUNT(c.id) as total
        FROM `" . self::$table_name . "` c";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }
    public static function getAllCountGoodCopiesDashboard(PDO $db): int
    {
        $query = "
        SELECT COUNT(c.id) as total
        FROM `" . self::$table_name . "` c 
        WHERE c.state >= 2";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    public static function getAllBadCopiesCountDashboard(PDO $db): int
    {
        $query = "
        SELECT COUNT(*) as total
        FROM `" . self::$table_name . "` c 
        WHERE c.state < 2
        ";

        $stmt = $db->prepare($query);

        if ($stmt->execute()) {

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return intval($row['total']);
            }
            return 0;
        }
        createException($stmt->errorInfo());
    }

    public static function getFirstCopyAvailable(PDO $db, string $subject_guid): Copy|bool
    {
        $query = "
            SELECT c.* 
            FROM `subject` s
            INNER JOIN `book` b ON b.subject_id = s.id 
            INNER JOIN `copy` c ON c.book_id = b.id
            WHERE s.guid = :subject_guid AND c.id NOT IN (
                SELECT h.copy_id
                FROM `history` h
                INNER JOIN `subject` s ON s.id = h.subject_id
                INNER JOIN `book` b ON b.subject_id = s.id
                INNER JOIN `copy` c ON c.book_id = b.id
                WHERE s.guid = :subject_guid AND finalstate IS NULL
                group BY h.copy_id
            ) AND c.state > 0
            LIMIT 0, 1
        ";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":subject_guid", $subject_guid);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
            return false;
        }
        createException($stmt->errorInfo());
    }

    private static function getMainObject(PDO $db, array $row): Copy
    {
        $newObj = new Copy($db);
        $newObj->id = intval($row['id']);
        $newObj->book_id = intval($row['book_id']);
        $newObj->guid = $row['guid'];
        $newObj->uniqid = $row['uniqid'];
        $newObj->state = $row['state'];
        return $newObj;
    }
}
