<template>
  <div id="navbar">
    <a
      href="#offcanvas-slide"
      class="uk-button uk-button-default  uk-height-1-1"
      uk-toggle
      uk-icon="menu"
    ></a>
    <span class="navbar-title">{{ title }}</span>
    <div
      id="offcanvas-slide"
      uk-offcanvas="overlay: true; mode: slide; esc-close: true;"
    >
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <ul class="uk-nav uk-nav-primary uk-text-center">
          <li :class="{ 'uk-active': title === 'Home' }">
            <a href="/"
              ><img
                src="~/assets/images/beersandfooty_logo_01.png"
                alt="Beers and Footy Home"
                width="50%"
            /></a>
          </li>
          <li class="uk-nav-divider"></li>
          <li :class="{ 'uk-active': title === 'Beer' }">
            <a href="/beer">Beer Reviews</a>
          </li>
          <li :class="{ 'uk-active': title === 'Footy' }">
            <a href="/footy">Footy Reviews</a>
          </li>
          <li class="uk-nav-divider"></li>
          <li :class="{ 'uk-active': title === 'About' }">
            <a href="/about">About</a>
          </li>
          <li :class="{ 'uk-active': title === 'Admin' }" class="nav-bottom">
            <a href="/admin">Admin</a>
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
