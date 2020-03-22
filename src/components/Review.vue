<template>
  <div class="review-container">
    <div class="content uk-container uk-margin-small uk-padding">
      <h2>{{ this.review.title }}</h2>
      <p>
        {{ this.review.body }}
      </p>
    </div>
  </div>
</template>

<script>
const yaml = require('js-yaml')

export default {
  name: 'Review',
  props: {
    reviewList: Array
  },
  methods: {
    reviewByIndex (index = 0) {
      // Get document, or throw exception on error
      try {
        let review = yaml.safeLoad(this.reviewList[index])
        console.log(review)
        return review
      } catch (e) {
        console.log(e)
        return false
      }
    }
  },
  computed: {
    review: function () {
      return this.reviewByIndex()
    }
  }
}
</script>

<style lang="scss" scoped>
  .review-container {
    height: auto;
    position: relative;
    z-index: 0;
    text-align: center;

    .content {
      background-color: white;
      height: auto;
    }
  }
</style>
