<template>
  <div>
    <div class="beers-window">
      <div class="top-pannel uk-box-shadow-large">
        <h1 class="header-title">BEERS</h1>
      </div>
      <div class="window-content">
        <!-- Beers Content -->
        <section class="uk-section-small uk-margin-bottom uk-container uk-container-large">
          <div class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            <review class="beer-review" v-for="review in this.orderedBeerReviews" :key="review.publishDate + review.title" :review="review" :id="review.title"/>
          </div>
        </section>
      </div>
    </div>
    <div class="footy-window">
      <div class="top-pannel uk-box-shadow-large">
        <h1 class="header-title">FOOTY</h1>
      </div>
      <div class="window-content">
        <!-- Footy Content -->
        <section class="uk-section-small uk-margin-bottom uk-container uk-container-large">
          <div class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            <review class="footy-review" v-for="review in this.orderedFootyReviews" :key="review.publishDate + review.title" :review="review" :id="review.title"/>
          </div>
        </section>
      </div>
    </div>
    <div class="uk-position-bottom-center footer">
      <a class="uk-button uk-button-secondary uk-button-small" href="mailto:contact@beersandfooty.com?subject=Feedback" title="Send Feedback Email">Give Us Some Feedback.</a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
require('jquery-touchswipe')
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
  $('.beers-window').click(togglebeers)
  $('.footy-window').click(togglefooty)
  $('.window-content').swipe({
    swipeRight: function (e) {
      togglebeers()
    },
    swipeLeft: function (e) {
      togglefooty()
    }
  })
})

function togglebeers () {
  let footy = $('.footy-window')
  let beers = $('.beers-window')
  if (!beers.hasClass('active')) {
    window.history.pushState('', '', '/beers')
    beers.removeClass('inactive')
    beers.addClass('active')
    footy.removeClass('active')
    footy.addClass('inactive')
  }
}
function togglefooty () {
  let footy = $('.footy-window')
  let beers = $('.beers-window')
  if (!footy.hasClass('active')) {
    window.history.pushState('', '', '/footy')
    footy.removeClass('inactive')
    footy.addClass('active')
    beers.removeClass('active')
    beers.addClass('inactive')
  }
}

export default {
  name: 'Website',
  components: {
    Review: () => import('./Review')
  },
  data () {
    return {
      footyReviews,
      beerReviews
    }
  },
  computed: {
    orderedBeerReviews: function () {
      return _.orderBy(this.beerReviews, 'publishDate', 'desc')
    },
    orderedFootyReviews: function () {
      return _.orderBy(this.footyReviews, 'publishDate', 'desc')
    }
  },
  mounted () {
    if (window.location.pathname === '/beers') {
      togglebeers()
    } else if (window.location.pathname === '/footy') {
      togglefooty()
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
  .footer {
    z-index: 100;
    text-align: center;
    width: 100%;
    a {
      padding-top: 0.25em;
      border-radius: 25px 25px 0 0;
    }
  }

  .top-pannel {
    height: 80px;
    width: 100%;
    top: 0;
    position: sticky;
    z-index: 1;
    transition: transform $animation-duration ease-in-out;
  }

  .header-title {
    line-height: 80px;
    color: white;
    font-size: 2em;
    font-weight: bold;
    margin: auto;
    transition: transform $animation-duration / 2 ease-in-out, font-size $animation-duration / 2 ease-in-out, padding $animation-duration / 2 ease-in-out;
    padding: 0 40px;
  }

  .window-content {
    height: calc(100% - 80px);
    overflow-x: hidden;
    transition: transform $animation-duration ease-in-out;
  }

  .beers-window {
    cursor: pointer;
    height: 100%;
    position: absolute;
    right: 50%;
    background-color: $beerscolour;
    transition: right $animation-duration ease-in-out, transform $animation-duration / 2 ease-in-out;
    width: 100%;
    transform-origin: right;

    .top-pannel {
      background-color: $beerscolour;
    }

    .header-title {
      transform-origin: center;
      float: right;
    }

    .window-content {
      transform-origin: top left;
      transform: translateX(-100%);
    }

    &.active {
      cursor: auto;
      right: 0;
      transform: rotate3d(0,0,0,0deg);
      z-index: 0;

      .header-title {
        transform: translateX(calc(-50vw + 50%));
        background: transparent;
      }

      .top-pannel {
        transform: translateX(0);
      }

      .window-content {
        transform: rotate3d(0,0,0,0deg);
      }
    }

    &.inactive {
      right: 100%;
      z-index: 1;
      .header-title {
        transform: rotateZ(-90deg);
        font-size: 1em;
        padding: 0;
      }
      .top-pannel {
        transform: translateX(50px);
        z-index: 2;
      }
    }
  }

  .footy-window {
    cursor: pointer;
    height: 100%;
    position: absolute;
    left: 50%;
    background-color: $footycolour;
    transition: left $animation-duration ease-in-out, transform $animation-duration / 2 ease-in-out;
    width: 100%;
    transform-origin: left;

    .top-pannel {
      background-color: $footycolour;
    }

    .header-title {
      transform-origin: center;
      float: left;
    }

    .window-content {
      transform-origin: top right;
      transform: translateX(100%);
    }

    &.active {
      cursor: auto;
      left: 0;
      transform: rotate3d(0,0,0,0deg);
      z-index: 0;

      .header-title {
        transform: translateX(calc(50vw - 50%));
        background: transparent;
      }

      .top-pannel {
        transform: translateX(0);
      }

      .window-content {
        transform: rotate3d(0,0,0,0deg);
      }
    }

    &.inactive {
      cursor: pointer;
      left: 100%;
      z-index: 1;
      .header-title {
        transform: rotateZ(90deg);
        font-size: 1em;
        padding: 0;
      }
      .top-pannel {
        transform: translateX(-50px);
        z-index: 2;
      }
    }
  }
</style>
