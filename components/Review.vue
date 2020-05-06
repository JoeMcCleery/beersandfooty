<template>
  <div>
    <div class="uk-card uk-card-default uk-card-body">
      <h3 class="uk-card-title">{{ review.title }}</h3>
      <div
        v-for="(block, idx) in review.content_blocks"
        :key="idx"
        :class="block.type"
      >
        {{ block.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    review: {
      Type: Array,
      default: null
    }
  }
}
</script>
