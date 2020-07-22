<template>
  <div id="navbar" class="uk-position-fixed uk-position-top">
    <nav class="uk-navbar-container" uk-navbar>
      <div
        class="uk-flex uk-flex-center uk-flex-middle uk-height-1-1 uk-width-1-1"
      >
        <ul class="uk-navbar-nav">
          <li :class="{ 'uk-active': pageTitle === 'Home' }">
            <nuxt-link class="no-uk-icon" to="/" title="Beers and Footy Home">
              <span class="icon-container uk-height-1-1">
                <img
                  :class="{ 'icon-beer': pageTitle === 'Home' }"
                  data-src="@/assets/images/beer-icon.svg"
                  uk-svg
                />
              </span>
              <span class="icon-container uk-height-1-1">
                <img
                  :class="{ 'icon-footy': pageTitle === 'Home' }"
                  data-src="@/assets/images/football-icon.svg"
                  uk-svg
                />
              </span>
            </nuxt-link>
          </li>
          <li class="uk-nav-divider"></li>
          <li :class="{ 'uk-active': pageTitle === 'About' }">
            <nuxt-link to="/about" title="About">
              <span uk-icon="info" />
            </nuxt-link>
          </li>
          <!-- Auth Routes -->
          <li v-if="loggedIn" :class="{ 'uk-active': pageTitle === 'Account' }">
            <nuxt-link to="/account" title="Account">
              <span uk-icon="user" />
            </nuxt-link>
          </li>
          <li v-if="isAdmin" :class="{ 'uk-active': pageTitle === 'Admin' }">
            <nuxt-link to="/admin" title="Admin">
              <span uk-icon="cog" />
            </nuxt-link>
          </li>
        </ul>
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
    },
    isAdmin() {
      return this.loggedIn && this.$store.state.user.isAdmin
    }
  }
}
</script>
