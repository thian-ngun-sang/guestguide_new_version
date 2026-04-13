import { createStore } from 'vuex'

import { login, register } from '@/api/auth.api';
import { getCurrentUser } from '@/api/user.api';

const validateImage = (image) => {
    if(image === undefined || image === "" || image === null){
        return false;
    }else if(/[a-zA-Z0-9\[\]]+\.[a-z]{3,}/.test(image)){
        return true;
    }
    return false;
}

export default createStore({
  // data
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
		baseUrl: process.env.VUE_APP_BASE_URL,
    imageTypes: ["image/jpeg", "image/png"]
  },

  // computed
  getters: {
		user: (state) => state.user,
    isLoggedIn: (state) => !!state.token,

    token: (state) => {
      state.token = localStorage.getItem('token');
      return state.token;
    }
  },

  // data + actions
  mutations: {
    setToken(state, token) {
      state.token = token
      // axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    },
    setUser(state, user) {
      state.user = user
    },
    clearAuth(state) {
      state.token = null
      state.user = null
    }
  },

  // methods
  actions: {
    async register({ commit, dispatch }, credentials){
        try {
        // Call API to register
        const res = await register(credentials)
        const token = res.data.token

        // Save token
        commit('setToken', token)
        localStorage.setItem('token', token)

        // Fetch user data after register
        await dispatch('fetchUser')

        return true // optional: indicate success
      } catch (err) {
        console.error('Register failed:', err)

        // Optional: clear any partial state
        commit('clearAuth')
        localStorage.removeItem('token')

        // Optionally throw error to component or return false
        throw err
      }
    },
    async login({ commit, dispatch }, credentials) {
        try {
        // Call API to login
        const res = await login(credentials)
        const token = res.data.token

        // Save token
        commit('setToken', token)
        localStorage.setItem('token', token)

        // Fetch user data after login
        await dispatch('fetchUser')

        return true // optional: indicate success
      } catch (err) {
        console.error('Login failed:', err)

        // Optional: clear any partial state
        commit('clearAuth')
        localStorage.removeItem('token')

        // Optionally throw error to component or return false
        throw err
      }
    },
    async fetchUser({ commit, state }) {
      if (!state.token) return
      try {
        const res = await getCurrentUser(state.token)
        const { user } = res.data;
        commit('setUser', user)
      } catch (err) {
        commit('clearAuth')
        localStorage.removeItem('token')
        throw err;
      }
    },
    logout({ commit }) {
      commit('clearAuth')
      localStorage.removeItem('token')
    }
  },

  modules: { }
})

// action + dispatch
// mutation + commit
