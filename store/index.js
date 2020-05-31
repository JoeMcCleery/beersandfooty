import axios from 'axios'

export const state = () => ({
  user: null,
  appToken: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    console.log(state.user)
  },
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {},

  logout({ commit }) {
    commit('SET_USER', null)
  },

  async login({ commit }, { username, password }) {
    const { data } = await axios.post(
      'http://127.0.0.1:8001/api/v1/login',
      {
        username,
        password
      },
      {}
    )
    if (data.success) {
      commit('SET_USER', data.data.user)
    } else {
      throw new Error(data.message)
    }
  },

  async register({ commit }, { username, password }) {
    const { data } = await axios.post(
      'http://127.0.0.1:8001/api/v1/register',
      {
        username,
        password
      },
      {}
    )
    if (data.success) {
      commit('SET_USER', data.data.user)
    } else {
      throw new Error(data.message)
    }
  }
}
