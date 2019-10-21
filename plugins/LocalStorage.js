import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'RRSearchForm',
    paths: ['searchform', 'searchresults', 'application']
  })(store)
}
