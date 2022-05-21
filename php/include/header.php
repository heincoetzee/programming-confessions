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
      echo "<script type='module' defer src='$dir/css/$module'></script>";
    }
  ?>

</head>
<body>
  <!--  Header -->
  <header>
    <div>
      <a href="<?php echo "$dir/" ?>"><h1>Programming Confessions</h1></a>
      <?php
        require_once "headers/header{$header_type}.php";
      ?>
  </header>