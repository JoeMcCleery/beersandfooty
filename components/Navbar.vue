<template>
  <div id="navbar" class="uk-box-shadow-small">
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
          <li :class="{ 'uk-active': title === 'Home' }">
            <a href="/">Home</a>
          </li>
          <li class="uk-nav-divider"></li>
          <li :class="{ 'uk-active': title === 'Beer' }">
            <a href="/beer">Beer</a>
          </li>
          <li :class="{ 'uk-active': title === 'Footy' }">
            <a href="/footy">Footy</a>
          </li>
          <li class="uk-nav-divider"></li>
          <li :class="{ 'uk-active': title === 'About' }">
            <a href="/about">About</a>
          </li>
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
