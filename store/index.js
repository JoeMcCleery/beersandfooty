import axios from 'axios'

export const state = () => ({
  api_version: 'v1',
  user: null,
  userAccessToken: null,
  clientAccessToken: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_USER_TOKEN(state, token) {
    state.userAccessToken = token
  },
  SET_CLIENT_TOKEN(state, token) {
    state.clientAccessToken = token
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {},

  async getClientToken({ commit }, { grantType, id, secret, scope }) {
    const { data } = await axios.post(process.env.API_URL + '/oauth/token', {
      grant_type: 'client_credentials',
      client_id: id,
      client_secret: secret,
      scope
    })
    if (data.access_token) {
      commit('SET_CLIENT_TOKEN', data.access_token)
    } else if (data.message || !data.success) {
      throw new Error(data.message)
    }
  }
}
