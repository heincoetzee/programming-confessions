<!DOCTYPE html>
<html lang="en-GB" dir="ltr">
<head>
  <title><?php echo $page_title ?></title>

  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="<?php echo "$dir/css/$stylesheet"?>">

  <?php
    // output scripts to load
    foreach ($scripts as $script) {
      echo "<script defer src='$dir/js/$script'></script>";
    }

    // output modules to load
    foreach ($modules as $module) {
      echo "<script type='module' defer src='$dir/js/$module'></script>";
    }
  ?>

</head>
<body>
  <!--  Header -->
  <header>
    <div>
      <?php
        $location;
        if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"]) {
          if ($page_title === "Home") {
            $location = "./";
          } else {
            $location = "../home";
          }
        } else {
          $location = "$dir/";
        }
        echo <<<_HOMEPAGE
          <a href="$location"><h1>Programming Confessions</h1></a>
        _HOMEPAGE;

        require_once "headers/header{$header_type}.php";
      ?>
  </header>
  <main>