<template>
  <div class="review-container">
    <div class="content uk-margin-small uk-padding">
      <h2>
        {{ this.review.title }}
      </h2>
      <hr class="uk-divider-small"/>
      <p>
        {{ this.getShortText() }}
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
    getContentBlocks: function () {
      return this.contentBlocks
    },
    getShortText: function () {
      let body = ''
      this.getContentBlocks().forEach((block) => {
        if (block.type === 'shortText') {
          body += block.value + ' '
        }
      })
      return body
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
