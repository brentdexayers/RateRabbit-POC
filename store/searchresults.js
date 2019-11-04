export const state = () => ({
  loanProducts: {},
  datetimes: [],
  showDetails: false,
  loading: true
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
  async GET_LOAN_PRODUCTS ({ commit }) {
    commit('reset')
    const { data } = await this.$axios.get(process.env.baseUrl + '/TestResults.json')
    commit('setLoanProducts', data)
    commit('addDatetime')
    setTimeout(() => {
      commit('setLoading', false)
    }, 1000)
  }
}
