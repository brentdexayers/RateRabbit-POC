import authenticate from '../services/api/authentication'
import loanSearch from '../services/api/loansearch'

export const state = () => ({
  auth: {},
  datetimes: [],
  loanProductDetail: null,
  loanProducts: {},
  loading: false
})

export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  addDatetime (state) {
    state.datetimes.push(new Date())
  },
  setLoanProducts (state, products) {
    state.loanProducts = products
  },
  setLoanProductDetail (state, product) {
    state.loanProductDetail = product
  },
  unsetLoanProductDetail (state) {
    state.loanProductDetail = null
  },
  setLoading (state, bool) {
    state.loading = bool
    console.log('LOADING:', bool)
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
