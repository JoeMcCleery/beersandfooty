<template>
  <div id="website-content">
    <ComingSoon msg="Welcome to BeersAndFooty.com"/>
  </div>
</template>

<script>
import ComingSoon from './components/ComingSoon.vue'

export default {
  name: 'app',
  components: {
    ComingSoon
  }
}
</script>

<style lang="scss">
#website-content {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
