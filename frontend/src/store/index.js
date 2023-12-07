import { createStore } from 'vuex'

export default createStore({
  // data
  state: {
    user: {},
    token: "",
    isLoading: true,
		baseUrl: process.env.VUE_APP_BASE_URL,
    imageTypes: ["image/jpeg", "image/png"]
  },

  // computed
  getters: {
    getServiceType: (state) => state.serviceType,

		getUser: (state) => state.user,

		getBaseUrl: (state) => state.baseUrl
  },

  // data + actions
  mutations: {
    setAuthentication: (state, status) => state.authenticated = status,
    setToken: (state, token) => {
      state.token = token;
      localStorage.setItem('token', token);
    },
    getToken: (state) => {
      state.token = localStorage.getItem('token');
      return state.token;
    },
    setServiceType: (state, status) => state.serviceType = status
  },

  // methods
  actions: {
    setIsLoading: ({state}, value) => state.isLoading = value,
    setIsAuthenticated: ({state}, value) => state.isAuthenticated = value,
    setUser: ({state}, user) => state.user = { ...state.user, ...user },
  },

  modules: {
  }
})

// action + dispatch
// mutation + commit
