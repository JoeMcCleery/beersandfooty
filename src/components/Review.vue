<template>
  <div class="review-container">
    <div class="content uk-container uk-margin-small uk-padding">
      <h2>
        {{ this.review.title }}
      </h2>
      <p>
        {{ this.review.body }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    review: Object
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
