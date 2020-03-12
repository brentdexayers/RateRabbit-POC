import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'RRSearchForm',
    paths: ['searchresults', 'application']
  })(store)
}
