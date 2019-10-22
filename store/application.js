export const state = () => ({
  apr: null,
  completed: false,
  county: null,
  creditRating: null,
  date: null,
  email: null,
  firstName: null,
  interestOnly: null,
  lastName: null,
  loanAmount: null,
  loanProgram: [],
  loanPurpose: null,
  ltv: 0,
  monthlyPayment: null,
  oneFeeGuarantee: null,
  phone: null,
  propertyValue: null,
  promoCode: null,
  propertyType: null,
  propertyUse: null,
  rate: null,
  rateIndex: null,
  refinanceType: null,
  signUp: false,
  state: null,
  taxesInsurance: null,
  term: null,
  termIndex: null
})

export const mutations = {
  setAPR (state, payload) {
    state.apr = payload
  },
  setCompleted (state, payload) {
    state.completed = payload
  },
  setCounty (state, payload) {
    state.county = payload
  },
  setCreditRating (state, payload) {
    state.creditRating = payload
  },
  setDate (state, payload) {
    state.date = payload
  },
  setEmail (state, payload) {
    state.email = payload
  },
  setFirstName (state, payload) {
    state.firstName = payload
  },
  setInterestOnly (state, payload) {
    state.interestOnly = payload
  },
  setLastName (state, payload) {
    state.lastName = payload
  },
  setLoanAmount (state, payload) {
    state.loanAmount = payload
  },
  setLoanProgram (state, payload) {
    state.loanProgram = payload
  },
  setLoanPurpose (state, payload) {
    state.loanPurpose = payload
  },
  setLTV (state, payload) {
    state.ltv = payload
  },
  setMonthlyPayment (state, payload) {
    state.monthlyPayment = payload
  },
  setOneFeeGuarantee (state, payload) {
    state.oneFeeGuarantee = payload
  },
  setPhone (state, payload) {
    state.phone = payload
  },
  setPropertyValue (state, payload) {
    state.propertyValue = payload
  },
  setPromoCode (state, payload) {
    state.promoCode = payload
  },
  setPropertyType (state, payload) {
    state.propertyType = payload
  },
  setPropertyUse (state, payload) {
    state.propertyUse = payload
  },
  setRate (state, payload) {
    state.rate = payload
  },
  setRateIndex (state, payload) {
    state.rateIndex = payload
  },
  setRefinanceType (state, payload) {
    state.refinanceType = payload
  },
  setSignUp (state, payload) {
    state.signUp = payload
  },
  setState (state, payload) {
    state.state = payload
  },
  setTaxesInsurance (state, payload) {
    state.taxesInsurance = payload
  },
  setTerm (state, payload) {
    state.term = payload
  },
  setTermIndex (state, payload) {
    state.termIndex = payload
  },
  reset (state) {
    state.apr = null
    state.completed = false
    state.county = null
    state.creditRating = null
    state.date = null
    state.email = null
    state.firstName = null
    state.interestOnly = null
    state.lastName = null
    state.loanAmount = null
    state.loanProgram = []
    state.loanPurpose = null
    state.ltv = 0
    state.monthlyPayment = null
    state.oneFeeGuarantee = null
    state.phone = null
    state.propertyValue = null
    state.promoCode = null
    state.propertyType = null
    state.propertyUse = null
    state.rate = null
    state.rateIndex = null
    state.refinanceType = null
    state.signUp = false
    state.state = null
    state.taxesInsurance = null
    state.term = null
    state.termIndex = null
  }
}
