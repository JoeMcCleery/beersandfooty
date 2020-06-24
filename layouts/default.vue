<template>
  <div :id="title" class="main-page">
    <!--  Navbar  -->
    <navbar :page-title="title" />
    <!--  Page  -->
    <div>
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
    LoginModal: () => import('~/components/LoginModal.vue')
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
  head() {
    return {
      title: process.env.SITE_TITLE + ' - ' + this.title
    }
  }
}
</script>
