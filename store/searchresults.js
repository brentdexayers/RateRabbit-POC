export const state = () => ({
  results: [],
  date: null,
  showDetails: false
})

export const mutations = {
  add (state, payload) {
    state.results.push(payload)
  },
  remove (state, { result }) {
    state.results.splice(state.results.indexOf(result), 1)
  },
  setDate (state, date = false) {
    if (!date) {
      date = new Date()
    }
    state.date = date
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
    const { data } = await this.$axios.get('http://localhost:3000/SearchResults.json')
    commit('add', data)
    const date = new Date()
    commit('setDate', date)
  }
}
