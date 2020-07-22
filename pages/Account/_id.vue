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
      <section class="uk-section">
        <div class="uk-container">
          <div>
            <!--  Masonry Grid  -->
            <div
              v-if="user"
              class="uk-child-width-1-2@m uk-child-width-1-3@l"
              uk-grid="masonry: true"
            >
              <user-card :user="user" />
              <review
                v-for="r in userReviews"
                :key="r.title + r.id"
                :review="r"
              />
            </div>
            <div v-else>
              <div class="uk-text-center uk-light">
                <div uk-spinner="ratio: 0.5;"></div>
                Loading account information
              </div>
            </div>
          </div>
        </div>
      </section>
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
    UserCard: () => import('@/components/UserCard'),
    Review: () => import('@/components/Review')
  },
  data() {
    return {
      id: this.$route.params.id,
      userData: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user
    },
    user() {
      return this.userData
    },
    userReviews() {
      return this.user.reviews.filter((review) => {
        return (
          review.status === 'published' ||
          (this.currentUser && this.currentUser.isAdmin)
        )
      })
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
  },
  head() {
    return {
      title: this.user
        ? process.env.SITE_TITLE + ' - ' + this.user.username
        : process.env.SITE_TITLE
    }
  }
}
</script>
