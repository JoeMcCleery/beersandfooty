<template>
  <div class="coming-soon uk-container">
    <img class="beer" alt="Beer" src="../assets/beer.png">
    <img class="footy" alt="Footy" src="../assets/footy.jpg">
    <div class="uk-divider"></div>
    <h1>{{ msg }}</h1>
    <p>
      The website is still in development, please come back soon!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">
.coming-soon {
  .beer, .footy{
    transition: transform 0.3s ease-out;
    width: 50%;
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
