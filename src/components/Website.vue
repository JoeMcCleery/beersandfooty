<template>
  <div>
    <div class="beers-window">
      <div class="top-pannel">
        <h1 class="header-title">BEERS</h1>
      </div>
      <div class="window-content">
        <!-- Beers Content -->
        <section class="uk-section uk-container">
          <review v-for="(review, idx) in this.beerReviews" :key="idx" :review="review"/>
        </section>
      </div>
    </div>
    <div class="footy-window">
      <div class="top-pannel">
        <h1 class="header-title">FOOTY</h1>
      </div>
      <div class="window-content">
        <!-- Footy Content -->
        <section class="uk-section uk-container">
          <review v-for="(review, idx) in this.footyReviews" :key="idx" :review="review"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Review from './Review'
import $ from 'jquery'
const beerContext = require.context('../../public/posts/beerReview/', true, /\.json$/)
let beerReviews = []
beerContext.keys().forEach(function (key) {
  beerReviews.push(beerContext(key))
})
const footyContext = require.context('../../public/posts/footyReview/', true, /\.json$/)
let footyReviews = []
footyContext.keys().forEach(function (key) {
  footyReviews.push(footyContext(key))
})
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
  },
  data () {
    return {
      footyReviews,
      beerReviews
    }
  }
}
</script>

<style lang="scss" scoped>
  $animation-duration: 1000ms;
  $beerscolour: #F9690E;
  $beerscolour-darker: darken(#F9690E, 5%);
  $footycolour: #FFB61E;
  $footycolour-darker: darken(#FFB61E, 5%);
  .top-pannel {
    height: 30px;
    width: 100%;
    top: 0;
    position: sticky;
    box-shadow: 0 0 15px rgba(0,0,0,0.08);
    z-index: 1;
    transition: box-shadow $animation-duration ease-in-out;
  }

  .header-title {
    line-height: 30px;
    color: white;
    font-size: 22px;
    font-weight: bold;
    margin: auto;
    padding: 0 40px 0 40px;
    transition: transform $animation-duration / 2 ease-in-out;
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
    transition: right $animation-duration ease-in-out, transform $animation-duration / 2 ease-in-out;
    width: calc(100% - 30px);
    transform-origin: right;

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
      transform: translateX(-100%);
    }

    &.active {
      right: calc(30px);
      transform: rotate3d(0,0,0,0deg);

      .header-title {
        transform: translateX(calc(-50vw + 50% + 15px));
        background: transparent;
      }

      .window-content {
        transform: rotate3d(0,0,0,0deg);
      }
    }

    &.inactive {
      cursor: pointer;
      right: calc(100% - 30px);
      .header-title {
        transform: rotateZ(-90deg);
      }
      .top-pannel {
        box-shadow: none;
      }
    }
  }

  .footy-window {
    overflow: hidden;
    height: 100%;
    position: absolute;
    left: 50%;
    background-color: $footycolour;
    transition: left $animation-duration ease-in-out, transform $animation-duration / 2 ease-in-out;
    width: calc(100% - 30px);
    transform-origin: left;

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
      transform: translateX(100%);
    }

    &.active {
      left: calc(30px);
      transform: rotate3d(0,0,0,0deg);

      .header-title {
        transform: translateX(calc(50vw - 50% - 15px));
        background: transparent;
      }

      .window-content {
        transform: rotate3d(0,0,0,0deg);
      }
    }

    &.inactive {
      cursor: pointer;
      left: calc(100% - 30px);
      .header-title {
        transform: rotateZ(90deg);
      }
      .top-pannel {
        box-shadow: none;
      }
    }
  }
</style>
