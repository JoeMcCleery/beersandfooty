<template>
  <div>
    <div class="content">
      <svg-background />
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle uk-padding">
        <div class="header-content">
          <h1>
            Beers and Footy
          </h1>
          <div class="uk-position-bottom-center uk-margin-bottom">
            <a v-scroll-to="'#reviews'" href="#"
              ><span uk-icon="icon: chevron-down; ratio: 4;"
            /></a>
          </div>
        </div>
      </div>
      <!--  Content  -->
      <section id="reviews" class="uk-section">
        <div class="uk-container uk-container-large">
          <!-- Filter -->
          <ul uk-accordion>
            <li>
              <a class="uk-accordion-title uk-text-small" href="#">
                Filter Settings
                <span uk-icon="icon: settings; ratio: 0.7;" />
                <span uk-icon="icon: chevron-down;" />
              </a>
              <div class="uk-accordion-content">
                <form>
                  <div class="uk-margin-small">
                    <div class="uk-input uk-form-small uk-width-auto">
                      <label for="beerFilter">
                        <input
                          id="beerFilter"
                          v-model="filter.type"
                          name="beerFilter"
                          type="checkbox"
                          class="uk-checkbox"
                          value="beer"
                          @change="fetchReviews(currentPageLink)"
                        />
                        Beer
                      </label>
                      <label for="footyFilter">
                        <input
                          id="footyFilter"
                          v-model="filter.type"
                          name="footyFilter"
                          type="checkbox"
                          class="uk-checkbox"
                          value="footy"
                          @change="fetchReviews(currentPageLink)"
                        />
                        Footy
                      </label>
                    </div>
                  </div>
                  <div class="uk-margin-small">
                    <select
                      id="sortField"
                      v-model="filter.order.field"
                      name="sortField"
                      class="uk-select uk-form-width-small uk-form-small"
                      @change="fetchReviews(currentPageLink)"
                    >
                      <option value="publish_date">Publish Date</option>
                      <option value="score">Score</option>
                    </select>
                  </div>
                </form>
              </div>
            </li>
          </ul>
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
          <!--  Pagination  -->
          <div class="uk-text-center uk-margin">
            <div>
              <a
                v-if="showReviews"
                :class="{ 'uk-invisible': nextPageLink === null }"
                class="uk-button uk-button-primary"
                @click="loadMoreReviews(nextPageLink)"
              >
                <span uk-icon="icon: refresh;" />
                Load more
              </a>
              <span v-else class="uk-light">
                No more to load...
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
    SvgBackground: () => import('~/components/SvgBackground.vue'),
    Review: () => import('~/components/Review.vue')
  },
  data() {
    return {
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
    showReviews() {
      return !!this.reviews.data
    },
    currentPageLink() {
      if (this.showReviews) {
        const meta = this.reviews.meta
        return meta ? meta.path : null
      }
      return (
        process.env.API_URL +
        '/api/' +
        this.$store.state.api_version +
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
    fetchReviews(url, addData = false) {
      if (url.includes('?page')) {
        url += '&filter=' + JSON.stringify(this.filter)
      } else {
        url += '?filter=' + JSON.stringify(this.filter)
      }
      return this.$axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.clientAccessToken
          }
        })
        .then((response) => {
          const r = response.data
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
