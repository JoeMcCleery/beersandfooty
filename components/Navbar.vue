<template>
  <div id="navbar">
    <a
      href="#offcanvas-slide"
      class="uk-button uk-button-default  uk-height-1-1"
      uk-toggle
      uk-icon="menu"
    ></a>
    <span class="navbar-title">{{ title }}</span>
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
  name: 'Navbar',
  props: {
    title: {
      type: String,
      default: 'Home'
    }
  }
}
</script>
