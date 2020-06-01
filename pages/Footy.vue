<template>
  <div>
    <!--  Header  -->
    <div class="header uk-flex uk-flex-center uk-flex-middle">
      <div class="header-content">
        <h1 class="uk-text-center uk-animation-fade">Footy Reviews</h1>
        <div class="uk-position-bottom-center uk-margin-bottom">
          <a
            v-if="showReviews"
            v-scroll-to="'#section-reviews'"
            href="#"
            class="uk-link-text uk-animation-fade"
            ><span uk-icon="icon: chevron-down; ratio: 4;"
          /></a>
        </div>
      </div>
    </div>
    <!--  Content  -->
    <section v-if="showReviews" id="section-reviews" class="uk-section">
      <div class="uk-container">
        <!--  Pagination  -->
        <div class="uk-child-width-1-3" uk-grid>
          <div class="uk-text-left">
            <a
              :class="{ 'uk-hidden': previousPageLink === null }"
              class="uk-button uk-button-default"
              @click="fetchReviews(previousPageLink)"
            >
              Prev
            </a>
          </div>
          <div class="uk-text-center uk-text-large">
            {{ currentPageNum }} / {{ lastPageNum }}
          </div>
          <div class="uk-text-right">
            <a
              :class="{ 'uk-hidden': nextPageLink === null }"
              class="uk-button uk-button-default"
              @click="fetchReviews(nextPageLink)"
            >
              Next
            </a>
          </div>
        </div>
        <!--  Masonry Grid  -->
        <div
          class="uk-child-width-1-2@s uk-child-width-1-3@m"
          uk-grid="masonry: true"
        >
          <review v-for="(obj, idx) in reviews.data" :key="idx" :review="obj" />
        </div>
        <!--  Pagination  -->
        <div class="uk-child-width-1-3" uk-grid>
          <div class="uk-text-left">
            <a
              :class="{ 'uk-hidden': previousPageLink === null }"
              class="uk-button uk-button-default"
              @click="fetchReviews(previousPageLink)"
            >
              Prev
            </a>
          </div>
          <div class="uk-text-center uk-text-large">
            {{ currentPageNum }} / {{ lastPageNum }}
          </div>
          <div class="uk-text-right">
            <a
              :class="{ 'uk-hidden': nextPageLink === null }"
              class="uk-button uk-button-default"
              @click="fetchReviews(nextPageLink)"
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Footy',
  components: {
    Review: () => import('@/components/Review')
  },
  async fetch() {
    await this.fetchReviews(process.env.API_URL + '/api/v1/reviews/footy')
  },
  data() {
    return {
      reviews: {
        type: Array,
        default: false
      }
    }
  },
  computed: {
    showReviews() {
      return this.reviews.data
    },
    nextPageLink() {
      if (this.showReviews) {
        const links = this.reviews.links
        return links ? links.next : null
      }
      return null
    },
    previousPageLink() {
      if (this.showReviews) {
        const links = this.reviews.links
        return links ? links.prev : null
      }
      return null
    },
    currentPageNum() {
      if (this.showReviews) {
        const meta = this.reviews.meta
        return meta ? meta.current_page : null
      }
      return null
    },
    lastPageNum() {
      if (this.showReviews) {
        const meta = this.reviews.meta
        return meta ? meta.last_page : null
      }
      return null
    }
  },
  methods: {
    fetchReviews(url) {
      return this.$axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.accessToken
          }
        })
        .then((response) => {
          const r = response.data
          if (r.data.length) {
            this.reviews = r
          }
        })
    }
  }
}
</script>

<style src="assets/scss/pages/footy.scss" lang="scss"></style>
