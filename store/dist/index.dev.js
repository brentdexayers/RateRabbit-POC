/* eslint-disable */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutations = exports.state = void 0;

var state = function state() {
  return {
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
        creditRatingOptions: [],
        loanPurposeOptions: [],
        maritalStatusOptions: [],
        promotionCodeOptions: [],
        propertyTypeOptions: [],
        propertyUseOptions: [],
        stateOptions: []
      }
    },
    layout: {
      sidebar: 'default'
    },
    loader: false,
    searchResultDetails: [],
    searchResultsReduced: {}
  };
}; // const defaultState = this.state // eslint-disable-line no-unused-vars


exports.state = state;
var mutations = {
  toggleLoader: function toggleLoader(state) {
    state.loader = !state.loader;
  },
  // Layout
  setLayoutSidebar: function setLayoutSidebar(state, payload) {
    state.layout.sidebar = payload;
  },
  // Setters
  setAuth: function setAuth(state, payload) {
    state.auth = payload;
  },
  setApplicationLoanProduct: function setApplicationLoanProduct(state, payload) {
    state.application.loanProduct = payload;
  },
  setApplicationResults: function setApplicationResults(state, payload) {
    state.application.results = payload;
  },
  setSearchResults: function setSearchResults(state, payload) {
    state.searchResultsReduced = payload;
  },
  setSearchResultDetails: function setSearchResultDetails(state, payload) {
    // payload.forEach((a) => {
    //   state.searchResultDetails.push(a)
    // })
    state.searchResultDetails = payload;
  },
  // Promotion Codes
  updatePromotionCodeOptions: function updatePromotionCodeOptions(state, payload) {
    state.form.options.promotionCodeOptions = payload;
  },
  // Search Form Options
  updateCreditRatingOptions: function updateCreditRatingOptions(state, payload) {
    state.form.options.creditRatingOptions = payload;
  },
  updateLoanPurposeOptions: function updateLoanPurposeOptions(state, payload) {
    state.form.options.loanPurposeOptions = payload;
  },
  updateMaritalStatusOptions: function updateMaritalStatusOptions(state, payload) {
    state.form.options.maritalStatusOptions = payload;
  },
  updatePropertyTypeOptions: function updatePropertyTypeOptions(state, payload) {
    state.form.options.propertyTypeOptions = payload;
  },
  updatePropertyUseOptions: function updatePropertyUseOptions(state, payload) {
    state.form.options.propertyUseOptions = payload;
  },
  updateStateOptions: function updateStateOptions(state, payload) {
    state.form.options.stateOptions = payload;
  },
  // Application Fields
  updateAddress: function updateAddress(state, payload) {
    state.application.data.address = payload;
  },
  updateBusinessPhone: function updateBusinessPhone(state, payload) {
    state.application.data.businessPhone = payload;
  },
  updateCellPhone: function updateCellPhone(state, payload) {
    state.application.data.cellPhone = payload;
  },
  updateCoBorrower: function updateCoBorrower(state, payload) {
    state.application.data.coBorrower = payload;
  },
  updateCoBorrowerAddress: function updateCoBorrowerAddress(state, payload) {
    state.application.data.coBorrowerAddress = payload;
  },
  updateCoBorrowerBusinessPhone: function updateCoBorrowerBusinessPhone(state, payload) {
    state.application.data.coBorrowerBusinessPhone = payload;
  },
  updateCoBorrowerCellPhone: function updateCoBorrowerCellPhone(state, payload) {
    state.application.data.coBorrowerCellPhone = payload;
  },
  updateCoBorrowerCity: function updateCoBorrowerCity(state, payload) {
    state.application.data.coBorrowerCity = payload;
  },
  updateCoBorrowerCurrentHazardInsurance: function updateCoBorrowerCurrentHazardInsurance(state, payload) {
    state.application.data.coBorrowerCurrentHazardInsurance = payload;
  },
  updateCoBorrowerCurrentHoaFees: function updateCoBorrowerCurrentHoaFees(state, payload) {
    state.application.data.coBorrowerCurrentHoaFees = payload;
  },
  updateCoBorrowerCurrentMortgagePayment: function updateCoBorrowerCurrentMortgagePayment(state, payload) {
    state.application.data.coBorrowerCurrentMortgagePayment = payload;
  },
  updateCoBorrowerCurrentPropertyTaxes: function updateCoBorrowerCurrentPropertyTaxes(state, payload) {
    state.application.data.coBorrowerCurrentPropertyTaxes = payload;
  },
  updateCoBorrowerDob: function updateCoBorrowerDob(state, payload) {
    state.application.data.coBorrowerDob = payload;
  },
  updateCoBorrowerEmail: function updateCoBorrowerEmail(state, payload) {
    state.application.data.coBorrowerEmail = payload;
  },
  updateCoBorrowerEmployedHowLong: function updateCoBorrowerEmployedHowLong(state, payload) {
    state.application.data.coBorrowerEmployedHowLong = payload;
  },
  updateCoBorrowerEmployerAddress: function updateCoBorrowerEmployerAddress(state, payload) {
    state.application.data.coBorrowerEmployerAddress = payload;
  },
  updateCoBorrowerEmployerCity: function updateCoBorrowerEmployerCity(state, payload) {
    state.application.data.coBorrowerEmployerCity = payload;
  },
  updateCoBorrowerEmployerName: function updateCoBorrowerEmployerName(state, payload) {
    state.application.data.coBorrowerEmployerName = payload;
  },
  updateCoBorrowerEmployerState: function updateCoBorrowerEmployerState(state, payload) {
    state.application.data.coBorrowerEmployerState = payload;
  },
  updateCoBorrowerEmployerZip: function updateCoBorrowerEmployerZip(state, payload) {
    state.application.data.coBorrowerEmployerZip = payload;
  },
  updateCoBorrowerFax: function updateCoBorrowerFax(state, payload) {
    state.application.data.coBorrowerFax = payload;
  },
  updateCoBorrowerFirstName: function updateCoBorrowerFirstName(state, payload) {
    state.application.data.coBorrowerFirstName = payload;
  },
  updateCoBorrowerGrossIncome: function updateCoBorrowerGrossIncome(state, payload) {
    state.application.data.coBorrowerGrossIncome = payload;
  },
  updateCoBorrowerHoaDues: function updateCoBorrowerHoaDues(state, payload) {
    state.application.data.coBorrowerHoaDues = payload;
  },
  updateCoBorrowerHomePhone: function updateCoBorrowerHomePhone(state, payload) {
    state.application.data.coBorrowerHomePhone = payload;
  },
  updateCoBorrowerJobTitle: function updateCoBorrowerJobTitle(state, payload) {
    state.application.data.coBorrowerJobTitle = payload;
  },
  updateCoBorrowerLastName: function updateCoBorrowerLastName(state, payload) {
    state.application.data.coBorrowerLastName = payload;
  },
  updateCoBorrowerMaritalStatus: function updateCoBorrowerMaritalStatus(state, payload) {
    state.application.data.coBorrowerMaritalStatus = payload;
  },
  updateCoBorrowerSelfEmployed: function updateCoBorrowerSelfEmployed(state, payload) {
    state.application.data.coBorrowerSelfEmployed = payload;
  },
  updateCoBorrowerSsn: function updateCoBorrowerSsn(state, payload) {
    state.application.data.coBorrowerSsn = payload;
  },
  updateCoBorrowerState: function updateCoBorrowerState(state, payload) {
    state.application.data.coBorrowerState = payload;
  },
  updateCoBorrowerTimeAtCurrentAddress: function updateCoBorrowerTimeAtCurrentAddress(state, payload) {
    state.application.data.coBorrowerTimeAtCurrentAddress = payload;
  },
  updateCoBorrowerYearsLineOfWork: function updateCoBorrowerYearsLineOfWork(state, payload) {
    state.application.data.coBorrowerYearsLineOfWork = payload;
  },
  updateCoBorrowerYearsOfSchool: function updateCoBorrowerYearsOfSchool(state, payload) {
    state.application.data.coBorrowerYearsOfSchool = payload;
  },
  updateCoBorrowerZip: function updateCoBorrowerZip(state, payload) {
    state.application.data.coBorrowerZip = payload;
  },
  updateCounty: function updateCounty(state, payload) {
    state.application.data.county = payload;
  },
  updateCreditRating: function updateCreditRating(state, payload) {
    state.application.data.creditRating = payload;
  },
  updateCurrentAddress: function updateCurrentAddress(state, payload) {
    state.application.data.currentAddress = payload;
  },
  updateCurrentCity: function updateCurrentCity(state, payload) {
    state.application.data.currentCity = payload;
  },
  updateCurrentHazardInsurance: function updateCurrentHazardInsurance(state, payload) {
    state.application.data.currentHazardInsurance = payload;
  },
  updateCurrentHoaFees: function updateCurrentHoaFees(state, payload) {
    state.application.data.currentHoaFees = payload;
  },
  updateCurrentMortgagePayment: function updateCurrentMortgagePayment(state, payload) {
    state.application.data.currentMortgagePayment = payload;
  },
  updateCurrentPropertyTaxes: function updateCurrentPropertyTaxes(state, payload) {
    state.application.data.currentPropertyTaxes = payload;
  },
  updateCurrentState: function updateCurrentState(state, payload) {
    state.application.data.currentState = payload;
  },
  updateCurrentZip: function updateCurrentZip(state, payload) {
    state.application.data.currentZip = payload;
  },
  updateDob: function updateDob(state, payload) {
    state.application.data.dob = payload;
  },
  updateDonationAmount: function updateDonationAmount(state, payload) {
    state.application.data.donationAmount = payload;
  },
  updateEmail: function updateEmail(state, payload) {
    state.application.data.email = payload;
  },
  updateEmployedHowLong: function updateEmployedHowLong(state, payload) {
    state.application.data.employedHowLong = payload;
  },
  updateEmployerAddress: function updateEmployerAddress(state, payload) {
    state.application.data.employerAddress = payload;
  },
  updateEmployerCity: function updateEmployerCity(state, payload) {
    state.application.data.employerCity = payload;
  },
  updateEmployerName: function updateEmployerName(state, payload) {
    state.application.data.employerName = payload;
  },
  updateEmployerState: function updateEmployerState(state, payload) {
    state.application.data.employerState = payload;
  },
  updateEmployerZip: function updateEmployerZip(state, payload) {
    state.application.data.employerZip = payload;
  },
  updateFax: function updateFax(state, payload) {
    state.application.data.fax = payload;
  },
  updateFirstName: function updateFirstName(state, payload) {
    state.application.data.firstName = payload;
  },
  updateGrossIncome: function updateGrossIncome(state, payload) {
    state.application.data.grossIncome = payload;
  },
  updateHoaDues: function updateHoaDues(state, payload) {
    state.application.data.hoaDues = payload;
  },
  updateHomePhone: function updateHomePhone(state, payload) {
    state.application.data.homePhone = payload;
  },
  updateJobTitle: function updateJobTitle(state, payload) {
    state.application.data.jobTitle = payload;
  },
  updateKeepingLoc: function updateKeepingLoc(state, payload) {
    state.application.data.keepingLoc = payload;
  },
  updateLastName: function updateLastName(state, payload) {
    state.application.data.lastName = payload;
  },
  updateLoanAmount: function updateLoanAmount(state, payload) {
    state.application.data.loanAmount = payload;
  },
  updateLoanCashOutAmount: function updateLoanCashOutAmount(state, payload) {
    state.application.data.loanCashOutAmount = payload;
  },
  updateLoanDocType: function updateLoanDocType(state, payload) {
    state.application.data.loanDocType = payload;
  },
  updateLoanImpounds: function updateLoanImpounds(state, payload) {
    state.application.data.loanImpounds = payload;
  },
  updateLoanInterestOnly: function updateLoanInterestOnly(state, payload) {
    state.application.data.loanInterestOnly = payload;
  },
  updateLoanPurpose: function updateLoanPurpose(state, payload) {
    state.application.data.loanPurpose = payload;
  },
  updateLoanRefinanceType: function updateLoanRefinanceType(state, payload) {
    state.application.data.loanRefinanceType = payload;
  },
  updateLoc: function updateLoc(state, payload) {
    state.application.data.loc = payload;
  },
  updateLocAfterFirst: function updateLocAfterFirst(state, payload) {
    state.application.data.locAfterFirst = payload;
  },
  updateLocAmount: function updateLocAmount(state, payload) {
    state.application.data.locAmount = payload;
  },
  updateMailingAddress: function updateMailingAddress(state, payload) {
    state.application.data.mailingAddress = payload;
  },
  updateMailingZip: function updateMailingZip(state, payload) {
    state.application.data.mailingZip = payload;
  },
  updateMaritalStatus: function updateMaritalStatus(state, payload) {
    state.application.data.maritalStatus = payload;
  },
  updatePayOffLoc: function updatePayOffLoc(state, payload) {
    state.application.data.payOffLoc = payload;
  },
  updateProductId: function updateProductId(state, payload) {
    state.application.data.productId = payload;
  },
  updatePromotionCode: function updatePromotionCode(state, payload) {
    state.application.data.promotionCode = payload;
  },
  updatePropertyAddress: function updatePropertyAddress(state, payload) {
    state.application.data.propertyAddress = payload;
  },
  updatePropertyCity: function updatePropertyCity(state, payload) {
    state.application.data.propertyCity = payload;
  },
  updatePropertyNumberOfUnits: function updatePropertyNumberOfUnits(state, payload) {
    state.application.data.propertyNumberOfUnits = payload;
  },
  updatePropertyPurchasePrice: function updatePropertyPurchasePrice(state, payload) {
    state.application.data.propertyPurchasePrice = payload;
  },
  updatePropertyType: function updatePropertyType(state, payload) {
    state.application.data.propertyType = payload;
  },
  updatePropertyUse: function updatePropertyUse(state, payload) {
    state.application.data.propertyUse = payload;
  },
  updatePropertyValue: function updatePropertyValue(state, payload) {
    state.application.data.propertyValue = payload;
  },
  updatePropertyYearAcquired: function updatePropertyYearAcquired(state, payload) {
    state.application.data.propertyYearAcquired = payload;
  },
  updatePropertyZip: function updatePropertyZip(state, payload) {
    state.application.data.propertyZip = payload;
  },
  updateResult: function updateResult(state, payload) {
    state.application.data.result = payload;
  },
  updateSelfEmployed: function updateSelfEmployed(state, payload) {
    state.application.data.selfEmployed = payload;
  },
  updateSignUp: function updateSignUp(state, payload) {
    state.application.data.signUp = payload;
  },
  updateSsn: function updateSsn(state, payload) {
    state.application.data.ssn = payload;
  },
  updateState: function updateState(state, payload) {
    state.application.data.state = payload;
  },
  updateTaxes: function updateTaxes(state, payload) {
    state.application.data.taxes = payload;
  },
  updateTimeAtCurrentAddress: function updateTimeAtCurrentAddress(state, payload) {
    state.application.data.timeAtCurrentAddress = payload;
  },
  updateYearsLineOfWork: function updateYearsLineOfWork(state, payload) {
    state.application.data.yearsLineOfWork = payload;
  },
  updateYearsOfSchool: function updateYearsOfSchool(state, payload) {
    state.application.data.yearsOfSchool = payload;
  },
  updateZip: function updateZip(state, payload) {
    state.application.data.zip = payload;
  },
  // Real Estate
  updateRealEstate_0_address: function updateRealEstate_0_address(state, payload) {
    state.application.data.realEstate_0_address = payload;
  },
  updateRealEstate_0_grossRentalIncome: function updateRealEstate_0_grossRentalIncome(state, payload) {
    state.application.data.realEstate_0_grossRentalIncome = payload;
  },
  updateRealEstate_0_presentMarketValue: function updateRealEstate_0_presentMarketValue(state, payload) {
    state.application.data.realEstate_0_presentMarketValue = payload;
  },
  updateRealEstate_0_propertyType: function updateRealEstate_0_propertyType(state, payload) {
    state.application.data.realEstate_0_propertyType = payload;
  },
  updateRealEstate_0_totalLiens: function updateRealEstate_0_totalLiens(state, payload) {
    state.application.data.realEstate_0_totalLiens = payload;
  },
  updateRealEstate_0_zip: function updateRealEstate_0_zip(state, payload) {
    state.application.data.realEstate_0_zip = payload;
  },
  updateRealEstate_1_address: function updateRealEstate_1_address(state, payload) {
    state.application.data.realEstate_1_address = payload;
  },
  updateRealEstate_1_grossRentalIncome: function updateRealEstate_1_grossRentalIncome(state, payload) {
    state.application.data.realEstate_1_grossRentalIncome = payload;
  },
  updateRealEstate_1_presentMarketValue: function updateRealEstate_1_presentMarketValue(state, payload) {
    state.application.data.realEstate_1_presentMarketValue = payload;
  },
  updateRealEstate_1_propertyType: function updateRealEstate_1_propertyType(state, payload) {
    state.application.data.realEstate_1_propertyType = payload;
  },
  updateRealEstate_1_totalLiens: function updateRealEstate_1_totalLiens(state, payload) {
    state.application.data.realEstate_1_totalLiens = payload;
  },
  updateRealEstate_1_zip: function updateRealEstate_1_zip(state, payload) {
    state.application.data.realEstate_1_zip = payload;
  },
  updateRealEstate_2_address: function updateRealEstate_2_address(state, payload) {
    state.application.data.realEstate_2_address = payload;
  },
  updateRealEstate_2_grossRentalIncome: function updateRealEstate_2_grossRentalIncome(state, payload) {
    state.application.data.realEstate_2_grossRentalIncome = payload;
  },
  updateRealEstate_2_presentMarketValue: function updateRealEstate_2_presentMarketValue(state, payload) {
    state.application.data.realEstate_2_presentMarketValue = payload;
  },
  updateRealEstate_2_propertyType: function updateRealEstate_2_propertyType(state, payload) {
    state.application.data.realEstate_2_propertyType = payload;
  },
  updateRealEstate_2_totalLiens: function updateRealEstate_2_totalLiens(state, payload) {
    state.application.data.realEstate_2_totalLiens = payload;
  },
  updateRealEstate_2_zip: function updateRealEstate_2_zip(state, payload) {
    state.application.data.realEstate_2_zip = payload;
  }
};
exports.mutations = mutations;