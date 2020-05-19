<template>
  <div>
    <!--  Header  -->
    <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle">
      <h1 class="uk-text-center">Your Account</h1>
    </div>
    <!--  Page Content Container  -->
    <section class="uk-section">
      <div class="uk-container">
        <a @click="login" class="uk-button uk-button-default">
          Login
        </a>
        <a @click="logout" class="uk-button uk-button-default">
          Register
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Account',
  methods: {
    login() {
      return true
    },
    logout() {
      return false
    }
  }
}
</script>

<style src="assets/scss/pages/account.scss" lang="scss"></style>
