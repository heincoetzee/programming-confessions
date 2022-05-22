<?php
class Database {
    private $connection;
    private $host = "localhost";
    private $database = "programming_confessions";
    private $username = "admin";
    private $password = '9S4HVdA@xF2jC$RiZsZ9xMEQq5NPSq@Er4Wyyw8Y';
    private $charset = "utf8mb4";
    private $options = array(
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
    );

    public function __construct() {
        $attr = "mysql:host=$this->host;dbname=$this->database;
            charset=$this->charset";

        $this->connection = new PDO($attr, $this->username, $this->password, 
            $this->options);
    }

    public function __destruct() {
        $this->connection = null;
    }

    public function getConnection() {
        return $this->connection;
    }
}
