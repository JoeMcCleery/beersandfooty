<template>
  <div class="review-container">
    <div class="content uk-margin uk-padding uk-box-shadow-small">
      <h2>
        {{ this.review.title }}
      </h2>
      <hr class="uk-divider-small"/>
      <div v-for="(block, idx) in this.contentBlocks()" :key="idx" :class="block.type">
        <div v-if="block.type === 'shortText'">{{ block.value }}</div>
        <div v-if="block.type === 'longText'">{{ block.value }}</div>
        <div v-if="block.type === 'dateTime'">{{ block.value }}</div>
        <img v-if="block.type === 'image'" :data-src="block.value" uk-img/>
        <div v-if="block.type === 'score'" class="uk-padding">{{ block.value }}/10</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    review: Object
  },
  methods: {
    contentBlocks: function () {
      return this.review.contentBlocks
    }
  }
}
</script>

<style lang="scss" scoped>
  .beer-review .content {
    hr:after {
      border-color: $beerscolour;
    }
  }
  .footy-review .content {
    hr:after {
      border-color: $footycolour;
    }
  }

  .review-container {
    z-index: 0;

    h2 {
      text-align: center;
    }

    hr {
      text-align: center;
    }

    .content {
      background-color: white;
      height: auto;
      text-align: left;
      border-radius: $border-radius;
    }

    // Content Blocks
    .image {
      text-align: center;
      img {
        max-height: 400px;
      }
      + .shortText, + .longText, + .dateTime, + .image {
        margin-top: 1em;
      }
    }

    .longText, .shortText, .dateTime, .image {
      + .image {
        margin-top: 1em;
      }
    }

    .score {
      font-weight: bold;
      font-size: 1.5em;
      text-align: center;
    }

    .shortText {
      text-align: center;
    }

  }
</style>
