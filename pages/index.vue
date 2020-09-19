<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
        <h1 class="uk-text-center">Beers and Footy</h1>
      </div>
      <!--  Content  -->
      <section v-if="clientAuth" id="reviews" class="uk-section">
        <div class="uk-container uk-container-large">
          <!-- Filter -->
          <div
            class="uk-width-1-1 uk-flex-column uk-flex uk-flex-center uk-flex-middle uk-margin"
          >
            <a
              class="filter-toggle uk-link-text uk-margin-small"
              uk-toggle="target: #filter-toggle-target; animation: uk-animation-fade"
              >Filter</a
            >
            <div
              id="filter-toggle-target"
              class="homepage-filter uk-card uk-background-default uk-card-body"
              hidden
            >
              <form>
                <label for="beerFilter" class="uk-inline">
                  <input
                    id="beerFilter"
                    v-model="filter.type"
                    name="beerFilter"
                    type="checkbox"
                    class="uk-hidden"
                    value="beer"
                    @change="fetchReviews(currentPageLink)"
                  />
                  <a class="icon-container" title="show/hide beer reviews">
                    <img
                      class="icon-beer"
                      data-src="@/assets/images/beer-icon.svg"
                      uk-svg
                    />
                  </a>
                </label>
                <label
                  for="footyFilter"
                  class="uk-inline uk-margin-small-right"
                >
                  <input
                    id="footyFilter"
                    v-model="filter.type"
                    name="footyFilter"
                    type="checkbox"
                    class="uk-hidden"
                    value="footy"
                    @change="fetchReviews(currentPageLink)"
                  />
                  <a class="icon-container" title="show/hide footy reviews">
                    <img
                      class="icon-footy"
                      data-src="@/assets/images/football-icon.svg"
                      uk-svg
                    />
                  </a>
                </label>
                <select
                  id="sortField"
                  v-model="filter.order.field"
                  name="sortField"
                  class="uk-select uk-inline uk-width-auto uk-text-center"
                  @change="fetchReviews(currentPageLink)"
                >
                  <option value="publish_date">Publish Date</option>
                  <option value="score">Score</option>
                </select>
              </form>
            </div>
          </div>

          <!--  Masonry Grid  -->
          <div
            v-if="showReviews"
            class="uk-child-width-1-2@m uk-child-width-1-3@l"
            uk-grid="masonry: true"
          >
            <review
              v-for="(r, idx) in reviews.data"
              :id="encodeURI(r.title)"
              :key="encodeURI(idx + '-' + r.id + '-' + r.publish_date)"
              :review="r"
            />
          </div>
          <!--  Pagination / Response Info  -->
          <div class="uk-text-center uk-margin">
            <div>
              <a
                v-if="showReviews"
                :class="{ 'uk-invisible': nextPageLink === null }"
                class="uk-button uk-button-primary"
                @click="loadMoreReviews(nextPageLink)"
              >
                <span v-if="!submitting" uk-icon="icon: refresh;" />
                <div v-else uk-spinner="ratio: 0.5;"></div>
                Load more
              </a>
              <span v-else-if="showReviews && !nextPageLink" class="uk-light">
                No more reviews to load.
              </span>
              <span v-else-if="filter.type.length" class="uk-light">
                <div uk-spinner="ratio: 0.5;"></div>
                Loading reviews
              </span>
              <span v-else class="uk-light">
                Select a review type in the filter settings above.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Review: () => import('~/components/Review.vue')
  },
  transition(to, from) {
    if (from && (from.name === 'Account-id' || from.name === 'Review-id')) {
      return 'page'
    }
    if (to.name === 'index') {
      return 'slide-right'
    }
    return 'slide-left'
  },
  data() {
    return {
      submitting: false,
      reviews: {
        type: Array,
        default: false
      },
      filter: {
        limit: 6,
        type: ['beer', 'footy'],
        order: {
          field: 'publish_date',
          direction: 'desc'
        }
      }
    }
  },
  computed: {
    clientAuth() {
      return !!this.$store.state.clientAccessToken
    },
    showReviews() {
      return !!this.reviews.data
    },
    currentPageLink() {
      if (this.showReviews) {
        const meta = this.reviews.meta
        return meta ? meta.path : null
      }
      return (
        this.$store.state.apiUrl +
        '/api/' +
        this.$store.state.apiVersion +
        '/reviews'
      )
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
      return 0
    }
  },
  mounted() {
    this.fetchReviews(this.currentPageLink)
  },
  methods: {
    loadMoreReviews(url) {
      this.fetchReviews(url, true)
    },
    async fetchReviews(url, addData = false) {
      this.submitting = true
      if (url.includes('?page')) {
        url += '&filter=' + JSON.stringify(this.filter)
      } else {
        url += '?filter=' + JSON.stringify(this.filter)
      }
      await this.$axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.clientAccessToken
          }
        })
        .then((response) => {
          const r = response.data
          this.submitting = false
          if (r.data.length) {
            if (addData) {
              this.reviews.data.push(...r.data)
              this.reviews.meta = r.meta
              this.reviews.links = r.links
            } else {
              this.reviews = r
            }
          } else if (addData) {
            return this.reviews.data.concat([])
          } else {
            this.reviews = []
          }
        })
    }
  }
}
</script>
