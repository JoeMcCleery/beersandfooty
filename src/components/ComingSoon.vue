<template>
<div class="coming-soon uk-container">
  <div class="content-container">
    <img class="beer-image" src="../assets/beer.png">
    <div class="spin-container" id="ref-position">
      <img class="footy-image" src="../assets/footy.jpg" />
    </div>
  </div>
  <div class="uk-divider"></div>
  <div class="">
    <h1>{{ msg }}</h1>
    <p>
      The website is still in development, please come back soon!
    </p>
  </div>
</div>
</template>

<script>
import {
  TweenMax,
  Elastic
} from 'gsap'

export default {
  name: 'ComingSoon',
  props: {
    msg: String
  },
  computed: {
    el: function () {
      return document.getElementById('ref-position')
    }
  },
  methods: {
    rotateFooty: function (event) {
      //  Get rotation from compass to cursor
      var rect = this.el.getBoundingClientRect()
      var containerX = ((rect.left + rect.right) / 2)
      var containerY = ((rect.top + rect.bottom) / 2)
      var cursorX = event.clientX
      var cursorY = event.clientY
      var radians = Math.atan2(cursorX - containerX, cursorY - containerY)
      var degree = (radians * (180 / Math.PI) * -1) + 180 - 50
      //  Tween to new rotation
      TweenMax.to('.spin-container', 2.5, {
        directionalRotation: degree + '_short',
        transformOrigin: '50% 50%',
        ease: Elastic.easeOut.config(0.5, 0.25)
      }, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  $size: 33vw;
.coming-soon {
  padding: 2vw;
  .content-container {
    display: block;
    height: $size;
    width: $size;
    margin: auto;
    .beer-image{
      display: block;
      height: $size;
      width: auto;
      margin: auto;
      z-index: 100;
      background: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 50%);
      transition: transform 0.5s ease-in-out;
      &:hover {
        transform: rotate(180deg);
      }
    }
    .spin-container {
      position: relative;
      top: -90%;
      display: block;
      width: 80%;
      height: 80%;
      margin: auto;
      z-index: -1;
      .footy-image {
        display: block;
        width: 100%;
        height: auto;
        margin: auto;
        z-index: 0;
      }
    }
  }
}

</style>
