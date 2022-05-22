<?php
require_once "config/database.php";
require_once "classes/confession.php";

if ($_POST) {
    $title = htmlentities($_POST["title"]);
    $body = htmlentities($_POST["body"]);
    $username = htmlentities($_POST["username"]);

    $database = new Database();
    $connection = $database->getConnection();
    $confession = new Confession($title, $body, $username, $connection);

    $confession->create();
}
