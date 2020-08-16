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
          <li
            v-if="isAdmin"
            class="uk-margin-small-right"
            :class="{ 'uk-active': pageTitle === 'Admin' }"
          >
            <nuxt-link to="/admin" title="Admin">
              <span uk-icon="cog" />
            </nuxt-link>
          </li>
          <li v-if="loggedIn">
            <a
              href="#review-form-modal"
              class="uk-button uk-button-primary uk-border-rounded"
              title="Create New Review"
              style="padding: 0; width: 50px; line-height: 50px;"
              uk-toggle
              @click="clearEditReview"
            >
              <span uk-icon="icon: file-edit;" />
            </a>
          </li>
          <li v-else>
            <a
              href="#login-modal"
              class="uk-button uk-button-primary uk-border-rounded"
              style="padding: 0; width: 50px; line-height: 50px;"
              uk-toggle
            >
              <span uk-icon="icon: sign-in;" />
            </a>
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
  },
  methods: {
    clearEditReview() {
      if (this.$store.getters.getEditReview) {
        this.$store.dispatch('setEditReview', { review: null })
      }
    }
  }
}
</script>
