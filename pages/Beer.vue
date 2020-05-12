<template>
  <div>
    <!--  Header  -->
    <div class="header uk-flex uk-flex-center uk-flex-middle">
      <div class="header-content">
        <h1 class="uk-text-center uk-animation-fade">Beer Reviews</h1>
        <div class="uk-position-bottom-center uk-margin-bottom">
          <a
            v-if="showReviews"
            href="#"
            v-scroll-to="'#section-reviews'"
            class="uk-link-text uk-animation-fade"
            ><span uk-icon="icon: chevron-down; ratio: 4;"
          /></a>
        </div>
      </div>
    </div>
    <!--  Content  -->
    <section v-if="showReviews" id="section-reviews" class="uk-section">
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
      reviews: Array,
      hasReviews: {
        type: Boolean,
        default: false
      }
    }
  },
  computed: {
    showReviews() {
      return this.hasReviews
    }
  },
  mounted() {
    this.fetchReviews()
  },
  methods: {
    fetchReviews() {
      console.log('fetching reviews...')
      this.$axios
        .get('http://127.0.0.1:8001/api/reviews/beer')
        .then((response) => {
          const temp = response.data.data
          if (temp.length) {
            console.log('succeeded fetching reviews!', temp.length)
            this.hasReviews = true
            this.reviews = temp
          } else {
            console.log('failed fetching reviews. retrying in a second...')
            this.hasReviews = false
            setTimeout(this.fetchReviews, 1000)
          }
        })
    }
  }
}
</script>

<style src="assets/scss/pages/beer.scss" lang="scss"></style>
