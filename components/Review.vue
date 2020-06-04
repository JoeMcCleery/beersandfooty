<template>
  <div>
    <div class="uk-card uk-card-default" :class="review.type">
      <div class="uk-card-body uk-background-default">
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
      </div>
      <div class="uk-card-footer uk-background-muted">
        <button
          class="uk-button uk-button-small"
          :class="{ upvoted: userVote && userVote.upvote === 1 }"
        >
          <span uk-icon="chevron-up"></span>
          {{ upvotes }}
        </button>
        <button
          class="uk-button uk-button-small"
          :class="{ downvoted: userVote && userVote.upvote === 0 }"
        >
          <span uk-icon="chevron-down"></span>
          {{ downvotes }}
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
    },
    userVote() {
      const user = this.$store.state.user
      const id = this.review.id
      let vote = null
      if (user) {
        vote = user.votes.filter(function(e) {
          if (e.review_id === id) {
            return e
          }
        })
      }
      return vote ? vote.shift() : null
    },
    upvotes() {
      return this.review.votes.upvotes
    },
    downvotes() {
      return this.review.votes.downvotes
    }
  }
}
</script>
