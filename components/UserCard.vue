<template>
  <div>
    <div class="uk-card uk-card-default user-card">
      <div class="uk-card-body">
        <div class="uk-card-title uk-text-bold uk-margin-small">
          <div>{{ userData.username }}</div>
        </div>
        <div
          class="icons uk-grid-collapse uk-text-muted uk-child-width-1-1"
          uk-grid
        >
          <div>
            <div>
              <span uk-icon="calendar" />
              {{ formatDate(user.created_at) }}
            </div>
          </div>
          <div>
            <div>
              <span uk-icon="star" />
              <animated-number :number="userData.score" class="uk-inline" />
            </div>
          </div>
          <div>
            <div>
              <span uk-icon="check" />
              <animated-number :number="numVotes" class="uk-inline" />
            </div>
          </div>
          <div>
            <div>
              <span uk-icon="file-edit" />
              <animated-number :number="numReviews" class="uk-inline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  components: {
    AnimatedNumber: () => import('~/components/AnimatedNumber.vue')
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: 0,
          username: '',
          score: 0,
          created_at: 0,
          reviews_made: 0,
          votes_made: 0
        }
      }
    }
  },
  data() {
    return {
      userData: this.user
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user
    },
    numVotes() {
      return this.userData.votes ? this.userData.votes.length : 0
    },
    numReviews() {
      return this.userData.reviews ? this.userData.reviews.length : 0
    }
  },
  watch: {
    user() {
      this.userData = this.user
    }
  },
  methods: {
    formatDate(dateTimeValue) {
      return new Date(dateTimeValue).toDateString()
    }
  }
}
</script>
