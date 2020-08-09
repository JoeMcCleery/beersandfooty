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
          <!--  Masonry Grids  -->
          <ul uk-accordion>
            <li>
              <a class="uk-accordion-title" href="#"
                >Unpublished Reviews<span uk-icon="chevron-down"
              /></a>
              <div class="uk-accordion-content">
                <div
                  v-if="reviews"
                  class="uk-child-width-1-2@m uk-child-width-1-3@l"
                  uk-grid="masonry: true"
                >
                  <review
                    v-for="r in reviews"
                    :key="r.title + r.id"
                    :review="r"
                  />
                </div>
              </div>
            </li>

            <li>
              <a class="uk-accordion-title" href="#"
                >Users<span uk-icon="chevron-down"
              /></a>
              <div class="uk-accordion-content">
                <div
                  v-if="users"
                  class="uk-child-width-1-2@m uk-child-width-1-3@l"
                  uk-grid="masonry: true"
                >
                  <user-card
                    v-for="u in users"
                    :key="u.username + u.id"
                    :user="u"
                  />
                </div>
              </div>
            </li>
          </ul>
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
    UserCard: () => import('@/components/UserCard'),
    Review: () => import('@/components/Review')
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
      users: [],
      reviews: []
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
    this.reviews = await this.$store.dispatch('getUnpublishedReviews')
  }
}
</script>
