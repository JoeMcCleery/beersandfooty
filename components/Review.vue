<template>
  <div>
    <div class="uk-card uk-card-default review" :class="reviewData.type">
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
          uk-scrollspy="target: > .block; cls: uk-animation-slide-top-small uk-animation-fast; delay: 250"
        >
          <p v-if="block.type === 'long_text'" class="block uk-text-left">
            {{ block.content }}
          </p>
          <p v-if="block.type === 'short_text'" class="block uk-text-center">
            {{ block.content }}
          </p>
          <p
            v-if="block.type === 'score'"
            class="block uk-text-large uk-text-center"
          >
            {{ block.content }} / 100
          </p>
        </div>
      </div>
      <div class="uk-card-footer uk-text-center">
        <button
          class="uk-button uk-button-default uk-button-small uk-float-left"
          :class="{
            upvoted: userVote && userVote.upvote === 1,
            'uk-disabled': !user
          }"
          @click="voteAction(1, $event)"
        >
          <span uk-icon="chevron-up"></span>
          <span class="uk-text-small">
            <animated-number
              :number="reviewData.votes.upvotes"
              class="uk-inline"
            />
          </span>
        </button>
        <button
          class="uk-button uk-button-default uk-button-small total uk-disabled"
        >
          <animated-number :number="score" />
        </button>
        <button
          class="uk-button uk-button-default uk-button-small uk-float-right"
          :class="{
            downvoted: userVote && userVote.upvote === 0,
            'uk-disabled': !user
          }"
          @click="voteAction(0, $event)"
        >
          <span uk-icon="chevron-down"></span>
          <span class="uk-text-small">
            <animated-number
              :number="reviewData.votes.downvotes"
              class="uk-inline"
            />
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
      default: () => {
        return {
          id: 0,
          score: 0,
          title: '',
          type: 'beer',
          publish_date: 0,
          content_blocks: [
            {
              sort: 0,
              type: '',
              content: ''
            }
          ],
          votes: [
            {
              downvotes: 0,
              upvotes: 0
            }
          ],
          created_at: 0,
          updated_at: 0,
          deleted_at: 0
        }
      }
    }
  },
  data() {
    return {
      reviewData: this.review
    }
  },
  computed: {
    formattedPublishDate() {
      return new Date(
        parseInt(this.reviewData.publish_date) * 1000
      ).toLocaleString()
    },
    score() {
      return this.reviewData.score || 0
    },
    user() {
      return this.$store.state.user
    },
    userVotes() {
      return this.$store.state.userVotes
    },
    userVote() {
      let vote
      const id = this.reviewData.id
      if (this.userVotes) {
        vote = this.userVotes.filter(function(e) {
          if (e.review_id === id) {
            return e
          }
        })
      }
      return vote ? vote.shift() : null
    }
  },
  watch: {
    review() {
      this.reviewData = this.review
    }
  },
  methods: {
    async voteAction(upvote, event) {
      // eslint-disable-next-line camelcase
      const review_id = this.reviewData.id
      // eslint-disable-next-line camelcase
      if (review_id) {
        event.target.classList.add('uk-disabled')

        if (this.userVote && this.userVote.upvote === upvote) {
          await this.$store.dispatch('deleteVote', {
            voteID: this.userVote.id
          })
        } else {
          await this.$store.dispatch('createVote', {
            review_id,
            upvote
          })
        }

        await this.$store.dispatch('getUser')
        this.reviewData = await this.$store.dispatch('getReview', {
          review_id
        })

        event.target.classList.remove('uk-disabled')
      }
    }
  }
}
</script>
