<template>
  <div>
    <div class="uk-card uk-card-default review" :class="reviewData.type">
      <div class="uk-card-body">
        <div v-if="!contentOnly" class="uk-card-title uk-text-bold">
          <div class="uk-card-title">{{ reviewData.title }}</div>
          <div class="icons uk-grid-small uk-child-width-auto" uk-grid>
            <div>
              <a :title="reviewData.type + ' review'">
                <img
                  v-if="reviewData.type === 'beer'"
                  data-src="@/assets/images/beer-icon.svg"
                  uk-svg
                />
                <img
                  v-if="reviewData.type === 'footy'"
                  data-src="@/assets/images/football-icon.svg"
                  uk-svg
                />
              </a>
            </div>
            <div>
              <nuxt-link
                :to="'/review/' + reviewData.id"
                :title="formattedPublishDate"
              >
                <span uk-icon="icon: calendar; ratio: 1.2;" />
              </nuxt-link>
            </div>
            <div v-if="reviewData.user_id">
              <nuxt-link
                :to="userReview ? '/account' : '/account/' + reviewData.user_id"
                :title="reviewData.author"
              >
                <span uk-icon="user" />
              </nuxt-link>
            </div>

            <div v-if="reviewData.status === 'hidden'">
              <a title="review hidden">
                <img data-src="@/assets/images/hide.svg" uk-svg />
              </a>
            </div>

            <div v-if="userCanEditReview">
              <button class="no-button" title="review options" type="button">
                <img uk-icon="icon: more-vertical;" />
              </button>
              <div
                uk-dropdown="animation: uk-animation-slide-top-small; duration: 200; mode: click; pos: bottom-justify;"
              >
                <ul class="uk-nav uk-dropdown-nav">
                  <li>
                    <a
                      class="uk-text-small"
                      title="Edit Review"
                      @click="editReviewModal"
                    >
                      <span uk-icon="icon: pencil;" />
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      class="uk-text-small"
                      title="Delete Review"
                      @click="deleteReview()"
                    >
                      <span uk-icon="icon: trash;" />
                      Delete
                    </a>
                  </li>
                  <li v-if="isAdmin">
                    <a
                      class="uk-text-small"
                      :title="
                        reviewData.status === 'published'
                          ? 'Hide Review'
                          : 'Show Review'
                      "
                      @click="toggleReviewStatus"
                    >
                      <img
                        v-if="reviewData.status === 'published'"
                        data-src="@/assets/images/hide.svg"
                        uk-svg
                      />
                      <img
                        v-else-if="reviewData.status === 'hidden'"
                        data-src="@/assets/images/eye.svg"
                        uk-svg
                      />
                      {{
                        reviewData.status === 'published'
                          ? 'Hide Review'
                          : 'Show Review'
                      }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr v-if="!contentOnly" />
        <div
          v-for="(block, idx) in reviewData.content_blocks"
          :key="idx"
          :class="block.type"
        >
          <p v-if="block.type === 'long_text'" class="block uk-text-left">
            {{ block.content }}
          </p>
          <p v-if="block.type === 'short_text'" class="block uk-text-center">
            {{ block.content }}
          </p>
          <p
            v-if="block.type === 'score'"
            class="block uk-text-bold uk-text-center"
          >
            {{ block.content }} / 100
          </p>
          <div
            v-if="block.type === 'image'"
            class="block uk-text-center uk-margin"
          >
            <div uk-lightbox="animation: slide;">
              <a class="uk-inline" :href="block.content">
                <img
                  src=""
                  :data-src="block.content"
                  :alt="block.title"
                  uk-img
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-card-footer uk-background-default uk-text-center">
        <button
          class="uk-button uk-button-default uk-button-small"
          :class="{
            'uk-button-primary': userVote && userVote.upvote === 1,
            'uk-disabled': !user || submitting
          }"
          title="Upvote Review"
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
          class="uk-button uk-button-default uk-button-small"
          title="Downvote Review"
          :class="{
            'uk-button-danger': userVote && userVote.upvote === 0,
            'uk-disabled': !user || submitting
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
    contentOnly: {
      type: Boolean,
      default: false
    },
    review: {
      type: Object,
      default: () => {
        return {
          id: 0,
          user_id: 0,
          author: '',
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
      submitting: false,
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
    userReview() {
      return this.user && this.reviewData.user_id === this.user.id
    },
    isAdmin() {
      return this.user && this.user.isAdmin
    },
    userCanEditReview() {
      return (this.userReview || this.isAdmin) && this.loggedIn
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
    },
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    }
  },
  watch: {
    review() {
      this.reviewData = this.review
    }
  },
  methods: {
    async voteAction(upvote, event) {
      if (!this.submitting) {
        this.submitting = true
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

          await this.$store.dispatch('getCurrentUser')
          this.reviewData = await this.$store.dispatch('getReview', {
            review_id
          })

          this.submitting = false
        }
      }
    },
    async toggleReviewStatus() {
      if (!this.submitting) {
        this.submitting = true
        let newStatus = ''
        if (this.reviewData.status === 'hidden') {
          newStatus = 'published'
        } else {
          newStatus = 'hidden'
        }
        try {
          await this.$store.dispatch('updateReview', {
            review_id: this.review.id,
            title: this.review.title,
            type: this.review.type,
            publish_date: this.review.publish_date,
            content_blocks: this.review.content_blocks,
            status: newStatus
          })
          this.submitting = false
          window.location.reload(true)
        } catch (e) {
          this.submitting = false
          return e
        }
      }
    },
    editReviewModal() {
      const modal = document.querySelector('#review-form-modal')
      if (this.reviewData && modal) {
        this.$store.dispatch('setEditReview', {
          review: this.reviewData
        })
        this.$uikit.modal(modal).show()
      }
    },
    deleteReview() {
      const reviewID = this.reviewData.id
      if (reviewID) {
        this.$store.dispatch('deleteReview', {
          id: reviewID
        })
        window.location.reload(true)
      }
    }
  }
}
</script>
