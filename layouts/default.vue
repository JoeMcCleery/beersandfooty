<template>
  <div :id="RouteName" class="main-page">
    <navbar :title="RouteName" />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Navbar: () => import('~/components/Navbar.vue')
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
  head() {
    return {
      title: process.env.SITE_TITLE + ' - ' + this.RouteName
    }
  }
}
</script>
