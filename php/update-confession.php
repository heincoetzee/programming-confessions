<?php

use FTP\Connection;

require_once "config/database.php";
require_once "classes/confession.php";

if ($_POST) {
    $database = new Database();
    $connection = $database->getConnection();

    $title = htmlentities($_POST["title"]);
    $body = htmlentities($_POST["body"]);

    $confession = new Confession($title, $body, $connection);

    $confession->updateConfession();
}