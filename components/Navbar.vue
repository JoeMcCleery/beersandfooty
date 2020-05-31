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
              <nuxt-link to="/" class="">Home</nuxt-link>
            </li>
            <li class="uk-nav-divider"></li>
            <li :class="{ 'uk-active': title === 'Beer' }">
              <nuxt-link to="/beer" class="">Beer</nuxt-link>
            </li>
            <li :class="{ 'uk-active': title === 'Footy' }">
              <nuxt-link to="/footy" class="">Footy</nuxt-link>
            </li>
            <li class="uk-nav-divider"></li>
            <li :class="{ 'uk-active': title === 'About' }">
              <nuxt-link to="/about" class="">About</nuxt-link>
            </li>
            <!-- Auth Routes -->
            <li v-if="user" :class="{ 'uk-active': title === 'Account' }">
              <nuxt-link to="/account" class="">
                Account
              </nuxt-link>
            </li>
            <a
              v-else
              href="#login-modal"
              class="uk-button uk-button-primary"
              uk-toggle
            >
              Login / Register
            </a>
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
                  <nuxt-link to="/" uk-toggle="target: #offcanvas-slide;"
                    >Home</nuxt-link
                  >
                </li>
                <li class="uk-nav-divider"></li>
                <li :class="{ 'uk-active': title === 'Beer' }">
                  <nuxt-link to="/beer" uk-toggle="target: #offcanvas-slide;"
                    >Beer</nuxt-link
                  >
                </li>
                <li :class="{ 'uk-active': title === 'Footy' }">
                  <nuxt-link to="/footy" uk-toggle="target: #offcanvas-slide;"
                    >Footy</nuxt-link
                  >
                </li>
                <li class="uk-nav-divider"></li>
                <li :class="{ 'uk-active': title === 'About' }">
                  <nuxt-link to="/about" uk-toggle="target: #offcanvas-slide;"
                    >About</nuxt-link
                  >
                </li>
                <!-- Auth Routes -->
                <li v-if="user" :class="{ 'uk-active': title === 'Account' }">
                  <nuxt-link to="/account" uk-toggle="target: #offcanvas-slide;"
                    >Account</nuxt-link
                  >
                </li>
                <a
                  v-else
                  href="#login-modal"
                  class="uk-button uk-button-primary uk-position-bottom"
                  uk-toggle
                >
                  Login / Register
                </a>
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
