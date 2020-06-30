<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
        <h1 class="uk-text-center">
          <span v-if="review">{{ review.title }}</span>
        </h1>
      </div>
      <!--  Page Content Container  -->
      <div class="uk-padding-small">
        <review v-if="review" :review="review" :no-title="true" />
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
