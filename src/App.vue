<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
UIkit.use(Icons)
export default {
  name: 'app'
}
</script>

<style lang="scss">
html, body {
  min-height: 100vh;
  perspective: 550px;
  overflow-x: hidden;
}
h1 {
  font-family: 'Muli', sans-serif;
}
em {
  font-family: 'Pacifico', cursive;
  color: inherit;
}
#app {
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
