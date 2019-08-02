<template>
  <div id="app">
    <Website/>
    <BackgroundVideo/>
  </div>
</template>

<script>
import _ from 'lodash'
import Website from './components/Website.vue'
import BackgroundVideo from './components/BackgroundVideo'

export default {
  name: 'app',
  components: {
    Website,
    BackgroundVideo
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
  overflow: hidden;
}
#app {
  font-family: 'Quicksand', sans-serif;
  h1 {
    font-family: 'Muli', sans-serif;
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
  overflow: hidden;
}
</style>
