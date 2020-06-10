<template>
  <div :id="title" class="main-page">
    <!--  Navbar  -->
    <navbar :pageTitle="title" />
    <!--  Page  -->
    <div>
      <nuxt />
    </div>
    <!--  Modals  -->
    <login-modal />
  </div>
</template>

<script>
export default {
  components: {
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
  head() {
    return {
      title: process.env.SITE_TITLE + ' - ' + this.title
    }
  }
}
</script>
