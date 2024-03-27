<?php

class Book
{
    private PDO $conn;
    private static string $table_name = "book";


    public int  $id;
    public string $guid;
    public String $name;
    public String $isbn;
    public bool $enabled;
    public int $subject_id;
    public int $stock;
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
            $this->isbn,
            array(
                "from" => $this->subject(),
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
            isbn=:isbn,
            stock=:stock,
            subject_id=:subject_id,
            searchdata=:searchdata
            ";

        $stmt = $this->conn->prepare($query);


        $this->guid = createGUID();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":isbn", $this->isbn);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindParam(":subject_id", $this->subject_id);
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
            SET name=:name, isbn=:isbn, stock=:stock, enabled=:enabled, updated=:updated, deleted=:deleted, searchdata=:searchdata
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":isbn", $this->isbn);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindParam(":enabled", $this->enabled);
        $stmt->bindValue(":updated", newDate());
        $stmt->bindParam(":deleted", $this->deleted);
        $stmt->bindParam(":id", $this->id);
        $stmt->bindValue(":searchdata", convertSearchValues($this->searchableValues()));

        try {
            $stmt->execute();
            return true;
        } catch (\Exception $th) {
            createException($th->getMessage());
        }
    }

    function delete(): bool
    {
        $this->deleted = newDate();
        return $this->update();
    }

    function subject(): Subject
    {
        return Subject::get($this->conn, $this->subject_id);
    }


    public static function get(PDO $db, int $id): Book
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Book not found");
    }

    public static function getByGuid(PDO $db, string $guid): Book
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Book not found");
    }

    public static function getAll(PDO $db, int $page, int $offset, string $search = ""): array
    {
        $query = "
        SELECT b.*
        FROM `" . self::$table_name . "` b
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
        SELECT COUNT(u.*) as total
        FROM `" . self::$table_name . "` u 
        WHERE deleted IS NULL";

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

    private static function getMainObject(PDO $db, array $row): Book
    {
        $newObj = new Book($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->name = $row['name'];
        $newObj->isbn = $row['isbn'];
        $newObj->enabled = $row['enabled'];
        $newObj->subject_id = intval($row['subject_id']);
        $newObj->stock = intval($row['stock']);
        $newObj->created = $row['created'];
        $newObj->updated = $row['updated'];
        $newObj->deleted = $row['deleted'];
        return $newObj;
    }
}
