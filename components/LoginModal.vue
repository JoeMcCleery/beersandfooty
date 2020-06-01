<template>
  <div id="login-modal" ref="modal" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-margin-auto-vertical">
      <button class="uk-modal-close-default" type="button" uk-close></button>
      <form v-if="!$store.state.authUser" @submit.prevent="submitForm">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Login / Register</h2>
        </div>
        <div class="uk-modal-body">
          <div v-if="formError" class="uk-alert-danger" uk-alert>
            <p>{{ formError }}</p>
          </div>

          <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input
                v-model="formUsername"
                type="text"
                required
                name="username"
                placeholder="username"
                class="uk-input uk-width-expand"
              />
            </div>
          </div>

          <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input
                v-model="formPassword"
                type="password"
                required
                name="password"
                placeholder="password"
                class="uk-input uk-width-expand"
              />
            </div>
          </div>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button
            class="uk-button uk-button-primary"
            type="submit"
            name="login"
            value="true"
          >
            Login
          </button>
          <button
            class="uk-button uk-button-default"
            type="submit"
            name="register"
            value="true"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async submitForm(e) {
      if (e.submitter.name === 'login') {
        try {
          await this.$store.dispatch('getUserToken', {
            client_id: process.env.PASSWORD_CLIENT_ID,
            client_secret: process.env.PASSWORD_CLIENT_SECRET,
            username: this.formUsername,
            password: this.formPassword,
            scope: '*'
          })
          this.formUsername = ''
          this.formPassword = ''
          this.formError = null
        } catch (e) {
          this.formError = e.message
        }
      } else if (e.submitter.name === 'register') {
        // try {
        //   await this.$store.dispatch('register', {
        //     username: this.formUsername,
        //     password: this.formPassword,
        //     scope: '*'
        //   })
        //   this.formUsername = ''
        //   this.formPassword = ''
        //   this.formError = null
        // } catch (e) {
        //   this.formError = e.message
        // }
      }
      if (!this.formError) {
        window.hideModal(this.$refs.modal)
      }
    }
  }
}
</script>
