<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div v-if="reviewData" class="header review" :class="reviewData.type">
        <h1>{{ review.title }}</h1>
        <hr />
        <p>{{ formattedPublishDate }}</p>
        <div class="icons uk-grid-small uk-child-width-auto" uk-grid>
          <div>
            <a style="cursor: default" :title="reviewData.type + ' review'">
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
      <!--  Page Content Container  -->
      <div class="uk-padding-small">
        <review v-if="review" :review="review" :content-only="true" />
        <div v-else>
          <div class="uk-text-center uk-light">
            <div uk-spinner="ratio: 0.5;"></div>
            loading review
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  components: {
    Review: () => import('@/components/Review')
  },
  transition: 'page',
  data() {
    return {
      id: this.$route.params.id,
      reviewData: null
    }
  },
  computed: {
    review() {
      return this.reviewData
    },
    formattedPublishDate() {
      return new Date(
        parseInt(this.reviewData.publish_date) * 1000
      ).toLocaleString()
    },
    user() {
      return this.$store.state.user
    },
    userReview() {
      return this.user && this.review.user_id === this.user.id
    },
    isAdmin() {
      return this.user && this.user.isAdmin
    },
    userCanEditReview() {
      return (this.userReview || this.isAdmin) && this.loggedIn
    },
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    }
  },
  async mounted() {
    if (this.id) {
      const result = await this.$store.dispatch('getReview', {
        review_id: this.id
      })
      if (result) {
        this.reviewData = result
      }
    }
  },
  methods: {
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
  },
  head() {
    return {
      title: this.review
        ? process.env.SITE_TITLE + ' - ' + this.review.title
        : process.env.SITE_TITLE
    }
  }
}
</script>
