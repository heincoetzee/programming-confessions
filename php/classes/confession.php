<?php
class Confession {
    private $title;
    private $body;
    private $connection;

    public function __construct($title, $body, $connection) {
        $this->title = $title;
        $this->body = $body;
        $this->connection = $connection;
    }

    private function getUserId() {
        session_start();
        $username = $_SESSION["username"];
        
        $query = "SELECT user_id FROM users WHERE username=?";

        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $username, PDO::PARAM_STR, 10);

        if (!$statement->execute()) {
            die("Error: User id not found");
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

    private static function getUserName($user_id, $connection) {
        $query = "SELECT username FROM users WHERE user_id=?";

        $statement = $connection->prepare($query);

        $statement->bindParam(1, $user_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            die("Error: Username not found");
        }

        return ($statement->fetch())->username;
    }

    private static function isConfessionLiked($user_id, $confession_id, $connection) {
        $query = "SELECT liked from likes WHERE user_id=? and confession_id=?";

        $statement = $connection->prepare($query);

        $statement->bindParam(1, $user_id, PDO::PARAM_INT);
        $statement->bindParam(2, $confession_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            die("Error: Like not found");
        }

        return (bool)(int)($statement->fetch())->liked;
    }

    private static function getNumLikes($confession_id, $connection) {
        $query = "SELECT SUM(liked) AS num_likes FROM likes WHERE confession_id=?
            GROUP BY confession_id";

        $statement = $connection->prepare($query);

        $statement->bindParam(1, $confession_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            die("Error: Likes not found");
        }

        return ($statement->fetch())->num_likes;
    }


    public static function getAllConfessions($connection) {
        $query = "SELECT confession_id, title, body, date_created, user_id FROM 
            confessions ORDER BY date_created DESC";

        $result = $connection->query($query);

        $confessions = $result->fetchAll();
        foreach ($confessions as $confession) {
            // convert the current timestamp from "YYYY-MM-DD HH:MM:SS" to
            // "dd mmm"
            $unixTime = strtotime($confession->date_created);
        
            $confession->date_created = date("d M", $unixTime);

            // Add the name of the user that created the confession
            $confession->{"username"} = Confession::getUserName($confession->user_id,
                $connection);

            // Indicate if the user liked the confession
            $confession->{"isLikedByUser"} = Confession::isConfessionLiked($confession->user_id,
                $confession->confession_id, $connection);

            // Add the number of the likes that the post has
            $confession->{"numLikes"} = Confession::getNumLikes($confession->confession_id, 
                $connection);

            // Lastly remove the user_id
            unset($confession->user_id);

        }

        echo json_encode($confessions);
    }

}
