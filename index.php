<?php
// Header config
$page_title = "Login";
$dir = ".";
$stylesheet = "login.css";
$scripts = array();
$modules = array();
$header_type = 1;
$login_location = "./";
$signup_location = "./signup";

// Main config
$submit_to = "#";
$fields = array(
  "username" => "text",
  "password" => "password",
);
$main_dir = "not-logged-in";
$main_file = "form.php";

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/main.php";
require_once "$dir/php/include/footer.php";
