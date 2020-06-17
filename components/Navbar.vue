<template>
  <div id="navbar" class="uk-position-fixed uk-position-top">
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-right uk-flex-right">
        <a
          href="#offcanvas-slide"
          class="uk-button uk-button-default uk-hidden@m"
          uk-toggle
        >
          <span>&nbsp;{{ pageTitle }}</span>
          <span uk-icon="icon: menu; ratio: 1;" />
        </a>
        <ul class="uk-navbar-nav uk-visible@m">
          <li :class="{ 'uk-active': pageTitle === 'Home' }">
            <nuxt-link to="/" class="">Beers and Footy</nuxt-link>
          </li>
          <li class="uk-nav-divider"></li>
          <li :class="{ 'uk-active': pageTitle === 'About' }">
            <nuxt-link to="/about" class="">About</nuxt-link>
          </li>
          <!-- Auth Routes -->
          <li v-if="loggedIn" :class="{ 'uk-active': pageTitle === 'Account' }">
            <nuxt-link to="/account" class="">
              Account
            </nuxt-link>
          </li>
          <a
            v-if="loggedIn"
            href="#review-form-modal"
            class="uk-button uk-button-primary"
            uk-toggle
          >
            Create Review
          </a>
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
          <div class="uk-offcanvas-bar uk-hidden@m">
            <ul class="uk-nav uk-nav-primary uk-nav-center">
              <li :class="{ 'uk-active': pageTitle === 'Home' }">
                <nuxt-link to="/" uk-toggle="target: #offcanvas-slide;"
                  >Beers and Footy</nuxt-link
                >
              </li>
              <li class="uk-nav-divider"></li>
              <li :class="{ 'uk-active': pageTitle === 'About' }">
                <nuxt-link to="/about" uk-toggle="target: #offcanvas-slide;"
                  >About</nuxt-link
                >
              </li>
              <!-- Auth Routes -->
              <li
                v-if="loggedIn"
                :class="{
                  'uk-active': pageTitle === 'Account'
                }"
                class="account uk-position-bottom"
              >
                <nuxt-link to="/account" uk-toggle="target: #offcanvas-slide;"
                  >Account</nuxt-link
                >
              </li>
              <a
                v-if="loggedIn"
                href="#review-form-modal"
                class="uk-button uk-button-primary uk-position-bottom"
                uk-toggle
              >
                Create Review
              </a>
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
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    pageTitle: {
      type: String,
      default: 'Home'
    }
  },
  data() {
    return {
      pageTitleData: this.pageTitle
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    }
  }
}
</script>

<style src="assets/scss/modules/_navbar.scss" lang="scss"></style>
