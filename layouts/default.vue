<template>
  <div :id="title" class="main-page">
    <!--  Navbar  -->
    <navbar :page-title="title" />
    <!--  Global Actions  -->
    <div class="uk-position-bottom-right uk-position-fixed uk-position-z-index">
      <div class=" uk-padding-small">
        <a
          v-if="loggedIn"
          href="#review-form-modal"
          class="uk-button uk-button-primary uk-border-rounded"
          title="Create New Review"
          style="padding: 0; width: 50px; line-height: 50px;"
          uk-toggle
          @click="clearEditReview"
        >
          <span uk-icon="icon: file-edit;" />
        </a>
        <a
          v-else
          href="#login-modal"
          class="uk-button uk-button-primary uk-border-rounded"
          style="padding: 0; width: 50px; line-height: 50px;"
          uk-toggle
        >
          <span uk-icon="icon: sign-in;" />
        </a>
      </div>
    </div>
    <!--  Page  -->
    <div>
      <svg-background />
      <nuxt />
    </div>
    <!--  Modals  -->
    <login-modal />
    <review-form-modal />
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  components: {
    ReviewFormModal: () => import('~/components/ReviewFormModal.vue'),
    Navbar: () => import('~/components/Navbar.vue'),
    LoginModal: () => import('~/components/LoginModal.vue'),
    SvgBackground: () => import('~/components/SvgBackground.vue')
  },
  async fetch() {
    if (!this.$store.state.clientAccessToken) {
      try {
        await this.$store.dispatch('getClientToken', {
          client_id: process.env.CREDENTIALS_CLIENT_ID,
          client_secret: process.env.CREDENTIALS_CLIENT_SECRET,
          scope: '*'
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  computed: {
    title() {
      return this.$store.state.page
        ? this.$store.state.page
        : this.$nuxt.$route.name === 'index'
        ? 'Home'
        : this.$nuxt.$route.name
    },
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    }
  },
  mounted() {
    if (
      Vue.prototype.$localStorageGet('userAccessToken') &&
      Vue.prototype.$localStorageGet('user')
    ) {
      this.$store.dispatch('setUserTokenFromLocalStorage')
      this.$store.dispatch('getCurrentUser')
    }
  },
  methods: {
    clearEditReview() {
      if (this.$store.getters.getEditReview) {
        this.$store.dispatch('setEditReview', { review: null })
      }
    }
  },
  head() {
    return {
      title: process.env.SITE_TITLE + ' - ' + this.title
    }
  }
}
</script>
