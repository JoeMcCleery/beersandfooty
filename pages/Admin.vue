<template>
  <div>
    <div v-if="isAdmin" class="content">
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
        <h1 class="uk-text-center">Admin</h1>
      </div>
      <!--  Page Content Container  -->
      <section class="uk-section">
        <div class="uk-container uk-text-center">
          <!--  Masonry Grid  -->
          <div
            v-if="users"
            class="uk-child-width-1-2@m uk-child-width-1-3@l"
            uk-grid="masonry: true"
          >
            <user-card v-for="u in users" :key="u.username + u.id" :user="u" />
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      You are not an Admin.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {
    UserCard: () => import('@/components/UserCard')
  },
  transition(to, from) {
    if (from && (from.name === 'Account-id' || from.name === 'Review-id')) {
      return 'page'
    }
    if (to.name === 'Admin') {
      return 'slide-left'
    }
    return 'slide-right'
  },
  data() {
    return {
      users: []
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    },
    isAdmin() {
      return this.loggedIn && this.$store.state.user.isAdmin
    }
  },
  async mounted() {
    this.users = await this.$store.dispatch('getUsers')
  }
}
</script>
