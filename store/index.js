export const state = () => ({
  auth: {},
  application: {
    /**
     * This is not a 1-1 relationship with the submitted Application Payload.
     * Some fields store Object data which must be pre-processed before submit.
     */
    data: {
      address: null,
      businessPhone: null,
      cellPhone: null,
      coBorrower: null,
      coBorrowerAddress: null,
      coBorrowerBusinessPhone: null,
      coBorrowerCellPhone: null,
      coBorrowerCity: null,
      coBorrowerCurrentHazardInsurance: null,
      coBorrowerCurrentHoaFees: null,
      coBorrowerCurrentMortgagePayment: null,
      coBorrowerCurrentPropertyTaxes: null,
      coBorrowerDob: null,
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
      coBorrowerHoaDues: null,
      coBorrowerHomePhone: null,
      coBorrowerJobTitle: null,
      coBorrowerLastName: null,
      coBorrowerMaritalStatus: null,
      coBorrowerSelfEmployed: false,
      coBorrowerSsn: null,
      coBorrowerState: null,
      coBorrowerTimeAtCurrentAddress: null,
      coBorrowerYearsLineOfWork: null,
      coBorrowerYearsOfSchool: null,
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
      dob: null,
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
      hoaDues: null,
      homePhone: null,
      jobTitle: null,
      keepingLoc: null,
      lastName: null,
      loanAmount: null,
      loanCashOutAmount: null,
      loanDocType: null,
      loanImpounds: false,
      loanInterestOnly: null,
      loanPurpose: null,
      loanRefinanceType: null,
      loc: null,
      locAfterFirst: null,
      locAmount: null,
      mailingAddress: null,
      mailingZip: null,
      maritalStatus: null,
      productId: null,
      promotionCode: null,
      propertyAddress: null,
      propertyCity: null,
      propertyNumberOfUnits: null,
      propertyPurchasePrice: null,
      propertyType: null,
      propertyUse: null,
      propertyValue: null,
      propertyYearAcquired: null,
      propertyZip: null,
      realEstate_0_address: null,
      realEstate_0_grossRentalIncome: null,
      realEstate_0_presentMarketValue: null,
      realEstate_0_propertyType: null,
      realEstate_0_totalLiens: null,
      realEstate_0_zip: null,
      realEstate_1_address: null,
      realEstate_1_grossRentalIncome: null,
      realEstate_1_presentMarketValue: null,
      realEstate_1_propertyType: null,
      realEstate_1_totalLiens: null,
      realEstate_1_zip: null,
      realEstate_2_address: null,
      realEstate_2_grossRentalIncome: null,
      realEstate_2_presentMarketValue: null,
      realEstate_2_propertyType: null,
      realEstate_2_totalLiens: null,
      realEstate_2_zip: null,
      result: null,
      selfEmployed: null,
      signUp: null,
      ssn: null,
      state: null,
      taxes: null,
      timeAtCurrentAddress: null,
      yearsLineOfWork: null,
      yearsOfSchool: null,
      zip: null
    },
    loanProduct: {},
    results: {}
  },
  form: {
    options: {
      creditRatingOptions: {},
      loanPurposeOptions: {},
      maritalStatusOptions: {},
      propertyTypeOptions: {},
      propertyUseOptions: {},
      stateOptions: {}
    }
  },
  layout: {
    sidebar: 'default'
  },
  loader: false,
  searchResultDetails: [],
  searchResultsReduced: {}
})

// const defaultState = this.state // eslint-disable-line no-unused-vars

export const mutations = {
  toggleLoader (state) {
    state.loader = !state.loader
  },
  // Layout
  setLayoutSidebar (state, payload) {
    state.layout.sidebar = payload
  },
  // Setters
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
    state.searchResultsReduced = payload
  },
  setSearchResultDetails (state, payload) {
    payload.searchResultDetails.forEach((a) => {
      state.searchResultDetails.push(a)
    })
  },
  // Search Form Options
  updateCreditRatingOptions (state, payload) {
    state.form.options.creditRatingOptions = payload
  },
  updateLoanPurposeOptions (state, payload) {
    state.form.options.loanPurposeOptions = payload
  },
  updateMaritalStatusOptions (state, payload) {
    state.form.options.maritalStatusOptions = payload
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
  // Application Fields
  updateAddress (state, payload) {
    state.application.data.address = payload
  },
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
  updateCoBorrowerDob (state, payload) {
    state.application.data.coBorrowerDob = payload
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
  updateCoBorrowerHoaDues (state, payload) {
    state.application.data.coBorrowerHoaDues = payload
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
  updateCoBorrowerYearsLineOfWork (state, payload) {
    state.application.data.coBorrowerYearsLineOfWork = payload
  },
  updateCoBorrowerYearsOfSchool (state, payload) {
    state.application.data.coBorrowerYearsOfSchool = payload
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
  updateDob (state, payload) {
    state.application.data.dob = payload
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
  updateHoaDues (state, payload) {
    state.application.data.hoaDues = payload
  },
  updateHomePhone (state, payload) {
    state.application.data.homePhone = payload
  },
  updateJobTitle (state, payload) {
    state.application.data.jobTitle = payload
  },
  updateKeepingLoc (state, payload) {
    state.application.data.keepingLoc = payload
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
  updateLoc (state, payload) {
    state.application.data.loc = payload
  },
  updateLocAfterFirst (state, payload) {
    state.application.data.locAfterFirst = payload
  },
  updateLocAmount (state, payload) {
    state.application.data.locAmount = payload
  },
  updateMailingAddress (state, payload) {
    state.application.data.mailingAddress = payload
  },
  updateMailingZip (state, payload) {
    state.application.data.mailingZip = payload
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
  updatePropertyNumberOfUnits (state, payload) {
    state.application.data.propertyNumberOfUnits = payload
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
  updateSignUp (state, payload) {
    state.application.data.signUp = payload
  },
  updateSsn (state, payload) {
    state.application.data.ssn = payload
  },
  updateState (state, payload) {
    state.application.data.state = payload
  },
  updateTaxes (state, payload) {
    state.application.data.taxes = payload
  },
  updateTimeAtCurrentAddress (state, payload) {
    state.application.data.timeAtCurrentAddress = payload
  },
  updateYearsLineOfWork (state, payload) {
    state.application.data.yearsLineOfWork = payload
  },
  updateYearsOfSchool (state, payload) {
    state.application.data.yearsOfSchool = payload
  },
  updateZip (state, payload) {
    state.application.data.zip = payload
  },
  // Real Estate
  updateRealEstate_0_address (state, payload) {
    state.application.data.realEstate_0_address = payload
  },
  updateRealEstate_0_grossRentalIncome (state, payload) {
    state.application.data.realEstate_0_grossRentalIncome = payload
  },
  updateRealEstate_0_presentMarketValue (state, payload) {
    state.application.data.realEstate_0_presentMarketValue = payload
  },
  updateRealEstate_0_propertyType (state, payload) {
    state.application.data.realEstate_0_propertyType = payload
  },
  updateRealEstate_0_totalLiens (state, payload) {
    state.application.data.realEstate_0_totalLiens = payload
  },
  updateRealEstate_0_zip (state, payload) {
    state.application.data.realEstate_0_zip = payload
  },
  updateRealEstate_1_address (state, payload) {
    state.application.data.realEstate_1_address = payload
  },
  updateRealEstate_1_grossRentalIncome (state, payload) {
    state.application.data.realEstate_1_grossRentalIncome = payload
  },
  updateRealEstate_1_presentMarketValue (state, payload) {
    state.application.data.realEstate_1_presentMarketValue = payload
  },
  updateRealEstate_1_propertyType (state, payload) {
    state.application.data.realEstate_1_propertyType = payload
  },
  updateRealEstate_1_totalLiens (state, payload) {
    state.application.data.realEstate_1_totalLiens = payload
  },
  updateRealEstate_1_zip (state, payload) {
    state.application.data.realEstate_1_zip = payload
  },
  updateRealEstate_2_address (state, payload) {
    state.application.data.realEstate_2_address = payload
  },
  updateRealEstate_2_grossRentalIncome (state, payload) {
    state.application.data.realEstate_2_grossRentalIncome = payload
  },
  updateRealEstate_2_presentMarketValue (state, payload) {
    state.application.data.realEstate_2_presentMarketValue = payload
  },
  updateRealEstate_2_propertyType (state, payload) {
    state.application.data.realEstate_2_propertyType = payload
  },
  updateRealEstate_2_totalLiens (state, payload) {
    state.application.data.realEstate_2_totalLiens = payload
  },
  updateRealEstate_2_zip (state, payload) {
    state.application.data.realEstate_2_zip = payload
  }
}
