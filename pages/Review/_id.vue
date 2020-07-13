<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div v-if="reviewData" class="header review" :class="reviewData.type">
        <h1 class="uk-text-large">{{ review.title }}</h1>
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
        </div>
      </div>
      <!--  Page Content Container  -->
      <div class="uk-padding-small">
        <review v-if="review" :review="review" :content-only="true" />
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
  head() {
    return {
      title: this.review
        ? process.env.SITE_TITLE + ' - ' + this.review.title
        : process.env.SITE_TITLE
    }
  }
}
</script>
