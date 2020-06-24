<template>
  <div>
    <div class="content">
      <svg-background />
      <!--  Page Content Container  -->
      <section v-if="review" class="uk-section">
        <div class="uk-container">
          <review :review="review" />
        </div>
      </section>
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
    Review: () => import('@/components/Review'),
    SvgBackground: () => import('~/components/SvgBackground.vue')
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
  }
}
</script>
