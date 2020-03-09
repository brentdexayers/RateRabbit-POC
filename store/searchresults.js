import loanSearch from '../services/api/loansearch'

export const state = () => ({
  datetimes: [],
  loading: true,
  loanProducts: {},
  showDetails: false
})

export const mutations = {
  setLoanProducts (state, payload) {
    state.loanProducts = payload
  },
  addDatetime (state) {
    state.datetimes.push(new Date())
  },
  showDetails (state) {
    state.showDetails = true
  },
  hideShowDetails (state) {
    state.showDetails = false
  },
  toggleShowDetails (state) {
    state.showDetails = !state.showDetails
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  reset (state) {
    state.loanProducts = {}
  }
}

export const actions = {
  async LOAN_SEARCH ({ commit }) {
    commit('reset')
    const { data } = await loanSearch()
    commit('setLoanProducts', data)
    commit('addDatetime')
    setTimeout(() => {
      commit('setLoading', false)
    }, 1000)
    console.log('LOAN_SEARCH:', data)
  }
}
