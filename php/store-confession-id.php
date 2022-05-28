<?php
if ($_POST) {
    session_start();
    $_SESSION["confession_id"] = htmlentities($_POST["confession_id"]);
}