<?php
// Header config
$page_title = "Signup";
$dir = "..";
$stylesheet = "signup.css";
$scripts = array();
$modules = array();
$header_type = 1;
$login_location = "../";
$signup_location = "./";

// Main config
$submit_to = "#";
$fields = array(
  "username" => "text",
  "password" => "password",
  "password-repeat" => "password"
);
$main_dir = "not-logged-in";
$main_file = "form.php";

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/main.php";
require_once "$dir/php/include/footer.php";
