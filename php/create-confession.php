<?php
require_once "config/database.php";
require_once "classes/confession.php";

if ($_POST) {
    $title = htmlentities($_POST["title"]);
    $body = htmlentities($_POST["body"]);

    $database = new Database();
    $connection = $database->getConnection();
    $confession = new Confession($title, $body, $connection);

    $confession->create();
}
