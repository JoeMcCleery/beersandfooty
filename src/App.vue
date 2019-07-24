<template>
  <div id="app" v-on:mousemove="sendMouseEventToCompass($event)">
    <ComingSoon msg="Welcome to BeersAndFooty.com" ref="comingsoon"/>
  </div>
</template>

<script>
import _ from 'lodash'

import ComingSoon from './components/ComingSoon.vue'

export default {
  name: 'app',
  components: {
    ComingSoon
  },
  methods: {
    sendMouseEventToCompass: _.throttle(function (event) {
      this.$refs.comingsoon.rotateFooty(event)
    }, 200)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
