export const state = () => ({
  auth: {
    foo: 'bar'
  },
  application: {
    loanProduct: {}
  },
  form: {
    data: {
      cashAmount: null,
      creditRating: null,
      interestOnly: null,
      loanAmount: null,
      loanRefinanceType: null,
      loanPurpose: null,
      promotionCode: null,
      propertyType: null,
      propertyUse: null,
      propertyValue: null,
      signUp: false,
      state: null,
      taxesAndInsurance: false,
      zipCode: null
    }
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
  setSearchResults (state, payload) {
    state.search.results = payload
  },
  setSearchData (state, payload) {
    state.search.data = payload
  },
  // Search Form Handlers
  updateCashAmount (state, payload) {
    state.form.data.cashAmount = payload
  },
  updateCreditRating (state, payload) {
    state.form.data.creditRating = payload
  },
  updateInterestOnly (state, payload) {
    state.form.data.interestOnly = payload
  },
  updateLoanAmount (state, payload) {
    state.form.data.loanAmount = payload
  },
  updateLoanRefinanceType (state, payload) {
    state.form.data.loanRefinanceType = payload
  },
  updateLoanPurpose (state, payload) {
    state.form.data.loanPurpose = payload
  },
  updatePromotionCode (state, payload) {
    state.form.data.promotionCode = payload
  },
  updatePropertyType (state, payload) {
    state.form.data.propertyType = payload
  },
  updatePropertyUse (state, payload) {
    state.form.data.propertyUse = payload
  },
  updatePropertyValue (state, payload) {
    state.form.data.propertyValue = payload
  },
  updateSignUp (state, payload) {
    state.form.data.signUp = payload
  },
  updateState (state, payload) {
    state.form.data.state = payload
  },
  updateTaxesAndInsurance (state, payload) {
    state.form.data.taxesAndInsurance = payload
  },
  updateZipCode (state, payload) {
    state.form.data.zipCode = payload
  }
}

// export const actions = {
//   async AUTHENTICATE ({ commit, state }) {
//     const data = await authenticate(state)
//     commit('setAuth', data)
//   },
//   async LOANSEARCH ({ commit, state }) {
//     const data = await loanSearch(state)
//     commit('setLoanProducts', data)
//   }
// }
