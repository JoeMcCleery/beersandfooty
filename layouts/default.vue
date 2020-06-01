<template>
  <div :id="RouteName" class="main-page">
    <!--  Navbar  -->
    <navbar :title="RouteName" />
    <!--  Content  -->
    <div class="content">
      <svg-background />
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
    SvgBackground: () => import('~/components/SvgBackground.vue'),
    LoginModal: () => import('~/components/LoginModal.vue')
  },
  fetch() {
    this.getClientToken()
  },
  computed: {
    RouteName() {
      if (this.$nuxt.$route.name === 'index') {
        return 'Home'
      } else {
        return this.$nuxt.$route.name
      }
    }
  },
  methods: {
    getClientToken() {
      try {
        this.$store.dispatch('getClientToken', {
          client_id: process.env.CREDENTIALS_CLIENT_ID,
          client_secret: process.env.CREDENTIALS_CLIENT_SECRET,
          scope: '*'
        })
      } catch (e) {
        setTimeout(this.getClientToken, 5000)
      }
    }
  },
  head() {
    return {
      title: process.env.SITE_TITLE + ' - ' + this.RouteName
    }
  }
}
</script>
