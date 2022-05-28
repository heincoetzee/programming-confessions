<?php
require_once "user.php";
require_once "like.php";

class Confession {
    private $title;
    private $body;
    private $connection;

    public function __construct($title, $body, $connection) {
        $this->title = $title;
        $this->body = $body;
        $this->connection = $connection;
    }

    private static function getConfessionId() {
        session_start();
        return (int) htmlentities($_SESSION["confession_id"]);
    }

    public function create() {
        $query = "INSERT INTO confessions(title, body, user_id) VALUES(?, ?, ?)";

        $statement = $this->connection->prepare($query);

        $user_id = User::getUserId($this->connection);
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

        if ($statement->rowCount() === 0) {
            return false;
        }

        return (bool) (int) ($statement->fetch())->liked;
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

    private static function addConfessionsProperties($confessions, $user_id, $connection) {
        foreach ($confessions as $confession) {
            // convert the current timestamp from "YYYY-MM-DD HH:MM:SS" to
            // "dd mmm"
            $unixTime = strtotime($confession->date_created);
        
            $confession->date_created = date("d M", $unixTime);

            // Add the name of the user that created the confession
            $confession->{"username"} = Confession::getUserName($confession->user_id,
                $connection);

            // Indicate if the user liked the confession
            $isLiked = Confession::isConfessionLiked($user_id, $confession->confession_id, $connection);
            $confession->{"isLikedByUser"} =  $isLiked;

            // Add the number of the likes that the post has
            $confession->{"numLikes"} = Confession::getNumLikes($confession->confession_id, 
                $connection);

            // Lastly remove the user_id
            unset($confession->user_id);
        }
    }

    public static function getUserConfessions($connection) {
        $user_id = User::getUserId($connection);

        $query = "SELECT confession_id, title, body, date_created, user_id FROM 
            confessions WHERE user_id=? ORDER BY date_created DESC";

        $statement = $connection->prepare($query);
        $statement->bindParam(1, $user_id, PDO::PARAM_INT);
        
        if (!$statement->execute()) {
            exit("Error: Could not get confessions for current user");
        }

        $user_confessions = $statement->fetchAll();
        self::addConfessionsProperties($user_confessions, $user_id, $connection);

        echo json_encode($user_confessions);
    }

    public static function getAllConfessions($connection) {
        $user_id = User::getUserId($connection);

        $query = "SELECT confession_id, title, body, date_created, user_id FROM 
            confessions ORDER BY date_created DESC";

        $result = $connection->query($query);

        $confessions = $result->fetchAll();
        self::addConfessionsProperties($confessions, $user_id, $connection);

        echo json_encode($confessions);
    }

    public static function getLikedConfessions($connection) {
        $user_id = User::getUserId($connection);

        $query = "SELECT confession_id, title, body, date_created, user_id FROM 
            confessions NATURAL JOIN likes WHERE user_id=? AND liked=1
            ORDER BY date_created DESC";

        $statement = $connection->prepare($query);
        $statement->bindParam(1, $user_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            exit("Error: Could not get liked confessions");
        }

        $liked_confessions = $statement->fetchAll();
        self::addConfessionsProperties($liked_confessions, $user_id, $connection);

        echo json_encode($liked_confessions);
    }

    public static function getConfession($connection) {
        session_start();
        $confession_id = $_SESSION["confession_id"];

        $query = "SELECT title, body FROM confessions WHERE confession_id=?";
        $statement = $connection->prepare($query);
        $statement->bindParam(1, $confession_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            exit("Error: Could not find confession");
        }

        $confession = $statement->fetch();

        echo json_encode($confession);
    }

    public function updateConfession() {
        $confession_id = self::getConfessionId();
        $title = $this->title;
        $body = $this->body;

        $query = "UPDATE confessions SET title=?, body=? WHERE confession_id=?";
        $statement = $this->connection->prepare($query);

        $statement->bindParam(1, $title, PDO::PARAM_STR, 20);
        $statement->bindParam(2, $body, PDO::PARAM_STR, 140);
        $statement->bindParam(3, $confession_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            exit("Error: Could not update confession");
        }
    }

    public static function deleteConfession($connection) {
        $confession_id = self::getConfessionId();

        $query = "DELETE FROM confessions WHERE confession_id=?";

        $statement = $connection->prepare($query);
        $statement->bindParam(1, $confession_id, PDO::PARAM_INT);

        if (!$statement->execute()) {
            exit("Error: Could not delete confession");
        }
    }


}
