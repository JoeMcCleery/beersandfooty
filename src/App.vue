<template>
  <div id="app">
    <img class="beer" alt="Beer" src="./assets/beer.png">
    <img class="footy" alt="Footy" src="./assets/footy.jpg">
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .beer, .footy{
    transition: transform 0.3s ease-out;
    width: 20%;
    height: auto;
    z-index: 0;
  }
  .beer:hover{
    transform: rotate(-180deg);
  }
  .footy:hover{
    transform: rotate(180deg);
  }
}
</style>
