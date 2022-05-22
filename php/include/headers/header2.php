<!-- Search Bar-->
  <div id="searchbar-wrapper">
    <input type="text" id="search-input" placeholder="Search...">
    <img src="<?php echo "$dir/images/search.svg" ?>" width="18" height="18" class="filter">
  </div>
</div>

<!-- User options -->
<div id="user">
  <div id="user-toggle">
    <?php
      $username = $_SESSION["username"];

      echo "<h3>$username</h3>";
    ?>
    <img src="<?php echo "$dir/images/dropdown.svg" ?>" width="19" height="19" class="filter-white">
  </div>

  <ol id="user-menu" class="hidden">
    <li>
      <a href="">Confess</a>
    </li>
    <li>
      <a href="<?php echo "$dir/profile" ?>">Profile</a>
    </li>
    <li>
      <a id="sign-out">Sign out</a>
    </li>
  </ol>
</div>