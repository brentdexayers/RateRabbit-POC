export const state = () => ({
  auth: {
    foo: 'bar'
  },
  application: {
    loanProduct: {}
  },
  search: {
    data: {},
    results: {}
  }
})

export const mutations = {
  setAuth (state, payload) {
    state.auth = payload
  },
  setApplicationLoanProduct (state, payload) {
    state.application.loanProduct = payload
  },
  setSearchData (state, payload) {
    state.search.data = payload
  },
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
