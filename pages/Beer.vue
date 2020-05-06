<template>
  <div>
    <!--  Header  -->
    <div class="header uk-flex uk-flex-center uk-flex-middle">
      <div class="header-content">
        <h1 class="uk-text-center">Beer</h1>
      </div>
    </div>
    <!--  Content Container  -->
    <section class="uk-section">
      <div class="uk-container">
        <!--  Masonry Grid  -->
        <div
          class="uk-child-width-1-2@s uk-child-width-1-3@m"
          uk-grid="masonry: true"
        >
          <review v-for="(obj, idx) in reviews" :key="idx" :review="obj" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Beer',
  components: {
    Review: () => import('@/components/Review')
  },
  data() {
    return {
      reviews: Array
    }
  },
  mounted() {
    this.fetchReviews()
  },
  methods: {
    fetchReviews() {
      this.$axios
        .get('http://127.0.0.1:8001/api/reviews/beer')
        .then((response) => {
          this.reviews = response.data.data
        })
    }
  }
}
</script>

<style src="assets/scss/pages/beer.scss" lang="scss"></style>
