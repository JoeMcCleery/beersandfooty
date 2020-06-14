<template>
  <div>
    <div class="content">
      <svg-background />
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
        <div class="header-content">
          <h1 class="uk-text-center">Footy Reviews</h1>
          <div class="uk-position-bottom-center uk-margin-bottom">
            <a
              v-if="showReviews"
              v-scroll-to="'#section-reviews'"
              href="#"
              class="uk-link-text"
              ><span uk-icon="icon: chevron-down; ratio: 4;"
            /></a>
          </div>
        </div>
      </div>
      <!--  Content  -->
      <section v-if="showReviews" id="section-reviews" class="uk-section">
        <div class="uk-container uk-container-large">
          <!--  Pagination  -->
          <div uk-grid>
            <div>
              <a
                :class="{ 'uk-invisible': previousPageLink === null }"
                class="uk-button uk-button-default"
                @click="fetchReviews(previousPageLink)"
              >
                <span uk-icon="chevron-left"></span>
                Prev
              </a>
            </div>
            <div class="uk-text-center uk-text-large uk-width-expand">
              <animated-number :number="currentPageNum" />
            </div>
            <div>
              <a
                :class="{ 'uk-invisible': nextPageLink === null }"
                class="uk-button uk-button-default"
                @click="fetchReviews(nextPageLink)"
              >
                Next
                <span uk-icon="chevron-right"></span>
              </a>
            </div>
          </div>
          <!--  Masonry Grid  -->
          <div
            class="uk-child-width-1-2@m uk-child-width-1-3@l"
            uk-grid="masonry: true"
          >
            <review
              v-for="r in reviews.data"
              :key="r.title + r.id"
              :review="r"
            />
          </div>
          <!--  Pagination  -->
          <div uk-grid>
            <div>
              <a
                :class="{ 'uk-invisible': previousPageLink === null }"
                class="uk-button uk-button-default"
                @click="fetchReviews(previousPageLink)"
              >
                <span uk-icon="chevron-left"></span>
                Prev
              </a>
            </div>
            <div class="uk-text-center uk-text-large uk-width-expand">
              <animated-number :number="currentPageNum" />
            </div>
            <div>
              <a
                :class="{ 'uk-invisible': nextPageLink === null }"
                class="uk-button uk-button-default"
                @click="fetchReviews(nextPageLink)"
              >
                Next
                <span uk-icon="chevron-right"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footy',
  components: {
    Review: () => import('@/components/Review'),
    SvgBackground: () => import('~/components/SvgBackground.vue'),
    AnimatedNumber: () => import('~/components/AnimatedNumber.vue')
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
    }
  },
  mounted() {
    this.fetchReviews(
      process.env.API_URL +
        '/api/' +
        this.$store.state.api_version +
        '/footy-reviews'
    )
  },
  methods: {
    fetchReviews(url) {
      return this.$axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.clientAccessToken
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
