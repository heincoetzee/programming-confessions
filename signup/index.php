<?php
// Header config
$page_title = "Signup";
$dir = "..";
$stylesheet = "signup.css";
$scripts = array();
$modules = array("signup.js");
$header_type = 1;
$login_location = "../";
$signup_location = "./";

// Main config
$submit_to = "create-user.php";
$fields = array(
  "username" => "text",
  "password" => "password",
  "password-repeat" => "password"
);

require_once "$dir/php/include/header.php";
require_once "$dir/php/include/not-logged-in/form.php";
require_once "$dir/php/include/footer.php";
