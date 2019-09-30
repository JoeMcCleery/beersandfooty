<template>
<div>
  <div class="beers-window">
    <div class="top-pannel">
      <h1 class="header-title">BEERS</h1>
    </div>
    <div class="window-content">
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
  <div class="footy-window">
    <div class="top-pannel">
      <h1 class="header-title">FOOTY</h1>
    </div>
    <div class="window-content">
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
</div>
</template>

<script>
import $ from 'jquery'
import Review from './Review'
$(document).ready(function () {
  let footy = $('.footy-window')
  let beers = $('.beers-window')
  footy.click(togglefooty)
  beers.click(togglebeers)
})
function togglefooty () {
  let footy = $('.footy-window')
  let beers = $('.beers-window')
  if (!footy.hasClass('active')) {
    footy.removeClass('inactive')
    footy.addClass('active')
    beers.removeClass('active')
    beers.addClass('inactive')
  }
}
function togglebeers () {
  let footy = $('.footy-window')
  let beers = $('.beers-window')
  if (!beers.hasClass('active')) {
    beers.removeClass('inactive')
    beers.addClass('active')
    footy.removeClass('active')
    footy.addClass('inactive')
  }
}
export default {
  name: 'Website',
  components: {
    Review
  }
}
</script>

<style lang="scss" scoped>
  $animation-duration: 600ms;
  $beerscolour: #F9690E;
  $beerscolour-darker: darken( #F9690E, 5%);
  $footycolour: #FFB61E;
  $footycolour-darker: darken( #FFB61E, 5%);
  .top-pannel {
    height: 30px;
    width: 100%;
    top: 0;
    position: sticky;
  }
  .header-title {
    line-height: 30px;
    color: white;
    font-size: 22px;
    font-weight: bold;
    margin: auto;
    padding: 0 40px 0 40px;
    transition: transform $animation-duration ease-in-out;
  }
  .window-content {
    height: calc(100% - 30px);
    overflow-x: hidden;
    transition: transform $animation-duration ease-in-out;
  }
  .beers-window {
    overflow: hidden;
    height: 100%;
    position: absolute;
    right: 50%;
    background-color: $beerscolour;
    transition: right $animation-duration ease-in-out;
    width: calc(100% - 30px);
    .top-pannel {
      background-color: $beerscolour;
    }
    .header-title {
      transform-origin: calc(100% - 15px);
      float: right;
      background: url("../assets/leftarrow.svg") no-repeat calc(100% + 1px) 3px;
    }
    .window-content {
      transform-origin: top left;
      transform: rotateZ(90deg);
    }
    &.active {
      right: calc(30px);
      .header-title {
        transform: translateX(calc(-50vw + 50% + 15px));
        background: transparent;
      }
      .window-content {
        transform: rotateZ(0);
      }
    }
    &.inactive {
      cursor: pointer;
      right: calc(100% - 30px);
      .header-title {
        transform: rotateZ(-90deg);
      }
    }
  }
  .footy-window {
    overflow: hidden;
    height: 100%;
    position: absolute;
    left: 50%;
    background-color: $footycolour;
    transition: left $animation-duration ease-in-out;
    width: calc(100% - 30px);
    .top-pannel {
      background-color: $footycolour;
    }
    .header-title {
      transform-origin: 15px;
      float: left;
      background: url("../assets/rightarrow.svg") no-repeat 4px 3px;
    }
    .window-content {
      transform-origin: top right;
      transform: rotateZ(-90deg);
    }
    &.active {
      left: calc(30px);
      .header-title {
        transform: translateX(calc(50vw - 50% - 15px));
        background: transparent;
      }
      .window-content {
        transform: rotateZ(0);
      }
    }
    &.inactive {
      cursor: pointer;
      left: calc(100% - 30px);
      .header-title {
        transform: rotateZ(90deg);
      }
    }
  }
</style>
