<template>
  <div class="review-container">
    <div class="content uk-margin-small uk-padding">
      <h2>
        {{ this.review.title }}
      </h2>
      <hr class="uk-divider-small"/>
      <p>
<!--        {{ this.review.body }}-->
      </p>
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
    getBody: function () {
      let contentList = this.review.contentBlocks
      return contentList
    }
  }
}
</script>

<style lang="scss" scoped>
  .review-container {
    z-index: 0;
    text-align: center;

    .content {
      background-color: white;
      height: auto;
    }
  }
</style>
