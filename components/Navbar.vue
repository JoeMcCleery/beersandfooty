<template>
  <div>
    <a href="#offcanvas-slide" class="uk-button uk-button-default" uk-toggle
      >Menu</a
    >
    <div id="offcanvas-slide" uk-offcanvas>
      <div class="uk-offcanvas-bar">
        <ul class="uk-nav uk-nav-default">
          <li><a href="/">Home</a></li>
          <li class="uk-nav-divider"></li>
          <li><a href="/beer">Beer Reviews</a></li>
          <li><a href="/footy">Footy Reviews</a></li>
          <li class="uk-nav-divider"></li>
          <li><a href="/about">About Us</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
