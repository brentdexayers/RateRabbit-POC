import authenticate from '../services/api/authentication'
import fieldOptions from '../services/api/fieldoptions'
import loanSearch from '../services/api/loansearch'

export const state = () => ({
  auth: {},
  datetimes: [],
  loanProductDetail: null,
  loanProducts: {},
  loanPurposes: [],
  loanPrograms: [],
  propertyTypes: [],
  propertyUses: [],
  creditRatings: [],
  loanRefinanceType: [],
  loading: false
})

export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  addDatetime (state) {
    state.datetimes.push(new Date())
  },
  setLoanPurposes (state, options) {
    state.loanPurposes = options
  },
  setLoanPrograms (state, options) {
    state.loanPrograms = options
  },
  setPropertyTypes (state, options) {
    state.propertyTypes = options
  },
  setPropertyUses (state, options) {
    state.propertyUses = options
  },
  setCreditRatings (state, options) {
    state.creditRatings = options
  },
  setLoanProducts (state, products) {
    state.loanProducts = products
  },
  setLoanProductDetail (state, product) {
    state.loanProductDetail = product
  },
  unsetLoanProductDetail (state) {
    state.loanProductDetail = null
  },
  setLoading (state, bool) {
    state.loading = bool
    console.log('LOADING:', bool)
  }
}

export const actions = {
  async AUTHENTICATE ({ commit, state }) {
    const data = await authenticate(state)
    commit('setAuth', data)
  },
  async LOAN_PURPOSES ({ commit, state }) {
    const data = await fieldOptions(state.auth, 'loanpurpose')
    commit('setLoanPurposes', data)
  },
  async LOAN_PROGRAMS ({ commit, state }) {
    const data = await fieldOptions(state.auth, 'loanprogram')
    commit('setLoanPrograms', data)
  },
  async PROPERTY_TYPES ({ commit, state }) {
    const data = await fieldOptions(state.auth, 'propertytype')
    commit('setPropertyTypes', data)
  },
  async PROPERTY_USES ({ commit, state }) {
    const data = await fieldOptions(state.auth, 'propertyuse')
    commit('setPropertyUses', data)
  },
  async CREDIT_RATINGS ({ commit, state }) {
    const data = await fieldOptions(state.auth, 'creditrating')
    commit('setCreditRatings', data)
  },
  async LOAN_SEARCH ({ commit, state }) {
    const data = await loanSearch(state)
    commit('setLoanProducts', data)
  }
}
