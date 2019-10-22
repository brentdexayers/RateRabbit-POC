export const state = () => ({
  results: [],
  date: null,
  showDetails: false
})

export const mutations = {
  add (state, payload) {
    state.results.push(payload)
  },
  setDate (state, payload = false) {
    if (!payload) {
      payload = new Date()
    }
    state.date = payload
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
  reset (state) {
    state.results.length = 0
  }
}

export const actions = {
  async GET_RESULTS ({ commit }) {
    commit('reset')
    const { data } = await this.$axios.get(process.env.baseUrl + '/SearchResults.json')
    commit('add', data)
    const date = new Date()
    commit('setDate', date)
  }
}
