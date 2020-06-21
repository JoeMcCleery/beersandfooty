<template>
  <div>
    <div class="content">
      <svg-background />
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
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
          <form
            class="uk-text-center"
            @submit.prevent="fetchReviews(currentPageLink)"
          >
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
              >
                <option value="publish_date">Publish Date</option>
                <option value="score">Score</option>
              </select>
            </div>
            <div class="uk-margin-small">
              <button
                class="uk-button uk-button-primary uk-form-small"
                type="submit"
                name="fetch"
                value="true"
              >
                Update Filter
              </button>
            </div>
          </form>
          <!--  Pagination  -->
          <div v-if="showReviews" class="uk-margin-top" uk-grid>
            <div>
              <a
                v-scroll-to="'#reviews'"
                :class="{ 'uk-invisible': previousPageLink === null }"
                class="uk-button uk-button-default"
                @click="fetchReviews(previousPageLink)"
              >
                <span uk-icon="chevron-left"></span>
                Prev
              </a>
            </div>
            <div class="uk-text-center uk-text-large uk-width-expand">
              <animated-number
                :number="currentPageNum"
                class="uk-button uk-disabled uk-button-default uk-button-small"
              />
            </div>
            <div>
              <a
                v-scroll-to="'#reviews'"
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
            v-if="showReviews"
            class="uk-child-width-1-2@m uk-child-width-1-3@l"
            uk-grid="masonry: true"
          >
            <review
              v-for="r in reviews.data"
              :id="encodeURI(r.title)"
              :key="encodeURI(r.title + r.id)"
              :review="r"
            />
          </div>
          <!--  Pagination  -->
          <div v-if="showReviews" uk-grid>
            <div>
              <a
                v-scroll-to="'#reviews'"
                :class="{ 'uk-invisible': previousPageLink === null }"
                class="uk-button uk-button-default"
                @click="fetchReviews(previousPageLink)"
              >
                <span uk-icon="chevron-left"></span>
                Prev
              </a>
            </div>
            <div class="uk-text-center uk-text-large uk-width-expand">
              <animated-number
                :number="currentPageNum"
                class="uk-button uk-disabled uk-button-default uk-button-small"
              />
            </div>
            <div>
              <a
                v-scroll-to="'#reviews'"
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
  name: 'Home',
  components: {
    SvgBackground: () => import('~/components/SvgBackground.vue'),
    Review: () => import('~/components/Review.vue'),
    AnimatedNumber: () => import('~/components/AnimatedNumber.vue')
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
    fetchReviews(url) {
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
            this.reviews = r
          } else {
            this.reviews = []
          }
        })
    }
  }
}
</script>
