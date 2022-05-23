<?php
require_once "config/database.php";
require_once "classes/like.php";

if ($_POST) {
    $liked = $_POST["liked"];
    $confession_id = $_POST["confession_id"];

    $database = new Database();
    $connection = $database->getConnection();
    $like = new Like($liked, $confession_id, $connection);

    $like->update();
}
