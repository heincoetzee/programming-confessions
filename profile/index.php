<?php
require_once "../php/login-checker.php";

// Header config
$page_title = "Profile";
$dir = "..";
$stylesheet = "profile.css";
$scripts = array("sign-out.js");
$modules = array("toggle.js", "profile.js", "like.js", "search.js");
$header_type = 2;

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/logged-in/profile.php";
require_once "$dir/php/include/footer.php";
