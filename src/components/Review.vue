<template>
  <div class="review-container uk-container uk-margin-bottom">
    <div class="content uk-margin-small uk-padding uk-box-shadow-medium">
      <h2>
        {{ this.review.title }}
      </h2>
      <hr class="uk-divider-small"/>
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
