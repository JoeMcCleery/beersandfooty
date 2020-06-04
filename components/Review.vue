<template>
  <div>
    <div class="uk-card uk-card-default uk-card-body" :class="review.type">
      <h3 class="uk-card-title">
        {{ review.title }}<br />
        <span class="uk-text-small uk-text-muted">
          {{ formattedPublishDate }}
        </span>
      </h3>
      <hr />
      <div
        v-for="(block, idx) in review.content_blocks"
        :key="idx"
        :class="block.type"
      >
        <p v-if="block.type === 'long_text'">
          {{ block.content }}
        </p>
      </div>
      <div>
        <button class="uk-button uk-button-primary uk-button-small">
          <span uk-icon="chevron-up"></span>
          {{ review.votes.upvotes }}
        </button>
        <button class="uk-button uk-button-danger uk-button-small">
          <span uk-icon="chevron-down"></span>
          {{ review.votes.downvotes }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: {
    review: {
      type: Object,
      default: null
    }
  },
  computed: {
    formattedPublishDate: (e) => {
      const date = new Date(parseInt(e.review.publish_date) * 1000)
      return date.toLocaleString()
    }
  }
}
</script>
