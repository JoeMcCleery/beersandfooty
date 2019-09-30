<template>
  <div id="app">
    <Website/>
  </div>
</template>

<script>
import _ from 'lodash'
import Website from './components/Website.vue'

export default {
  name: 'app',
  components: {
    Website
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
  height: 100vh;
  transform: translate3d(0,0,0);
  perspective: 500px;
  overflow: hidden;
}
#app {
  font-family: 'Quicksand', sans-serif;
  h1 {
    font-family: 'Muli', sans-serif;
  }
  em {
    font-family: 'Pacifico', cursive;
    color: inherit;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}
</style>
