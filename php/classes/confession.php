<?php
class Confession {
    private $title;
    private $body;
    private $username;
    private $connection;

    public function __construct($title, $body, $username, $connection) {
        $this->title = $title;
        $this->body = $body;
        $this->username = $username;
        $this->connection = $connection;
    }

    private function getUserId() {
        $query = "SELECT user_id FROM users WHERE username=?";

        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $this->username, PDO::PARAM_STR, 10);

        if (!$statement->execute()) {
            die("Error: User not found");
        }

        return ($statement->fetch())->user_id;
    }

    public function create() {
        $query = "INSERT INTO confessions(title, body, user_id) VALUES(?, ?, ?)";

        $statement = $this->connection->prepare($query);

        $user_id = $this->getUserId();
        $statement->bindParam(1, $this->title, PDO::PARAM_STR, 20);
        $statement->bindParam(2, $this->body, PDO::PARAM_STR, 120);
        $statement->bindParam(3, $user_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            die("Error: Confession could not be created");
        }
    }

}
