<template>
<div class="website">
  <div class="beers-window">
    <div class="top-pannel">
      <h1 class="uk-position-top-right uk-padding">BEERS</h1>
    </div>
    <hr class="uk-divider-small"/>
    <Review/>
    <Review/>
    <Review/>
  </div>
  <div class="footy-window">
    <div class="top-pannel">
      <h1 class="uk-position-top-left uk-padding">FOOTY</h1>
    </div>
    <hr class="uk-divider-small"/>
    <Review/>
    <Review/>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import Review from './Review'
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
  name: 'Website',
  components: {
    Review
  }
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
    h1 {
      color: white;
      font-size: 9vw;
      font-weight: bold;
      -webkit-text-stroke: 1px gray;
      padding-right: 30px;
      padding-left: 30px;
    }
    .top-pannel {
      height: calc(100vh - 60px);
      width: 100%;
    }
    .beers-window {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100%;
      position: absolute;
      right: 50%;
      float: right;
      background-color: red;
      transition: all 1s ease-in-out;
      width: calc(100% - 30px);
      &.active {
        right: calc(30px);
      }
      &.inactive {
        transform: translateX(calc(-50% + 30px));
        right: calc(50% + 15px);
      }
    }
    .footy-window {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100%;
      position: absolute;
      left: 50%;
      float: left;
      background-color: yellow;
      transition: all 1s ease-in-out;
      width: calc(100% - 30px);
      &.active {
        left: calc(30px);
      }
      &.inactive {
        left: calc(100% - 30px);
      }
    }
}
</style>
