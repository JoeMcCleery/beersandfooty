<template>
  <div>
    <div class="content">
      <svg-background />
      <!--  Header  -->
      <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle">
        <h1 class="uk-text-center">Account</h1>
      </div>
      <!--  Page Content Container  -->
      <section v-if="loggedIn" class="uk-section">
        <div class="uk-container">
          <div class="uk-card uk-card-default uk-card-body">
            <button
              class="uk-button uk-button-primary uk-align-right"
              @click="logout"
            >
              Logout
            </button>
            <div>
              <p>
                Username:<br /><b>
                  {{ user.username }}
                </b>
              </p>
              <p>
                Date Created:<br /><b>
                  {{ formatDate(user.created_at) }}
                </b>
              </p>
              <p>
                Votes Made:<br /><b>
                  <animated-number :number="numVotes" />
                </b>
              </p>
              <p>
                User Score:<br /><b>
                  <animated-number :number="userScore" />
                </b>
              </p>
              <div>
                <p>Reviews:</p>
                <!--  Masonry Grid  -->
                <div
                  v-if="userReviews.length"
                  class="uk-child-width-1-2@m uk-child-width-1-3@l"
                  uk-grid="masonry: true"
                >
                  <review
                    v-for="(obj, idx) in userReviews"
                    :key="idx"
                    :review="obj"
                  />
                </div>
                <div v-else>
                  <b>No Reviews Made...</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-else>
        <p class="uk-text-center">
          You must log in or register to see account details.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  components: {
    Review: () => import('@/components/Review'),
    SvgBackground: () => import('~/components/SvgBackground.vue'),
    AnimatedNumber: () => import('~/components/AnimatedNumber.vue')
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    userReviews() {
      return this.user.reviews
    },
    userVotes() {
      return this.$store.state.userVotes
    },
    numVotes() {
      return this.userVotes ? this.userVotes.length : 0
    },
    userScore() {
      return this.user.score
    },
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$store.dispatch('getUser', {})
    }
  },
  methods: {
    logout(e) {
      this.$store.dispatch('logout', {})
      this.$router.push('/')
    },
    formatDate(dateTimeValue) {
      return new Date(dateTimeValue).toLocaleString()
    }
  }
}
</script>

<style src="assets/scss/pages/account.scss" lang="scss"></style>
