<section id="profile-stats">
  <h3><?php echo $page_title ?></h3>

  <ol id="profile-stats-options">
    <li class="active">Confessions Created</li>
    <li>Confessions Liked</li>
  </ol>
</section>
<section id="confessions-created">
  <template>
    <section class="confession-card">
      <h3>Title</h3>
      <p>username | dd mm</p>
      <p>Body</p>

      <div class="options">
        <div class="like-counter">
          <img src="<?php echo "$dir/images/thumbs-up-outline.svg" ?>" width="19" height="19">
          <p>0</p>
        </div>

        <ol class="update">
          <li>
            <a href="../edit" class="button">Edit</a>
          </li>
          <li class="button">Delete</li>
        </ol>
      </div>
    </section>
  </template>

</section>