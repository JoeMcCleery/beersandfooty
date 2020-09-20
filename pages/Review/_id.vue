<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div v-if="reviewData" class="header review" :class="reviewData.type">
        <h1>{{ reviewData.title }}</h1>
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
        <review v-if="reviewData" :review="reviewData" :content-only="true" />
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
  async fetch() {
    if (this.id) {
      const result = await this.$store.dispatch('getReview', {
        review_id: this.id
      })
      if (result) {
        this.reviewData = result
      }
    }
  },
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
      return this.user && this.reviewData.user_id === this.user.id
    },
    isAdmin() {
      return this.user && this.user.isAdmin
    },
    userCanEditReview() {
      return (this.userReview || this.isAdmin) && this.loggedIn
    },
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    },
    ogImage() {
      if (this.reviewData) {
        switch (this.reviewData.type) {
          case 'beer':
            return '/beer-og.png'
          case 'footy':
            return '/footy-og.png'
          default:
            return '/favicon.ico'
        }
      }
      return '@/static/favicon.ico'
    },
    ogDescription() {
      let description =
        'Beer related footy reviews and footy related beer reviews'
      if (this.reviewData) {
        if (this.reviewData.content_blocks.length) {
          const firstTextBlock = this.reviewData.content_blocks.filter(
            (block) => {
              return block.type === 'long_text' || block.type === 'short_text'
            }
          )[0]
          if (firstTextBlock) {
            const append = firstTextBlock.content.length > 100 ? '...' : ''
            description = firstTextBlock.content.slice(0, 100) + append
          }
        }
      }
      return description
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
            review_id: this.reviewData.id,
            title: this.reviewData.title,
            type: this.reviewData.type,
            publish_date: this.reviewData.publish_date,
            content_blocks: this.reviewData.content_blocks,
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
        this.$router.push('/')
      }
    }
  },
  head() {
    return {
      title: this.reviewData
        ? process.env.SITE_TITLE + ' - ' + this.reviewData.title
        : process.env.SITE_TITLE,
      meta: [
        {
          hid: 'author',
          name: 'author',
          content: this.reviewData ? this.reviewData.author : ''
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.ogDescription
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.baseUrl + '/review/' + this.id
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.reviewData
            ? this.reviewData.title
            : process.env.SITE_TITLE
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.ogImage
        }
      ]
    }
  }
}
</script>
