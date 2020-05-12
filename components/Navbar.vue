<template>
  <div
    uk-sticky="animation: uk-animation-fade; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky uk-box-shadow-medium; cls-inactive: uk-navbar-transparent; show-on-up: true;"
  >
    <div class="uk-position-top">
      <nav
        id="navbar"
        class="uk-navbar-container uk-dark uk-navbar-transparent"
        uk-navbar
      >
        <div class="uk-navbar-right">
          <a
            href="#offcanvas-slide"
            class="uk-button uk-link-text uk-hidden@s"
            uk-toggle
          >
            <span>&nbsp;{{ title }}</span>
            <span uk-icon="icon: menu; ratio: 1;" />
          </a>
          <ul class="uk-navbar-nav uk-visible@s">
            <li :class="{ 'uk-active': title === 'Home' }">
              <a href="/" class="uk-button">Home</a>
            </li>
            <li class="uk-nav-divider"></li>
            <li :class="{ 'uk-active': title === 'Beer' }">
              <a href="/beer" class="uk-button">Beer</a>
            </li>
            <li :class="{ 'uk-active': title === 'Footy' }">
              <a href="/footy" class="uk-button">Footy</a>
            </li>
            <li class="uk-nav-divider"></li>
            <li :class="{ 'uk-active': title === 'About' }">
              <a href="/about" class="uk-button">About</a>
            </li>
          </ul>
          <div
            id="offcanvas-slide"
            uk-offcanvas="overlay: true; mode: slide; esc-close: true; flip: true;"
          >
            <div class="uk-offcanvas-bar">
              <button
                class="uk-offcanvas-close"
                type="button"
                uk-close
              ></button>
              <ul class="uk-nav uk-nav-primary uk-nav-center">
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
      </nav>
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
