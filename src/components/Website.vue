<template>
<div class="website">
  <div class="beers-window">
    <!-- <img src="../assets/beer.jpg" class="uk-position-center"/> -->
    <h1 class="uk-position-top-right uk-padding uk-margin-large-right">Beers</h1>
  </div>
  <div class="footy-window">
    <!-- <img src="../assets/footy.jpg" class="uk-position-center"/> -->
    <h1 class="uk-position-top-left uk-padding uk-margin-large-left">Footy</h1>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
$(document).ready(function () {
  $('.footy-window').click(function () {
    if (!$('.footy-window').hasClass('active')) {
      $('.footy-window').removeClass('inactive')
      $('.footy-window').addClass('active')
      $('.beers-window').removeClass('active')
      $('.beers-window').addClass('inactive')
    }
  })
  $('.beers-window').click(function () {
    if (!$('.beers-window').hasClass('active')) {
      $('.beers-window').removeClass('inactive')
      $('.beers-window').addClass('active')
      $('.footy-window').removeClass('active')
      $('.footy-window').addClass('inactive')
    }
  })
})
export default {
  name: 'Website'
}
</script>

<style lang="scss" scoped>
.website {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    img {
      height: 600px;
      width: auto;
    }
    h1 {
      color: white;
      font-size: 9vw;
      font-weight: bold;
      -webkit-text-stroke: 1px gray;
    }
    .beers-window {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 50%;
      background-color: red;
      transition: all 1s ease-in-out;
      &.active {
        transform: translateX(calc(50% - 20px));
        z-index: 100;
      }
      &.inactive {
        transform: translateX(calc(-50% + 20px));
      }
    }
    .footy-window {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      background-color: yellow;
      transition: all 1s ease-in-out;
      &.active {
        transform: translateX(calc(-50% + 20px));
        z-index: 100;
      }
      &.inactive {
        transform: translateX(calc(50% - 20px));
      }
    }
}
</style>
