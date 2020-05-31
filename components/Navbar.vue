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
            class="uk-button uk-button-default uk-hidden@s"
            uk-toggle
          >
            <span>&nbsp;{{ title }}</span>
            <span uk-icon="icon: menu; ratio: 1;" />
          </a>
          <ul class="uk-navbar-nav uk-visible@s">
            <li :class="{ 'uk-active': title === 'Home' }">
              <nuxt-link to="/" class="uk-navbar-item">Home</nuxt-link>
            </li>
            <li class="uk-nav-divider"></li>
            <li :class="{ 'uk-active': title === 'Beer' }">
              <nuxt-link to="/beer" class="uk-navbar-item">Beer</nuxt-link>
            </li>
            <li :class="{ 'uk-active': title === 'Footy' }">
              <nuxt-link to="/footy" class="uk-navbar-item">Footy</nuxt-link>
            </li>
            <li class="uk-nav-divider"></li>
            <li :class="{ 'uk-active': title === 'About' }">
              <nuxt-link to="/about" class="uk-navbar-item">About</nuxt-link>
            </li>
            <!-- Auth Routes -->
            <li v-if="user" :class="{ 'uk-active': title === 'Account' }">
              <nuxt-link to="/account" class="uk-navbar-item">
                Account
              </nuxt-link>
            </li>
            <li v-else>
              <a href="#login-modal" class="uk-navbar-item" uk-toggle>
                Login / Register
              </a>
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
                  <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="uk-nav-divider"></li>
                <li :class="{ 'uk-active': title === 'Beer' }">
                  <nuxt-link to="/beer">Beer</nuxt-link>
                </li>
                <li :class="{ 'uk-active': title === 'Footy' }">
                  <nuxt-link to="/footy">Footy</nuxt-link>
                </li>
                <li class="uk-nav-divider"></li>
                <li :class="{ 'uk-active': title === 'About' }">
                  <nuxt-link to="/about">About</nuxt-link>
                </li>
                <!-- Auth Routes -->
                <li v-if="user" :class="{ 'uk-active': title === 'Account' }">
                  <nuxt-link to="/account">Account</nuxt-link>
                </li>
                <li v-else>
                  <a href="#login-modal" uk-toggle>
                    Login / Register
                  </a>
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
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>
