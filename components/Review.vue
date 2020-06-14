<template>
  <div>
    <div class="uk-card uk-card-default" :class="reviewData.type">
      <div class="uk-card-body uk-background-default">
        <h3 class="uk-card-title">
          {{ reviewData.title }}<br />
          <span class="uk-text-small uk-text-muted">
            {{ formattedPublishDate }}
          </span>
        </h3>
        <hr />
        <div
          v-for="(block, idx) in reviewData.content_blocks"
          :key="idx"
          :class="block.type"
        >
          <p v-if="block.type === 'long_text'">
            {{ block.content }}
          </p>
        </div>
      </div>
      <div class="uk-card-footer uk-background-muted uk-text-center">
        <button
          class="uk-button uk-float-left"
          :class="{
            upvoted: userVote && userVote.upvote === 1,
            'uk-disabled': !user
          }"
          @click="voteAction(1, $event)"
        >
          <span uk-icon="chevron-up"></span>
          <span class="uk-text-small">
            <animated-number :number="votes.upvotes" class="uk-inline" />
          </span>
        </button>
        <button class="uk-button uk-button-small uk-disabled">
          <animated-number :number="totalScore" />
        </button>
        <button
          class="uk-button uk-float-right"
          :class="{
            downvoted: userVote && userVote.upvote === 0,
            'uk-disabled': !user
          }"
          @click="voteAction(0, $event)"
        >
          <span uk-icon="chevron-down"></span>
          <span class="uk-text-small">
            <animated-number :number="votes.downvotes" class="uk-inline" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  components: {
    AnimatedNumber: () => import('~/components/AnimatedNumber.vue')
  },
  props: {
    review: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      reviewData: this.review
    }
  },
  computed: {
    votes() {
      return this.reviewData.votes
    },
    formattedPublishDate() {
      return new Date(
        parseInt(this.reviewData.publish_date) * 1000
      ).toLocaleString()
    },
    totalScore() {
      return this.votes.upvotes - this.votes.downvotes
    },
    user() {
      return this.$store.state.user
    },
    userVotes() {
      return this.$store.state.userVotes
    },
    userVote() {
      let vote = null
      const id = this.reviewData.id
      if (this.userVotes) {
        vote = this.userVotes.filter(function(e) {
          if (e.review_id === id) {
            return e
          }
        })
      }
      return vote ? vote.shift() : null
    },
    isAccountPage() {
      return this.$nuxt.$route.name === 'Account'
    }
  },
  watch: {
    review() {
      this.reviewData = this.review
    }
  },
  methods: {
    async voteAction(upvote, event) {
      console.log(this.isAccountPage)
      event.target.classList.add('uk-disabled')
      if (this.userVote && this.userVote.upvote === upvote) {
        if (!this.isAccountPage) {
          upvote ? this.votes.upvotes-- : this.votes.downvotes--
        }
        await this.$store.dispatch('deleteVote', {
          voteID: this.userVote.id
        })
        await this.$store.dispatch('getUser', {})
      } else {
        if (!this.isAccountPage) {
          upvote ? this.votes.upvotes++ : this.votes.downvotes++
          if (this.userVote) {
            upvote ? this.votes.downvotes-- : this.votes.upvotes--
          }
        }
        await this.$store.dispatch('createVote', {
          review_id: this.reviewData.id,
          upvote
        })
        await this.$store.dispatch('getUser', {})
      }
      event.target.classList.remove('uk-disabled')
    }
  }
}
</script>
