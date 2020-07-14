<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div class="header">
        <h1 class="uk-text-center">Your Account</h1>
        <button
          class="uk-button uk-button-danger uk-align-right"
          @click="logout"
          title="Logout"
          style="width: 40px; padding: 0;"
        >
          <span uk-icon="icon: sign-out;" />
        </button>
      </div>
      <!--  Page Content Container  -->
      <section v-if="loggedIn" class="uk-section">
        <div class="uk-container">
          <div>
            <!--  Masonry Grid  -->
            <div
              class="uk-child-width-1-2@m uk-child-width-1-3@l"
              uk-grid="masonry: true"
            >
              <div>
                <user-card :user="user" />
              </div>
              <review
                v-for="r in userReviews"
                :key="r.title + r.id"
                :review="r"
              />
            </div>
          </div>
        </div>
      </section>
      <div v-else>
        <p class="uk-text-center uk-light">
          You must log to see account details.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  components: {
    UserCard: () => import('@/components/UserCard'),
    Review: () => import('@/components/Review')
  },
  transition(to, from) {
    if (from && (from.name === 'Account-id' || from.name === 'Review-id')) {
      return 'page'
    }
    if (to.name === 'Account') {
      return 'slide-left'
    }
    return 'slide-right'
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
      this.$store.dispatch('getCurrentUser')
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout', {})
      this.$router.push('/')
    },
    formatDate(dateTimeValue) {
      return new Date(dateTimeValue).toLocaleString()
    }
  }
}
</script>
