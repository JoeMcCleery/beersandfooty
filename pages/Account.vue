<template>
  <div v-if="user">
    <!--  Header  -->
    <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle">
      <h1 class="uk-text-center">Account</h1>
    </div>
    <!--  Page Content Container  -->
    <section class="uk-section">
      <div class="uk-container">
        <button @click="logout" class="uk-button uk-button-default">
          Logout
        </button>
        <p>Welcome {{ user.username }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Account',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    logout(e) {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style src="assets/scss/pages/account.scss" lang="scss"></style>
