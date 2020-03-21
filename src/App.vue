<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
html, body {
  height: 100vh;
  transform: translate3d(0,0,0);
  perspective: 500px;
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
