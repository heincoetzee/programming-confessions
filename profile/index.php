<?php
require_once "../php/login-checker.php";

// Header config
$page_title = "Profile";
$dir = "..";
$stylesheet = "profile.css";
$scripts = array("sign-out.js");
$modules = array("toggle.js");
$header_type = 2;

// Main config
$main_dir = "logged-in";
$main_file = "profile.php";

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/main.php";
require_once "$dir/php/include/footer.php";
