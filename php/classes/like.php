<?php
require_once "user.php";

class Like {
    private $liked;
    private $confession_id;
    private $connection;

    public function __construct($liked, $confession_id, $connection) {
        $this->liked = $liked;
        $this->confession_id = $confession_id;
        $this->connection = $connection;
    }

    public function exists($user_id) {
        $query = "SELECT * FROM likes where user_id=? and confession_id=?";

        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $user_id, PDO::PARAM_INT);
        $statement->bindParam(2, $this->confession_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            print_r($statement->errorInfo());
        }

        return $statement->rowCount() === 1;
    }
    
    public function update() {
        $user_id = User::getUserId($this->connection);

        // if the user has previously liked the confession update it
        if ($this->exists($user_id)) {
            $query = "UPDATE likes SET liked=? WHERE user_id=? AND confession_id=?";
        } 
        // otherwise create a new row
        else {
            $query = "INSERT INTO likes(liked, user_id, confession_id) VALUES(?, ?, ?)";
        }

        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $this->liked, PDO::PARAM_INT);
        $statement->bindParam(2, $user_id, PDO::PARAM_INT);
        $statement->bindParam(3, $this->confession_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            print_r($statement->errorInfo());
        } 

    }

}
