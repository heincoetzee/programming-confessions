<?php
class User {
    private $username;
    private $password;
    private $connection;

    public function __construct($username, $password, $connection) {
        $this->username = $username;
        $this->password = $password;
        $this->connection = $connection;
    }

    public function create() {
        $query = "INSERT INTO users(username, password_hash) VALUES(?, ?)";
        $password_hash = password_hash($this->password, PASSWORD_DEFAULT);

        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $this->username, PDO::PARAM_STR, 10);
        $statement->bindParam(2, $password_hash, PDO::PARAM_STR, 255);

        if (!$statement->execute()) {
            die("error");
        }
    }
    
    private function exists() {
        $query = "SELECT password_hash FROM users WHERE username=?";

        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $this->username, PDO::PARAM_STR, 10);

        if (!$statement->execute()) {
            return false;
        } else if ($statement->rowCount() === 0) {
            return false;
        }

        $password_hash = ($statement->fetch())->password_hash;
        return password_verify($this->password, $password_hash);
    }

    public function login() {
        if ($this->exists()) {
            session_start();
            $_SESSION["logged_in"] = true;
            $_SESSION["username"] = $this->username;

            echo "success";
        }
    }

    public static function getUserId($connection) {
        session_start();
        $username = $_SESSION["username"];
        
        $query = "SELECT user_id FROM users WHERE username=?";

        $statement = $connection->prepare($query);

        $statement->bindParam(1, $username, PDO::PARAM_STR, 10);

        if (!$statement->execute()) {
            die("Error: User id not found");
        }

        return ($statement->fetch())->user_id;
    }

}
