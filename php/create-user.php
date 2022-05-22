<?php
require_once "config/database.php";
require_once "classes/user.php";

$username = htmlentities($_POST["username"]);
$password = htmlentities($_POST["password"]);

$database = new Database();
$connection = $database->getConnection();
$user = new User($username, $password, $connection);

$user->create();
