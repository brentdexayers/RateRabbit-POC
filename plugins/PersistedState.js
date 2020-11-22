import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'RateRabbit',
    paths: ['application', 'form', 'lead', 'searchResultDetails', 'searchResultsReduced'],
    storage: window.sessionStorage
  })(store)
}
