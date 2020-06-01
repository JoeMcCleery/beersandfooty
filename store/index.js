import axios from 'axios'

export const state = () => ({
  user: null,
  accessToken: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {},

  async getToken({ commit }, { id, secret, scope }) {
    const { data } = await axios.post(process.env.API_URL + '/oauth/token', {
      grant_type: 'client_credentials',
      client_id: id,
      client_secret: secret,
      scope
    })
    if (!data.message) {
      commit('SET_ACCESS_TOKEN', data.access_token)
    } else {
      throw new Error(data.message)
    }
  },

  logout({ commit }) {
    commit('SET_USER', null)
  },

  async login({ commit }, { username, password }) {
    const { data } = await axios.post(
      process.env.API_URL + '/api/v1/login',
      {
        username,
        password
      },
      {
        Authorisation: 'Bearer ' + this.state.accessToken
      }
    )
    if (data.success) {
      commit('SET_USER', data.data.user)
    } else {
      throw new Error(data.message)
    }
  },

  async register({ commit }, { username, password }) {
    const { data } = await axios.post(
      process.env.API_URL + '/api/v1/register',
      {
        username,
        password
      },
      {
        Authorisation: 'Bearer ' + this.state.accessToken
      }
    )
    if (data.success) {
      commit('SET_USER', data.data.user)
    } else {
      throw new Error(data.message)
    }
  }
}
