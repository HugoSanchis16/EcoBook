<?php

class User
{
    private PDO $conn;
    private static string $table_name = "user";


    public int $id;
    public string $guid;
    public string $email;
    public string $password;
    public string $created;
    public string|null $updated;
    public string|null $deleted;
    public string|null $token;
    public string|null $expiredate;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    function store(): int
    {
        $query = "INSERT INTO `" . self::$table_name . "` 
            SET 
            guid=:guid,
            email=:email,
            password=:password,
            token=:token,
            expiredate=:expiredate
        ";

        $stmt = $this->conn->prepare($query);

        $this->guid = createGUID();
        $stmt->bindValue(":guid", $this->guid);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);


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
            SET password=:password, updated=:updated, deleted=:deleted, token=:token, expiredate=:expiredate
            WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":updated", $this->updated);
        $stmt->bindParam(":deleted", $this->deleted);
        $stmt->bindParam(":token", $this->token);
        $stmt->bindParam(":expiredate", $this->expiredate);
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

    function profile(): UserProfile
    {
        return UserProfile::getByUserId($this->conn, $this->id);
    }

    function createSession()
    {

        $this->token = createToken();
        $this->expiredate = newDate(1, "day");
        return $this->update();
    }

    public static function checkIfExists(PDO $db, string $email): bool
    {
        $query = "SELECT id FROM `" . self::$table_name . "` WHERE email=:email";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":email", $email);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return true;
            }
            return false;
        }
        createException($stmt->errorInfo());
    }

    public static function get(PDO $db, int $id): User
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE id=:id AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("User not found");
    }

    public static function getByGuid(PDO $db, string $guid): User
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE guid=:guid AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":guid", $guid);
        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("User not found");
    }

    public static function getByEmail(PDO $db, string $email): User
    {
        $query = "SELECT * FROM `" . self::$table_name . "` WHERE email=:email AND deleted IS NULL";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":email", $email);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return self::getMainObject($db, $row);
            }
        }
        createException("Invalid credentials");
    }

    private static function getMainObject(PDO $db, array $row): User
    {
        $newObj = new User($db);
        $newObj->id = intval($row['id']);
        $newObj->guid = $row['guid'];
        $newObj->email = $row['email'];
        $newObj->password = $row['password'];
        $newObj->created = $row['created'];
        $newObj->updated = $row['updated'];
        $newObj->deleted = $row['deleted'];
        $newObj->deleted = $row['token'];
        $newObj->expiredate = $row['expiredate'];
        return $newObj;
    }
}
