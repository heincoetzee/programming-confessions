<?php
require_once "config/database.php";
require_once "classes/confession.php";

$database = new Database();
$connection = $database->getConnection();

Confession::deleteConfession($connection);