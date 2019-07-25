<template>
<div class="coming-soon uk-container">
  <div class="uk-divider"></div>
  <h1>{{ msg }}</h1>
  <hr/>
  <div class="uk-divider"></div>
  <div class="footybeers-container">
    <img class="beer-image" src="../assets/beer.png">
    <div class="spin-container" id="ref-position">
      <img class="footy-image" src="../assets/footy.jpg" />
    </div>
  </div>
  <div class="uk-divider"></div>
  <div class="text-container">
    <div>
      <h2>
        The website is still in development
      </h2>
      <h3>
        please come back soon!<br/>
      </h3>
    </div>
      <div class="contact-text">
        <a href="mailto:contact@beersandfooty.com?Subject=Website%20Inquiry" style="color: inherit; text-decoration: none;">
          <p>
            Or get in contact at:<br/>
            contact@beersandfooty.com
          </p>
        </a>
      </div>
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
      //  Get rotation from footy to cursor
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
.coming-soon {
  .text-container {
    width: 100%;
  }
  .contact-text {
    border: none;
    background-color: rgba(0,0,0,0.05);
    border-radius: 1em;
    padding: 1em;
    width: max-content;
    transition: all 0.1s;
    margin: auto;
    p {
      margin: 0;
      padding: 0.5em;
      text-decoration: none;
    }
    &:focus , &:hover{
      background-color: rgba(0,0,0,0.1);
    }
  }
  .footybeers-container {
    width: 10em;
    height: 10em;
  }
  .footybeers-container {
    display: block;
    margin: auto;
    .beer-image{
      height: 100%;
      width: auto;
      z-index: 100;
      background: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 50%);
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: rotate(180deg);
      }
    }
    .spin-container {
      position: relative;
      top: -90%;
      width: 80%;
      height: 80%;
      margin: auto;
      z-index: -1;
      .footy-image {
        width: 100%;
        height: auto;
        z-index: 0;
      }
    }
  }
}

</style>
