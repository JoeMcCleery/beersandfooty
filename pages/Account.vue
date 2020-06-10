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
          <button
            class="uk-button uk-button-primary uk-align-right"
            @click="logout"
          >
            Logout
          </button>
          <div>
            <p>
              id:<br /><b>{{ user.id }}</b>
            </p>
            <p>
              username:<br /><b>{{ user.username }}</b>
            </p>
            <p>
              created:<br /><b>{{ formatDate(user.created_at) }}</b>
            </p>
            <p>
              votes:<br /><b>{{ user.votes.length }}</b>
            </p>
            <p>
              score:<br /><b>{{ user.score }}</b>
            </p>
            <div>
              <p>reviews:</p>
              <!--  Masonry Grid  -->
              <div
                class="uk-child-width-1-2@s uk-child-width-1-3@m"
                uk-grid="masonry: true"
              >
                <review
                  v-for="(obj, idx) in user.reviews"
                  :key="idx"
                  :review="obj"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-else>
        <p class="uk-text-center">
          You must log in to see account details.
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
    SvgBackground: () => import('~/components/SvgBackground.vue')
  },
  computed: {
    user() {
      return this.$store.state.user
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
