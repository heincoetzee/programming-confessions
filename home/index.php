<?php
require_once "../php/login-checker.php";

// Header config
$page_title = "Home";
$dir = "..";
$stylesheet = "home.css";
$scripts = array("sign-out.js");
$modules = array("toggle.js", "home.js");
$header_type = 2;

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/logged-in/card-template.php";
require_once "$dir/php/include/footer.php";
