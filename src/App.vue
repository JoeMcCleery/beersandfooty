<template>
  <div id="app" v-on:mousemove="sendMouseEventToSpinComponent($event)">
    <ComingSoon msg="Welcome to BeersAndFooty.com" ref="spinComponent"/>
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
    sendMouseEventToSpinComponent: _.throttle(function (event) {
      this.$refs.spinComponent.rotateFooty(event)
    }, 200)
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Quicksand', sans-serif;
  h1 {
    font-family: 'Rubik', sans-serif;
  }
  em {
    font-family: 'Pacifico', cursive;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  // overflow: hidden;
}
</style>
