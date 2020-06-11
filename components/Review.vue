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
          :class="{
            upvoted: userVote && userVote.upvote === 1,
            'uk-disabled': !user
          }"
          @click="voteAction(1)"
        >
          <span uk-icon="chevron-up"></span>
          {{ votes.upvotes }}
        </button>
        <button
          class="uk-button uk-button-small"
          :class="{
            downvoted: userVote && userVote.upvote === 0,
            'uk-disabled': !user
          }"
          @click="voteAction(0)"
        >
          <span uk-icon="chevron-down"></span>
          {{ votes.downvotes }}
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
  data() {
    return {
      votes: {
        downvotes: 0,
        upvotes: 0
      }
    }
  },
  mounted() {
    this.votes = this.review.votes
  },
  computed: {
    formattedPublishDate() {
      return new Date(
        parseInt(this.review.publish_date) * 1000
      ).toLocaleString()
    },
    user() {
      return this.$store.state.user
    },
    userVotes() {
      return this.$store.state.userVotes
    },
    userVote() {
      let vote = null
      const id = this.review.id
      if (this.user) {
        vote = this.userVotes.filter(function(e) {
          if (e.review_id === id) {
            return e
          }
        })
      }
      return vote ? vote.shift() : null
    }
  },
  methods: {
    async voteAction(upvote) {
      if (this.userVote && this.userVote.upvote === upvote) {
        upvote ? this.votes.upvotes-- : this.votes.downvotes--
        await this.$store.dispatch('deleteVote', {
          voteID: this.userVote.id
        })
      } else {
        upvote ? this.votes.upvotes++ : this.votes.downvotes++
        if (this.userVote) {
          upvote ? this.votes.downvotes-- : this.votes.upvotes--
        }
        await this.$store.dispatch('createVote', {
          review_id: this.review.id,
          upvote
        })
      }
    }
  }
}
</script>
