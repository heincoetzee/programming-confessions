<form action="<?php echo "$dir/php/$submit_to"?>">
  <h2><?php echo $confession_type ?> Confession</h2>
  <input type="text" name="title" placeholder="Add Title Here">

  <textarea name="body" cols="30" rows="7" placeholder="Start typing here"></textarea>

  <button type="submit" class="button" >Publish</button>
</form>