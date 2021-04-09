import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userName: null,
    password: null,
    auth:false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.userName = user
    },
    setPass(state, pass) {
      state.password = pass
    },
    setAuth(state){
      state.auth = true
    }
  },
  actions: {
    async login({commit}, {userName, password}) {
      try {
        const token = await axios.post('/user/login', {
          userName: userName,
          password: password
        })
        if (token.data.token) {
          localStorage.setItem('access_token', token.data.token)
          commit('setToken', token.data.token)
          commit('setAuth')
        } else {
          console.log('wrong user or password')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async SignUp({commit}, {userName, password, email}) {
      try {
        const token = await axios.post('/user/signin', {
          userName: userName,
          password: password,
          email: email
        })
        if (token.data.token) {
          localStorage.setItem('access_token', token.data.token)
          commit('setToken', token.data.token)
          console.log(token.data.token)
          commit('setAuth')
        }
      } catch (e) {
        console.warn(e)
      }

    }
  }
})

