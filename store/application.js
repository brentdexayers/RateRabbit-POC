export const state = () => ({
  termIndex: null,
  rateIndex: null,
  date: null
})

export const mutations = {
  setTermIndex (state, payload) {
    state.termIndex = payload
  },
  setRateIndex (state, payload) {
    state.rateIndex = payload
  },
  setDate (state, date = false) {
    if (!date) {
      date = new Date()
    }
    state.date = date
  },
  reset (state) {
    state.termIndex = null
    state.rateIndex = null
    state.date = null
  }
}
