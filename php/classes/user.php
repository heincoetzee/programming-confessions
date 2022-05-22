<?php
class User {
    private $username;
    private $password_hash;
    private $connection;

    public function __construct($username, $password, $connection) {
        $this->username = $username;
        $this->password_hash = password_hash($password, PASSWORD_DEFAULT);
        $this->connection = $connection;
    }

    public function create() {
        $query = "INSERT INTO users(username, password_hash) VALUES(?, ?)";

        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $this->username, PDO::PARAM_STR, 10);
        $statement->bindParam(2, $this->password_hash, PDO::PARAM_STR, 255);

        if ($statement->execute()) {
            echo "success";
        } else {
            echo "error";
        }
    }

}
