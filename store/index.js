export const state = () => ({
  auth: {
    foo: 'bar'
  },
  application: {
    /**
     * This is not a 1-1 relationship with the submitted Application Payload.
     * Some fields store Object data which must be pre-processed before submit.
     */
    data: {
      businessPhone: null,
      cellPhone: null,
      coBorrower: false,
      coBorrowerAddress: null,
      coBorrowerBusinessPhone: null,
      coBorrowerCellPhone: null,
      coBorrowerCity: null,
      coBorrowerCurrentHazardInsurance: null,
      coBorrowerCurrentHoaFees: null,
      coBorrowerCurrentMortgagePayment: null,
      coBorrowerCurrentPropertyTaxes: null,
      coBorrowerEmail: null,
      coBorrowerEmployedHowLong: null,
      coBorrowerEmployerAddress: null,
      coBorrowerEmployerCity: null,
      coBorrowerEmployerName: null,
      coBorrowerEmployerState: null,
      coBorrowerEmployerZip: null,
      coBorrowerFax: null,
      coBorrowerFirstName: null,
      coBorrowerGrossIncome: null,
      coBorrowerHomePhone: null,
      coBorrowerJobTitle: null,
      coBorrowerLastName: null,
      coBorrowerMaritalStatus: null,
      coBorrowerSelfEmployed: false,
      coBorrowerSsn: null,
      coBorrowerState: null,
      coBorrowerTimeAtCurrentAddress: null,
      coBorrowerZip: null,
      county: null,
      creditRating: null,
      currentAddress: null,
      currentCity: null,
      currentHazardInsurance: null,
      currentHoaFees: null,
      currentMortgagePayment: null,
      currentPropertyTaxes: null,
      currentState: null,
      currentZip: null,
      donationAmount: null,
      email: null,
      employedHowLong: null,
      employerAddress: null,
      employerCity: null,
      employerName: null,
      employerState: null,
      employerZip: null,
      fax: null,
      firstName: null,
      grossIncome: null,
      homePhone: null,
      jobTitle: null,
      lastName: null,
      loanAmount: null,
      loanCashOutAmount: null,
      loanDocType: null,
      loanImpounds: false,
      loanInterestOnly: null,
      loanPurpose: null,
      loanRefinanceType: null,
      maritalStatus: null,
      productId: null,
      promotionCode: null,
      propertyAddress: null,
      propertyCity: null,
      propertyPurchasePrice: null,
      propertyType: null,
      propertyUse: null,
      propertyValue: null,
      propertyYearAcquired: null,
      propertyZip: null,
      result: null,
      selfEmployed: false,
      ssn: null,
      state: null,
      timeAtCurrentAddress: null
    },
    loanProduct: {},
    results: {}
  },
  form: {
    options: {
      creditRatingOptions: {},
      loanPurposeOptions: {},
      propertyTypeOptions: {},
      propertyUseOptions: {},
      stateOptions: {}
    },
    data: {
      signUp: false,
      taxesAndInsurance: null
    }
  },
  search: {
    data: {},
    results: {}
  }
})

// const defaultState = this.state // eslint-disable-line no-unused-vars

export const mutations = {
  setAuth (state, payload) {
    state.auth = payload
  },
  setApplicationLoanProduct (state, payload) {
    state.application.loanProduct = payload
  },
  setApplicationResults (state, payload) {
    state.application.results = payload
  },
  setSearchResults (state, payload) {
    state.search.results = payload
  },
  setSearchData (state, payload) {
    state.search.data = payload
  },
  // Search Form Options
  updateCreditRatingOptions (state, payload) {
    state.form.options.creditRatingOptions = payload
  },
  updateLoanPurposeOptions (state, payload) {
    state.form.options.loanPurposeOptions = payload
  },
  updatePropertyTypeOptions (state, payload) {
    state.form.options.propertyTypeOptions = payload
  },
  updatePropertyUseOptions (state, payload) {
    state.form.options.propertyUseOptions = payload
  },
  updateStateOptions (state, payload) {
    state.form.options.stateOptions = payload
  },
  // Search Form Handlers that are not included in Application (?)
  updateSignUp (state, payload) {
    state.form.data.signUp = payload
  },
  updateTaxesAndInsurance (state, payload) {
    state.form.data.taxesAndInsurance = payload
  },
  // Application Foem handlers
  updateBusinessPhone (state, payload) {
    state.application.data.businessPhone = payload
  },
  updateCellPhone (state, payload) {
    state.application.data.cellPhone = payload
  },
  updateCoBorrower (state, payload) {
    state.application.data.coBorrower = payload
  },
  updateCoBorrowerAddress (state, payload) {
    state.application.data.coBorrowerAddress = payload
  },
  updateCoBorrowerBusinessPhone (state, payload) {
    state.application.data.coBorrowerBusinessPhone = payload
  },
  updateCoBorrowerCellPhone (state, payload) {
    state.application.data.coBorrowerCellPhone = payload
  },
  updateCoBorrowerCity (state, payload) {
    state.application.data.coBorrowerCity = payload
  },
  updateCoBorrowerCurrentHazardInsurance (state, payload) {
    state.application.data.coBorrowerCurrentHazardInsurance = payload
  },
  updateCoBorrowerCurrentHoaFees (state, payload) {
    state.application.data.coBorrowerCurrentHoaFees = payload
  },
  updateCoBorrowerCurrentMortgagePayment (state, payload) {
    state.application.data.coBorrowerCurrentMortgagePayment = payload
  },
  updateCoBorrowerCurrentPropertyTaxes (state, payload) {
    state.application.data.coBorrowerCurrentPropertyTaxes = payload
  },
  updateCoBorrowerEmail (state, payload) {
    state.application.data.coBorrowerEmail = payload
  },
  updateCoBorrowerEmployedHowLong (state, payload) {
    state.application.data.coBorrowerEmployedHowLong = payload
  },
  updateCoBorrowerEmployerAddress (state, payload) {
    state.application.data.coBorrowerEmployerAddress = payload
  },
  updateCoBorrowerEmployerCity (state, payload) {
    state.application.data.coBorrowerEmployerCity = payload
  },
  updateCoBorrowerEmployerName (state, payload) {
    state.application.data.coBorrowerEmployerName = payload
  },
  updateCoBorrowerEmployerState (state, payload) {
    state.application.data.coBorrowerEmployerState = payload
  },
  updateCoBorrowerEmployerZip (state, payload) {
    state.application.data.coBorrowerEmployerZip = payload
  },
  updateCoBorrowerFax (state, payload) {
    state.application.data.coBorrowerFax = payload
  },
  updateCoBorrowerFirstName (state, payload) {
    state.application.data.coBorrowerFirstName = payload
  },
  updateCoBorrowerGrossIncome (state, payload) {
    state.application.data.coBorrowerGrossIncome = payload
  },
  updateCoBorrowerHomePhone (state, payload) {
    state.application.data.coBorrowerHomePhone = payload
  },
  updateCoBorrowerJobTitle (state, payload) {
    state.application.data.coBorrowerJobTitle = payload
  },
  updateCoBorrowerLastName (state, payload) {
    state.application.data.coBorrowerLastName = payload
  },
  updateCoBorrowerMaritalStatus (state, payload) {
    state.application.data.coBorrowerMaritalStatus = payload
  },
  updateCoBorrowerSelfEmployed (state, payload) {
    state.application.data.coBorrowerSelfEmployed = payload
  },
  updateCoBorrowerSsn (state, payload) {
    state.application.data.coBorrowerSsn = payload
  },
  updateCoBorrowerState (state, payload) {
    state.application.data.coBorrowerState = payload
  },
  updateCoBorrowerTimeAtCurrentAddress (state, payload) {
    state.application.data.coBorrowerTimeAtCurrentAddress = payload
  },
  updateCoBorrowerZip (state, payload) {
    state.application.data.coBorrowerZip = payload
  },
  updateCounty (state, payload) {
    state.application.data.county = payload
  },
  updateCreditRating (state, payload) {
    state.application.data.creditRating = payload
  },
  updateCurrentAddress (state, payload) {
    state.application.data.currentAddress = payload
  },
  updateCurrentCity (state, payload) {
    state.application.data.currentCity = payload
  },
  updateCurrentHazardInsurance (state, payload) {
    state.application.data.currentHazardInsurance = payload
  },
  updateCurrentHoaFees (state, payload) {
    state.application.data.currentHoaFees = payload
  },
  updateCurrentMortgagePayment (state, payload) {
    state.application.data.currentMortgagePayment = payload
  },
  updateCurrentPropertyTaxes (state, payload) {
    state.application.data.currentPropertyTaxes = payload
  },
  updateCurrentState (state, payload) {
    state.application.data.currentState = payload
  },
  updateCurrentZip (state, payload) {
    state.application.data.currentZip = payload
  },
  updateDonationAmount (state, payload) {
    state.application.data.donationAmount = payload
  },
  updateEmail (state, payload) {
    state.application.data.email = payload
  },
  updateEmployedHowLong (state, payload) {
    state.application.data.employedHowLong = payload
  },
  updateEmployerAddress (state, payload) {
    state.application.data.employerAddress = payload
  },
  updateEmployerCity (state, payload) {
    state.application.data.employerCity = payload
  },
  updateEmployerName (state, payload) {
    state.application.data.employerName = payload
  },
  updateEmployerState (state, payload) {
    state.application.data.employerState = payload
  },
  updateEmployerZip (state, payload) {
    state.application.data.employerZip = payload
  },
  updateFax (state, payload) {
    state.application.data.fax = payload
  },
  updateFirstName (state, payload) {
    state.application.data.firstName = payload
  },
  updateGrossIncome (state, payload) {
    state.application.data.grossIncome = payload
  },
  updateHomePhone (state, payload) {
    state.application.data.homePhone = payload
  },
  updateJobTitle (state, payload) {
    state.application.data.jobTitle = payload
  },
  updateLastName (state, payload) {
    state.application.data.lastName = payload
  },
  updateLoanAmount (state, payload) {
    state.application.data.loanAmount = payload
  },
  updateLoanCashOutAmount (state, payload) {
    state.application.data.loanCashOutAmount = payload
  },
  updateLoanDocType (state, payload) {
    state.application.data.loanDocType = payload
  },
  updateLoanImpounds (state, payload) {
    state.application.data.loanImpounds = payload
  },
  updateLoanInterestOnly (state, payload) {
    state.application.data.loanInterestOnly = payload
  },
  updateLoanPurpose (state, payload) {
    state.application.data.loanPurpose = payload
  },
  updateLoanRefinanceType (state, payload) {
    state.application.data.loanRefinanceType = payload
  },
  updateMaritalStatus (state, payload) {
    state.application.data.maritalStatus = payload
  },
  updateProductId (state, payload) {
    state.application.data.productId = payload
  },
  updatePromotionCode (state, payload) {
    state.application.data.promotionCode = payload
  },
  updatePropertyAddress (state, payload) {
    state.application.data.propertyAddress = payload
  },
  updatePropertyCity (state, payload) {
    state.application.data.propertyCity = payload
  },
  updatePropertyPurchasePrice (state, payload) {
    state.application.data.propertyPurchasePrice = payload
  },
  updatePropertyType (state, payload) {
    state.application.data.propertyType = payload
  },
  updatePropertyUse (state, payload) {
    state.application.data.propertyUse = payload
  },
  updatePropertyValue (state, payload) {
    state.application.data.propertyValue = payload
  },
  updatePropertyYearAcquired (state, payload) {
    state.application.data.propertyYearAcquired = payload
  },
  updatePropertyZip (state, payload) {
    state.application.data.propertyZip = payload
  },
  updateResult (state, payload) {
    state.application.data.result = payload
  },
  updateSelfEmployed (state, payload) {
    state.application.data.selfEmployed = payload
  },
  updateSsn (state, payload) {
    state.application.data.ssn = payload
  },
  updateState (state, payload) {
    state.application.data.state = payload
  },
  updateTimeAtCurrentAddress (state, payload) {
    state.application.data.timeAtCurrentAddress = payload
  }
}
