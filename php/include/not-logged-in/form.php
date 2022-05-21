
<form action="<?php echo $submit_to ?>" method="POST">
  <h2><?php echo $page_title ?></h2>

  <?php
  foreach ($fields as $field => $type) {
    $content = ucwords($field);
    echo <<<_INPUT
      <label for="$field">$content</label>
      <input type="$type" name="$field" id=$field">
    _INPUT;
  }
  ?>

  <button type="submit" class="button">Submit</button>
</form>