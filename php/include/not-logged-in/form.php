
<form action="<?php echo "$dir/php/$submit_to" ?>" method="POST">
  <h2><?php echo $page_title ?></h2>

  <?php
  foreach ($fields as $field => $type) {
    $content = ucwords($field);
    if (strpos($content, "repeat") !== false) {
      echo <<<_LABEL
        <label for="$field">Password Repeat</label>
      _LABEL;
    } else {
      echo <<<_LABEL
        <label for="$field">$content</label>
      _LABEL;
    }
    echo <<<_INPUT
      <input type="$type" name="$field" id=$field">
    _INPUT;
  }
  ?>

  <button type="submit" class="button">Submit</button>
</form>