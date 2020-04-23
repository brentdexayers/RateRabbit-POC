export const state = () => ({
  search: {
    results: {}
  }
})

export const mutations = {
  setSearchResults (state, payload) {
    state.search.results = payload
  }
}

// export const actions = {
//   async AUTHENTICATE ({ commit, state }) {
//     const data = await authenticate(state)
//     commit('setAuth', data)
//   },
//   async LOAN_SEARCH ({ commit, state }) {
//     const data = await loanSearch(state)
//     commit('setLoanProducts', data)
//   }
// }
