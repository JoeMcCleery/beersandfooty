<template>
<div class="website">
  <div class="beers-window">
    <div class="top-pannel">
      <h1 class="uk-position-top-right">BEERS</h1>
    </div>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
  </div>
  <div class="footy-window">
    <div class="top-pannel">
      <h1 class="uk-position-top-left">FOOTY</h1>
    </div>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
    <Review/>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import Review from './Review'
$(document).ready(function () {
  let footy = $('.footy-window')
  let beers = $('.beers-window')
  footy.click(function () {
    if (!footy.hasClass('active')) {
      footy.removeClass('inactive')
      footy.addClass('active')
      beers.removeClass('active')
      beers.addClass('inactive')
    }
  })
  beers.click(function () {
    if (!beers.hasClass('active')) {
      beers.removeClass('inactive')
      beers.addClass('active')
      footy.removeClass('active')
      footy.addClass('inactive')
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
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  h1 {
    color: white;
    font-size: 7vw;
    font-weight: bold;
    padding-right: 30px;
    padding-left: 30px;
    text-shadow: 0 1px 2px rgba(0,0,0, 0.25);
  }
  .top-pannel {
    height: 9vw;
    width: 100%;
    top: 0;
    position: sticky;
    background-color: inherit;
    z-index: 1;
    box-shadow: 0 2px 4px rgba(0,0,0, 0.25);
  }
  .beers-window {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    position: absolute;
    right: 50%;
    float: right;
    background-color: red;
    transition: all 0.5s ease-in-out;
    width: calc(100% - 30px);
    &.active {
      right: calc(30px);
    }
    &.inactive {
      transform: translateX(calc(-50% + 30px));
      right: calc(50% + 15px);
      opacity: 0.2;
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
    transition: all 0.5s ease-in-out;
    width: calc(100% - 30px);
    direction: rtl;
    &.active {
      left: calc(30px);
    }
    &.inactive {
      left: calc(100% - 30px);
      opacity: 0.2;
    }
  }
}
</style>
