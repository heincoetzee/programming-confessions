<?php
require_once "../php/login-checker.php";

// Header config
$page_title = "Home";
$dir = "..";
$stylesheet = "home.css";
$scripts = array();
$modules = array();
$header_type = 2;

// Main config
$main_dir = "logged-in";
$main_file = "card-template.php";

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/main.php";
require_once "$dir/php/include/footer.php";
