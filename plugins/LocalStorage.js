import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'RRSearchForm',
    paths: ['searchResultDetails', 'application']
  })(store)
}
