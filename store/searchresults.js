export const state = () => ({
  results: [],
  datetimes: [],
  showDetails: false,
  loading: true
})

export const mutations = {
  add (state, payload) {
    state.results.push(payload)
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
    state.results.length = 0
  }
}

export const actions = {
  async GET_RESULTS ({ commit }) {
    commit('reset')
    const { data } = await this.$axios.get(process.env.baseUrl + '/SearchResults.json')
    commit('add', data)
    commit('addDatetime')
    setTimeout(() => {
      commit('setLoading', false)
    }, 1000)
  }
}
