<template>
  <div :id="RouteName">
    <Navbar :title="RouteName" />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  components: {
    Navbar
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

