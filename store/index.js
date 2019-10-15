export const state = () => ({
  searchForm: {}
})

export const mutations = {
  updateSearchForm (state, data) {
    state.searchForm = data
  },
  resetSearchForm (state) {
    Object.keys(state.searchForm).forEach(function (key) {
      state.searchForm[key] = ''
    })
  }
}
