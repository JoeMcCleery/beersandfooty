<template>
  <div
    uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; show-on-up: true;"
  >
    <nav id="navbar" class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <a
          href="#offcanvas-slide"
          class="uk-button uk-button-default"
          uk-toggle
        >
          <span uk-icon="icon: menu; ratio: 1;" />
          <span class="uk-visible@s">&nbsp;{{ title }}</span>
        </a>
        <div
          id="offcanvas-slide"
          uk-offcanvas="overlay: true; mode: slide; esc-close: true;"
        >
          <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <ul class="uk-nav uk-nav-primary uk-nav-center">
              <li :class="{ 'uk-active': title === 'Home' }">
                <a href="/"
                  ><img
                    src="~/assets/images/beersandfooty_logo_01.png"
                    alt="Beers and Footy Home"
                    width="100%"
                  />
                  Home</a
                >
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
              <li
                :class="{ 'uk-active': title === 'Admin' }"
                class="nav-bottom"
              >
                <a href="/admin">Admin</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
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
