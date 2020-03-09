export const state = () => ({
  apr: null,
  completed: false,
  // county: null,
  creditrating: null,
  date: null,
  email: null,
  firstname: null,
  interestonly: null,
  lastname: null,
  loanamount: null,
  loanprogram: [],
  loanpurpose: null,
  ltv: 0,
  monthlypayment: null,
  onefeeguarantee: null,
  phone: null,
  propertyvalue: null,
  promotioncode: null,
  propertytype: null,
  propertyuse: null,
  rate: null,
  rateIndex: null,
  loanrefinancetype: null,
  signup: false,
  state: null,
  taxesandinsurance: null,
  term: null,
  termindex: null,
  zipcode: null
})

export const mutations = {
  setAPR (state, payload) {
    state.apr = payload
  },
  setcompleted (state, payload) {
    state.completed = payload
  },
  setzipcode (state, payload) {
    state.zipcode = payload
  },
  // setcounty (state, payload) {
  //   state.county = payload
  // },
  setcreditrating (state, payload) {
    state.creditrating = payload
  },
  setdate (state, payload) {
    state.date = payload
  },
  setemail (state, payload) {
    state.email = payload
  },
  setfirstname (state, payload) {
    state.firstname = payload
  },
  setinterestonly (state, payload) {
    state.interestonly = payload
  },
  setlastname (state, payload) {
    state.lastname = payload
  },
  setloanamount (state, payload) {
    state.loanamount = payload
  },
  setloanprogram (state, payload) {
    state.loanprogram = payload
  },
  setloanpurpose (state, payload) {
    state.loanpurpose = payload
  },
  setLTV (state, payload) {
    state.ltv = payload
  },
  setmonthlypayment (state, payload) {
    state.monthlypayment = payload
  },
  setonefeeguarantee (state, payload) {
    state.onefeeguarantee = payload
  },
  setphone (state, payload) {
    state.phone = payload
  },
  setpropertyvalue (state, payload) {
    state.propertyvalue = payload
  },
  setpromotioncode (state, payload) {
    state.promotioncode = payload
  },
  setpropertytype (state, payload) {
    state.propertytype = payload
  },
  setpropertyuse (state, payload) {
    state.propertyuse = payload
  },
  setrate (state, payload) {
    state.rate = payload
  },
  setrateindex (state, payload) {
    state.rateIndex = payload
  },
  setloanrefinancetype (state, payload) {
    state.loanrefinancetype = payload
  },
  setsignup (state, payload) {
    state.signup = payload
  },
  setstate (state, payload) {
    state.state = payload
  },
  settaxesandinsurance (state, payload) {
    state.taxesandinsurance = payload
  },
  setterm (state, payload) {
    state.term = payload
  },
  settermindex (state, payload) {
    state.termindex = payload
  },
  reset (state) {
    state.apr = null
    state.completed = false
    state.zipcode = null
    // state.county = null
    state.creditrating = null
    state.date = null
    state.email = null
    state.firstname = null
    state.interestonly = null
    state.lastname = null
    state.loanamount = null
    state.loanprogram = []
    state.loanpurpose = null
    state.ltv = 0
    state.monthlypayment = null
    state.onefeeguarantee = null
    state.phone = null
    state.propertyvalue = null
    state.promotioncode = null
    state.propertytype = null
    state.propertyuse = null
    state.rate = null
    state.rateIndex = null
    state.loanrefinancetype = null
    state.signup = false
    state.state = null
    state.taxesandinsurance = null
    state.term = null
    state.termindex = null
  }
}
