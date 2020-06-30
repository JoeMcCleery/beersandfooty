<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
        <h1 class="uk-text-center">
          <span v-if="user"> {{ user.username }}'s </span>
          Account
        </h1>
      </div>
      <!--  Page Content Container  -->
      <section v-if="user" class="uk-section">
        <div class="uk-container">
          <div>
            <div class="user-details">
              <p class="uk-text-large">
                Username:<br /><b>
                  {{ user.username }}
                </b>
              </p>
              <p>
                Date Created:
                <b>
                  {{ formatDate(user.created_at) }}
                </b>
              </p>
              <p>
                Votes Made:
                <b>
                  <animated-number :number="numVotes" class="uk-inline" />
                </b>
              </p>
              <p>
                User Score:
                <b>
                  <animated-number :number="userScore" class="uk-inline" />
                </b>
              </p>
              <p>
                Reviews:
                <b>
                  <animated-number
                    :number="userReviews.length"
                    class="uk-inline"
                  />
                </b>
              </p>
              <div>
                <!--  Masonry Grid  -->
                <div
                  v-if="userReviews.length"
                  class="uk-child-width-1-2@m uk-child-width-1-3@l"
                  uk-grid="masonry: true"
                >
                  <review
                    v-for="r in userReviews"
                    :key="r.title + r.id"
                    :review="r"
                  />
                </div>
                <div v-else>
                  <p class="uk-text-italic uk-light">
                    No Reviews Made...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-else>
        <p class="uk-text-center uk-light">
          Loading account information...
        </p>
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
  transition: 'page',
  components: {
    Review: () => import('@/components/Review'),
    AnimatedNumber: () => import('~/components/AnimatedNumber.vue')
  },
  data() {
    return {
      id: this.$route.params.id,
      userData: ''
    }
  },
  computed: {
    user() {
      return this.userData
    },
    userReviews() {
      return this.user.reviews
    },
    userVotes() {
      return this.user.votes
    },
    numVotes() {
      return this.userVotes ? this.userVotes.length : 0
    },
    userScore() {
      return this.user.score
    }
  },
  async mounted() {
    if (this.id) {
      const result = await this.$store.dispatch('getUser', { id: this.id })
      if (result) {
        this.userData = result
      }
    }
  },
  methods: {
    formatDate(dateTimeValue) {
      return new Date(dateTimeValue).toLocaleString()
    }
  }
}
</script>
