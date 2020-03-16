import authenticate from '../services/api/authentication'
import loanSearch from '../services/api/loansearch'

export const state = () => ({
  auth: {},
  loanProducts: {}
})

export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  setLoanProducts (state, products) {
    state.loanProducts = products
  }
}

export const actions = {
  async AUTHENTICATE ({ commit, state }) {
    const data = await authenticate()
    commit('setAuth', data)
  },
  async LOAN_SEARCH ({ commit, state }) {
    const data = await loanSearch(state.auth, state.application)
    commit('setLoanProducts', data)
  }
}
