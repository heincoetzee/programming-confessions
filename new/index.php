<?php
require_once "../php/login-checker.php";

// Header config
$page_title = "Confess";
$dir = "..";
$stylesheet = "confess.css";
$scripts = array("sign-out.js");
$modules = array("toggle.js", "confession.js");
$header_type = 2;

// Main config
$submit_to = "create-confession.php";
$confession_type = "New";

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/logged-in/confession.php";
require_once "$dir/php/include/footer.php";
