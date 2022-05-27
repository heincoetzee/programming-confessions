<?php
// Header config
$page_title = "Login";
$dir = ".";
$stylesheet = "login.css";
$scripts = array();
$modules = array("login.js");
$header_type = 1;
$login_location = "./";
$signup_location = "./signup";

// Main config
$submit_to = "login-user.php";
$fields = array(
  "username" => "text",
  "password" => "password",
);

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/not-logged-in/form.php";
require_once "$dir/php/include/footer.php";
