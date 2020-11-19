<template>
  <div>
    <div v-if="error.leadCreate" class="alert alert-danger small">
      <p v-if="error.status !== 500">
        <strong class="text-danger">There was a problem creating your application. Please try again later.</strong>
      </p>
      <p v-if="error.status === 500">
        <strong class="text-danger">There was a problem with your application. Please check your application to ensure your data is accurate.</strong>
      </p>
      <div v-if="error.message">
        <p class="small text-right">
          <a
            @click="(event) => errorShowDetails(event)"
            href="#"
            class="link text-danger"
          >
            {{ error.showDetails ? 'Hide Details' : 'Show Details' }}
          </a>
        </p>
        <p v-if="error.showDetails">
          {{ error.message }}
        </p>
      </div>
    </div>

    <div v-if="hasErrors" class="alert alert-danger small">
      <p>
        <strong class="text-danger">Please fix the form errros below</strong>
      </p>
    </div>

    <form
      id="lead-form"
      @submit.prevent="handleSubmit"
      action="/apply"
      method="POST"
      class="form form--lead"
    >
      <div class="section">
        <h2 class="form--section_header">
          Borrower Information
        </h2>
        <div class="row">
          <div
            :class="{ error: errors.firstName }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="firstName"
              @blur="validateFirstName(firstName)"
              type="text"
              name="firstName"
              class="form-control"
            >
            <label
              :class="{ hasvalue: firstName }"
              for="firstName"
            >
              {{ 'First Name' | titlecase }}
            </label>
            <p
              v-if="errors.firstName"
              class="error-inline"
            >
              First name is required
            </p>
          </div>

          <div
            :class="{ error: errors.lastName }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="lastName"
              @blur="validateLastName(lastName)"
              type="text"
              name="lastName"
              class="form-control"
            >
            <label
              :class="{ hasvalue: lastName }"
              for="lastName"
            >
              {{ 'Last Name' | titlecase }}
            </label>
            <p
              v-if="errors.lastName"
              class="error-inline"
            >
              Last name is required
            </p>
          </div>

          <div
            :class="{ error: errors.email }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="email"
              @blur="validateEmail(email)"
              type="email"
              name="email"
              class="form-control"
            >
            <label
              :class="{ hasvalue: email }"
              for="email"
            >
              {{ 'Email Address' | titlecase }}
            </label>
            <p
              v-if="errors.email && !email"
              class="error-inline"
            >
              Email is required
            </p>
            <p
              v-if="errors.email && !validEmail(email)"
              class="error-inline"
            >
              Email invalid
            </p>
          </div>

          <div
            :class="{ error: errors.cellPhone }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="cellPhone"
              v-mask="'(###) ###-####'"
              @blur="validateCellPhone(cellPhone)"
              type="text"
              name="cellPhone"
              class="form-control"
            >
            <label
              :class="{ hasvalue: cellPhone }"
              for="cellPhone"
            >
              {{ 'Cell Phone' | titlecase }}
            </label>
            <p
              v-if="errors.cellPhone && !cellPhone"
              class="error-inline"
            >
              Cell phone is required
            </p>
            <p
              v-if="errors.cellPhone && cellPhone && !validPhone(cellPhone)"
              class="error-inline"
            >
              Please enter a valid phone number
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12">
          <button
            type="submit"
            name="submit"
            class="btn btn--submit btn-primary form--apply__submit mt-4"
          >
            {{ 'Submit' | titlecase }}
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-5">
          <p class="form--apply__footer">
            Your information is private, and will be submitted over secure connections.
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import {
  authenticate,
  leadCreate
} from '~/services/api'

export default {
  data () {
    return {
      assetsAndLiabilities: false,
      assetsAndLiabilities_1: false,
      assetsAndLiabilities_2: false,
      copyPropertyAddress: {
        primary: false,
        coBorrower: false
      },
      error: {
        message: null,
        status: null,
        subject: null,
        showDetails: false
      },
      errors: {
        address: false,
        leadCreate: false,
        assetsAndLiabilities: false,
        businessPhone: false,
        cellPhone: false,
        coBorrowerAddress: false,
        coBorrowerBusinessPhone: false,
        coBorrowerCellPhone: false,
        coBorrowerDob: false,
        coBorrowerEmail: false,
        coBorrowerEmployerName: false,
        coBorrowerFirstName: false,
        coBorrowerLastName: false,
        coBorrowerMailingAddress: false,
        coBorrowerSsn: false,
        dob: false,
        email: false,
        employerName: false,
        firstName: false,
        lastName: false,
        mailingAddress: false,
        loanAmount: false,
        propertyAddress: false,
        propertyZip: false,
        realEstate_0_address: false,
        realEstate_0_zip: false,
        realEstate_1_address: false,
        realEstate_1_zip: false,
        realEstate_2_address: false,
        realEstate_2_zip: false,
        result: false,
        ssn: false
      },
      hasErrors: false,
      hasCoBorrower: false,
      step: 0,
      modelConfig: {
        type: 'string',
        mask: 'DD/MM/YYYY' // Uses 'iso' if missing
      }
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      applicationData: state => state.application.data,
      loanProduct: state => state.application.loanProduct,
      maritalStatusOptions: state => state.form.options.maritalStatusOptions,
      productId: state => state.application.loanProduct.productId,
      propertyTypeOptions: state => state.form.options.propertyTypeOptions,
      propertyUseOptions: state => state.form.options.propertyUseOptions,
      searchResults: state => state.searchResultsReduced,
      searchResultDetails: state => state.searchResultDetails
    }),
    address: {
      get () {
        return this.$store.state.application.data.address
      },
      set (value) {
        this.$store.commit('updateAddress', value)
      }
    },
    businessPhone: {
      get () {
        return this.$store.state.application.data.businessPhone
      },
      set (value) {
        this.$store.commit('updateBusinessPhone', value)
      }
    },
    cellPhone: {
      get () {
        return this.$store.state.application.data.cellPhone
      },
      set (value) {
        this.$store.commit('updateCellPhone', value)
      }
    },
    coBorrower: {
      get () {
        return this.$store.state.application.data.coBorrower
      },
      set (value) {
        this.$store.commit('updateCoBorrower', value)
      }
    },
    coBorrowerAddress: {
      get () {
        return this.$store.state.application.data.coBorrowerAddress
      },
      set (value) {
        this.$store.commit('updateCoBorrowerAddress', value)
      }
    },
    coBorrowerBusinessPhone: {
      get () {
        return this.$store.state.application.data.coBorrowerBusinessPhone
      },
      set (value) {
        this.$store.commit('updateCoBorrowerBusinessPhone', value)
      }
    },
    coBorrowerCellPhone: {
      get () {
        return this.$store.state.application.data.coBorrowerCellPhone
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCellPhone', value)
      }
    },
    coBorrowerCity: {
      get () {
        return this.$store.state.application.data.coBorrowerCity
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCity', value)
      }
    },
    coBorrowerCurrentHazardInsurance: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentHazardInsurance
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentHazardInsurance', value)
      }
    },
    coBorrowerCurrentHoaFees: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentHoaFees
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentHoaFees', value)
      }
    },
    coBorrowerCurrentMortgagePayment: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentMortgagePayment
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentMortgagePayment', value)
      }
    },
    coBorrowerCurrentPropertyTaxes: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentPropertyTaxes
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentPropertyTaxes', value)
      }
    },
    coBorrowerDob: {
      get () {
        return this.$store.state.application.data.coBorrowerDob
      },
      set (value) {
        this.$store.commit('updateCoBorrowerDob', value)
      }
    },
    coBorrowerEmail: {
      get () {
        return this.$store.state.application.data.coBorrowerEmail
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmail', value)
      }
    },
    coBorrowerEmployedHowLong: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployedHowLong
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployedHowLong', value)
      }
    },
    coBorrowerEmployerCity: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerCity
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerCity', value)
      }
    },
    coBorrowerEmployerName: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerName
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerName', value)
      }
    },
    coBorrowerEmployerState: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerState
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerState', value)
      }
    },
    coBorrowerFax: {
      get () {
        return this.$store.state.application.data.coBorrowerFax
      },
      set (value) {
        this.$store.commit('updateCoBorrowerFax', value)
      }
    },
    coBorrowerFirstName: {
      get () {
        return this.$store.state.application.data.coBorrowerFirstName
      },
      set (value) {
        this.$store.commit('updateCoBorrowerFirstName', value)
      }
    },
    coBorrowerGrossIncome: {
      get () {
        return this.$store.state.application.data.coBorrowerGrossIncome
      },
      set (value) {
        this.$store.commit('updateCoBorrowerGrossIncome', value)
      }
    },
    // coBorrowerHoaDues: {
    //   get () {
    //     return this.$store.state.application.data.coBorrowerHoaDues
    //   },
    //   set (value) {
    //     this.$store.commit('updateCoBorrowerHoaDues', value)
    //   }
    // },
    coBorrowerHomePhone: {
      get () {
        return this.$store.state.application.data.coBorrowerHomePhone
      },
      set (value) {
        this.$store.commit('updateCoBorrowerHomePhone', value)
      }
    },
    coBorrowerJobTitle: {
      get () {
        return this.$store.state.application.data.coBorrowerJobTitle
      },
      set (value) {
        this.$store.commit('updateCoBorrowerJobTitle', value)
      }
    },
    coBorrowerLastName: {
      get () {
        return this.$store.state.application.data.coBorrowerLastName
      },
      set (value) {
        this.$store.commit('updateCoBorrowerLastName', value)
      }
    },
    coBorrowerMaritalStatus: {
      get () {
        return this.$store.state.application.data.coBorrowerMaritalStatus
      },
      set (value) {
        this.$store.commit('updateCoBorrowerMaritalStatus', value)
      }
    },
    coBorrowerSelfEmployed: {
      get () {
        return this.$store.state.application.data.coBorrowerSelfEmployed
      },
      set (value) {
        this.$store.commit('updateCoBorrowerSelfEmployed', value)
      }
    },
    coBorrowerSsn: {
      get () {
        return this.$store.state.application.data.coBorrowerSsn
      },
      set (value) {
        this.$store.commit('updateCoBorrowerSsn', value)
      }
    },
    coBorrowerState: {
      get () {
        return this.$store.state.application.data.coBorrowerState
      },
      set (value) {
        this.$store.commit('updateCoBorrowerState', value)
      }
    },
    coBorrowerTimeAtCurrentAddress: {
      get () {
        return this.$store.state.application.data.coBorrowerTimeAtCurrentAddress
      },
      set (value) {
        this.$store.commit('updateCoBorrowerTimeAtCurrentAddress', value)
      }
    },
    coBorrowerYearsLineOfWork: {
      get () {
        return this.$store.state.application.data.coBorrowerYearsLineOfWork
      },
      set (value) {
        this.$store.commit('updateCoBorrowerYearsLineOfWork', value)
      }
    },
    coBorrowerYearsOfSchool: {
      get () {
        return this.$store.state.application.data.coBorrowerYearsOfSchool
      },
      set (value) {
        this.$store.commit('updateCoBorrowerYearsOfSchool', value)
      }
    },
    coBorrowerZip: {
      get () {
        return this.$store.state.application.data.coBorrowerZip
      },
      set (value) {
        this.$store.commit('updateCoBorrowerZip', value)
      }
    },
    county: {
      get () {
        return this.$store.state.application.data.county
      },
      set (value) {
        this.$store.commit('updateCounty', value)
      }
    },
    creditRating: {
      get () {
        return this.$store.state.application.data.creditRating
      },
      set (value) {
        this.$store.commit('updateCreditRating', value)
      }
    },
    currentAddress: {
      get () {
        return this.$store.state.application.data.currentAddress
      },
      set (value) {
        this.$store.commit('updateCurrentAddress', value)
      }
    },
    currentCity: {
      get () {
        return this.$store.state.application.data.currentCity
      },
      set (value) {
        this.$store.commit('updateCurrentCity', value)
      }
    },
    currentHazardInsurance: {
      get () {
        return this.$store.state.application.data.currentHazardInsurance
      },
      set (value) {
        this.$store.commit('updateCurrentHazardInsurance', value)
      }
    },
    currentHoaFees: {
      get () {
        return this.$store.state.application.data.currentHoaFees
      },
      set (value) {
        this.$store.commit('updateCurrentHoaFees', value)
      }
    },
    currentMortgagePayment: {
      get () {
        return this.$store.state.application.data.currentMortgagePayment
      },
      set (value) {
        this.$store.commit('updateCurrentMortgagePayment', value)
      }
    },
    currentPropertyTaxes: {
      get () {
        return this.$store.state.application.data.currentPropertyTaxes
      },
      set (value) {
        this.$store.commit('updateCurrentPropertyTaxes', value)
      }
    },
    currentState: {
      get () {
        return this.$store.state.application.data.currentState
      },
      set (value) {
        this.$store.commit('updateCurrentState', value)
      }
    },
    currentZip: {
      get () {
        return this.$store.state.application.data.currentZip
      },
      set (value) {
        this.$store.commit('updateCurrentZip', value)
      }
    },
    dob: {
      get () {
        return this.$store.state.application.data.dob
      },
      set (value) {
        this.$store.commit('updateDob', value)
      }
    },
    donationAmount: {
      get () {
        return this.$store.state.application.data.donationAmount
      },
      set (value) {
        this.$store.commit('updateDonationAmount', value)
      }
    },
    email: {
      get () {
        return this.$store.state.application.data.email
      },
      set (value) {
        this.$store.commit('updateEmail', value)
      }
    },
    employedHowLong: {
      get () {
        return this.$store.state.application.data.employedHowLong
      },
      set (value) {
        this.$store.commit('updateEmployedHowLong', value)
      }
    },
    employerCity: {
      get () {
        return this.$store.state.application.data.employerCity
      },
      set (value) {
        this.$store.commit('updateEmployerCity', value)
      }
    },
    employerName: {
      get () {
        return this.$store.state.application.data.employerName
      },
      set (value) {
        this.$store.commit('updateEmployerName', value)
      }
    },
    employerState: {
      get () {
        return this.$store.state.application.data.employerState
      },
      set (value) {
        this.$store.commit('updateEmployerState', value)
      }
    },
    fax: {
      get () {
        return this.$store.state.application.data.fax
      },
      set (value) {
        this.$store.commit('updateFax', value)
      }
    },
    firstName: {
      get () {
        return this.$store.state.application.data.firstName
      },
      set (value) {
        this.$store.commit('updateFirstName', value)
      }
    },
    grossIncome: {
      get () {
        return this.$store.state.application.data.grossIncome
      },
      set (value) {
        this.$store.commit('updateGrossIncome', value)
      }
    },
    hoaDues: {
      get () {
        return this.$store.state.application.data.hoaDues
      },
      set (value) {
        this.$store.commit('updateHoaDues', value)
      }
    },
    homePhone: {
      get () {
        return this.$store.state.application.data.homePhone
      },
      set (value) {
        this.$store.commit('updateHomePhone', value)
      }
    },
    jobTitle: {
      get () {
        return this.$store.state.application.data.jobTitle
      },
      set (value) {
        this.$store.commit('updateJobTitle', value)
      }
    },
    keepingLoc: {
      get () {
        return this.$store.state.application.data.keepingLoc
      },
      set (value) {
        this.$store.commit('updateKeepingLoc', value)
      }
    },
    lastName: {
      get () {
        return this.$store.state.application.data.lastName
      },
      set (value) {
        this.$store.commit('updateLastName', value)
      }
    },
    loanAmount: {
      get () {
        return this.$store.state.application.data.loanAmount
      },
      set (value) {
        this.$store.commit('updateLoanAmount', value)
      }
    },
    loanCashOutAmount: {
      get () {
        return this.$store.state.application.data.loanCashOutAmount
      },
      set (value) {
        this.$store.commit('updateLoanCashOutAmount', value)
      }
    },
    loanDocType: {
      get () {
        return this.$store.state.application.data.loanDocType
      },
      set (value) {
        this.$store.commit('updateLoanDocType', value)
      }
    },
    loanImpounds: {
      get () {
        return this.$store.state.application.data.loanImpounds
      },
      set (value) {
        this.$store.commit('updateLoanImpounds', value)
      }
    },
    loanInterestOnly: {
      get () {
        return this.$store.state.application.data.loanInterestOnly
      },
      set (value) {
        this.$store.commit('updateLoanInterestOnly', value)
      }
    },
    loanPurpose: {
      get () {
        return this.$store.state.application.data.loanPurpose
      },
      set (value) {
        this.$store.commit('updateLoanPurpose', value)
      }
    },
    loanRefinanceType: {
      get () {
        return this.$store.state.application.data.loanRefinanceType
      },
      set (value) {
        this.$store.commit('updateLoanRefinanceType', value)
      }
    },
    loc: {
      get () {
        return this.$store.state.application.data.loc
      },
      set (value) {
        this.$store.commit('updateLoc', value)
      }
    },
    locAfterFirst: {
      get () {
        return this.$store.state.application.data.locAfterFirst
      },
      set (value) {
        this.$store.commit('updatelocAfterFirst', value)
      }
    },
    locAmount: {
      get () {
        return this.$store.state.application.data.locAmount
      },
      set (value) {
        this.$store.commit('updateLocAmount', value)
      }
    },
    mailingAddress: {
      get () {
        return this.$store.state.application.data.mailingAddress
      },
      set (value) {
        this.$store.commit('updateMailingAddress', value)
      }
    },
    mailingZip: {
      get () {
        return this.$store.state.application.data.mailingZip
      },
      set (value) {
        this.$store.commit('updateMailingZip', value)
      }
    },
    maritalStatus: {
      get () {
        return this.$store.state.application.data.maritalStatus
      },
      set (value) {
        this.$store.commit('updateMaritalStatus', value)
      }
    },
    promotionCode: {
      get () {
        return this.$store.state.application.data.promotionCode
      },
      set (value) {
        this.$store.commit('updatePromotionCode', value)
      }
    },
    propertyAddress: {
      get () {
        return this.$store.state.application.data.propertyAddress
      },
      set (value) {
        this.$store.commit('updatePropertyAddress', value)
      }
    },
    propertyCity: {
      get () {
        return this.$store.state.application.data.propertyCity
      },
      set (value) {
        this.$store.commit('updatePropertyCity', value)
      }
    },
    propertyNumberOfUnits: {
      get () {
        return this.$store.state.application.data.propertyNumberOfUnits
      },
      set (value) {
        this.$store.commit('updatePropertyNumberOfUnits', value)
      }
    },
    propertyPurchasePrice: {
      get () {
        return this.$store.state.application.data.propertyPurchasePrice
      },
      set (value) {
        this.$store.commit('updatePropertyPurchasePrice', value)
      }
    },
    propertyType: {
      get () {
        return this.$store.state.application.data.propertyType
      },
      set (value) {
        this.$store.commit('updatePropertyType', value)
      }
    },
    propertyUse: {
      get () {
        return this.$store.state.application.data.propertyUse
      },
      set (value) {
        this.$store.commit('updatePropertyUse', value)
      }
    },
    propertyValue: {
      get () {
        return this.$store.state.application.data.propertyValue
      },
      set (value) {
        this.$store.commit('updatePropertyValue', value)
      }
    },
    propertyYearAcquired: {
      get () {
        return this.$store.state.application.data.propertyYearAcquired
      },
      set (value) {
        this.$store.commit('updatePropertyYearAcquired', value)
      }
    },
    propertyZip: {
      get () {
        return this.$store.state.application.data.propertyZip
      },
      set (value) {
        this.$store.commit('updatePropertyZip', value)
      }
    },
    realEstate_0_address: {
      get () {
        return this.$store.state.application.data.realEstate_0_address
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_address', value)
      }
    },
    realEstate_0_grossRentalIncome: {
      get () {
        return this.$store.state.application.data.realEstate_0_grossRentalIncome
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_grossRentalIncome', value)
      }
    },
    realEstate_0_presentMarketValue: {
      get () {
        return this.$store.state.application.data.realEstate_0_presentMarketValue
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_presentMarketValue', value)
      }
    },
    realEstate_0_propertyType: {
      get () {
        return this.$store.state.application.data.realEstate_0_propertyType
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_propertyType', value)
      }
    },
    realEstate_0_totalLiens: {
      get () {
        return this.$store.state.application.data.realEstate_0_totalLiens
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_totalLiens', value)
      }
    },
    realEstate_0_zip: {
      get () {
        return this.$store.state.application.data.realEstate_0_zip
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_zip', value)
      }
    },
    realEstate_1_address: {
      get () {
        return this.$store.state.application.data.realEstate_1_address
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_address', value)
      }
    },
    realEstate_1_grossRentalIncome: {
      get () {
        return this.$store.state.application.data.realEstate_1_grossRentalIncome
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_grossRentalIncome', value)
      }
    },
    realEstate_1_presentMarketValue: {
      get () {
        return this.$store.state.application.data.realEstate_1_presentMarketValue
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_presentMarketValue', value)
      }
    },
    realEstate_1_propertyType: {
      get () {
        return this.$store.state.application.data.realEstate_1_propertyType
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_propertyType', value)
      }
    },
    realEstate_1_totalLiens: {
      get () {
        return this.$store.state.application.data.realEstate_1_totalLiens
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_totalLiens', value)
      }
    },
    realEstate_1_zip: {
      get () {
        return this.$store.state.application.data.realEstate_1_zip
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_zip', value)
      }
    },
    realEstate_2_address: {
      get () {
        return this.$store.state.application.data.realEstate_2_address
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_address', value)
      }
    },
    realEstate_2_grossRentalIncome: {
      get () {
        return this.$store.state.application.data.realEstate_2_grossRentalIncome
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_grossRentalIncome', value)
      }
    },
    realEstate_2_presentMarketValue: {
      get () {
        return this.$store.state.application.data.realEstate_2_presentMarketValue
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_presentMarketValue', value)
      }
    },
    realEstate_2_propertyType: {
      get () {
        return this.$store.state.application.data.realEstate_2_propertyType
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_propertyType', value)
      }
    },
    realEstate_2_totalLiens: {
      get () {
        return this.$store.state.application.data.realEstate_2_totalLiens
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_totalLiens', value)
      }
    },
    realEstate_2_zip: {
      get () {
        return this.$store.state.application.data.realEstate_2_zip
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_zip', value)
      }
    },
    result: {
      get () {
        return this.$store.state.application.data.result
      },
      set (value) {
        this.$store.commit('updateResult', value)
      }
    },
    selfEmployed: {
      get () {
        return this.$store.state.application.data.selfEmployed
      },
      set (value) {
        this.$store.commit('updateSelfEmployed', value)
      }
    },
    ssn: {
      get () {
        return this.$store.state.application.data.ssn
      },
      set (value) {
        this.$store.commit('updateSsn', value)
      }
    },
    state: {
      get () {
        return this.$store.state.application.data.state
      },
      set (value) {
        this.$store.commit('updateState', value)
      }
    },
    timeAtCurrentAddress: {
      get () {
        return this.$store.state.application.data.timeAtCurrentAddress
      },
      set (value) {
        this.$store.commit('updateTimeAtCurrentAddress', value)
      }
    },
    yearsLineOfWork: {
      get () {
        return this.$store.state.application.data.yearsLineOfWork
      },
      set (value) {
        this.$store.commit('updateYearsLineOfWork', value)
      }
    },
    yearsOfSchool: {
      get () {
        return this.$store.state.application.data.yearsOfSchool
      },
      set (value) {
        this.$store.commit('updateYearsOfSchool', value)
      }
    },
    zip: {
      get () {
        return this.$store.state.application.data.zip
      },
      set (value) {
        this.$store.commit('updateZip', value)
      }
    },
    // Application Payload
    leadPayload () {
      // The Application Payload object
      const payload = {
        borrowers: [],
        donationAmount: 0.00,
        loan: {
          amount: this.$parseCurrency(this.applicationData.loanAmount),
          cashOutAmount: this.$parseCurrency(this.applicationData.loanCashOutAmount),
          interestRate: this.loanProduct.rate,
          keepingLoc: this.applicationData.keepingLoc ? 1 : 0,
          // loanDocType: 'Full Doc',
          // loanImpounds: 1,
          loanInterestOnly: this.applicationData.loanInterestOnly ? 1 : 0,
          loanPurpose: this.applicationData.loanPurpose?.name,
          loanRefinanceType: this.applicationData.loanRefinanceType, // this.getLoanRefinanceType(),
          loc: this.applicationData.loc ? 1 : 0,
          locAfterFirst: this.applicationData.locAfterFirst ? 1 : 0,
          locAmount: this.$parseCurrency(this.applicationData.locAmount)
        },
        productId: this.productId,
        promotionCode: this.applicationData.promotionCode,
        property: {
          numberUnits: Number(this.applicationData.propertyNumberOfUnits),
          address: this.applicationData.propertyAddress,
          purchasePrice: this.$parseCurrency(this.applicationData.propertyValue),
          propertyType: this.applicationData.propertyType?.name,
          propertyUse: this.applicationData.propertyUse?.name,
          value: this.$parseCurrency(this.applicationData.propertyValue),
          yearAcquired: Number(this.applicationData.propertyYearAcquired),
          zip: this.applicationData.propertyZip
        },
        // realEstate: [], // Moved this to conditional below
        result: JSON.stringify({
          searchResultDetails: this.searchResultDetails
        })
      }
      // Primary Borrower information
      const primaryBorrower = {
        address: this.applicationData.address, // Required if `zip`
        borrowerType: 'Primary', // Required
        businessPhone: this.applicationData.businessPhone,
        cellPhone: this.applicationData.cellPhone,
        creditRating: this.applicationData.creditRating?.name,
        dob: this.applicationData.dob ? this.$moment(this.applicationData.dob).format('YYYY-MM-DD') : null,
        email: this.applicationData.email, // Required

        fax: this.applicationData.fax,
        firstName: this.applicationData.firstName, // Required
        grossIncome: this.$parseCurrency(this.applicationData.grossIncome),
        // homePhone: this.applicationData.homePhone, // Required
        lastName: this.applicationData.lastName, // Required
        mailingAddress: this.applicationData.mailingAddress, // Required if `mailingZip`
        mailingZip: this.applicationData.mailingZip,
        maritalStatus: this.applicationData?.maritalStatus?.name,
        ssn: this.applicationData.ssn,
        // status: 'Own',
        yearsAtAddress: Number(this.applicationData.timeAtCurrentAddress),
        yearsLineOfWork: Number(this.applicationData.yearsLineOfWork),
        yearsOfSchool: Number(this.applicationData.yearsOfSchool),
        zip: this.applicationData.zip
      }
      if (this.applicationData.employerName || this.applicationData.jobTitle || this.applicationData.selfEmployed || this.applicationData.employedHowLong) {
        primaryBorrower.employer = {
          employerName: this.applicationData.employerName, // Required if `employer: {}`
          jobTitle: this.applicationData.jobTitle,
          selfEmployed: Number(this.applicationData.selfEmployed),
          yearsAtJob: Number(this.applicationData.employedHowLong)
          // zip: this.applicationData.employerZip // Required if `employer: {}`
        }
      }
      if (this.applicationData.hoaDues) {
        primaryBorrower.expenses = [{
          expenseType: 'Present', // Required if `expenses: {}`
          hoaDues: this.$parseCurrency(this.applicationData.hoaDues) || 0
        }]
      }
      payload.borrowers.push(primaryBorrower)

      // RETURN
      return payload
    }
  },
  watch: {
    // Borrower Information
    firstName (value) {
      this.firstName = value
      this.validateFirstName(value)
    },
    lastName (value) {
      this.lastName = value
      this.validateLastName(value)
    },
    email (value) {
      this.email = value
      this.validateEmail(value)
    },
    cellPhone (value) {
      this.cellPhone = value
      this.validateCellPhone(value)
    }
  },
  async fetch () {
    if (!this.auth?.expirationDate || this.$moment(this.auth.expirationDate).isBefore(this.$moment())) {
      console.log('Auth (pre):', this.auth)
      this.$store.commit('setAuth', await authenticate())
      console.log('Auth (post):', this.auth)
    }
  },
  methods: {
    formHasErrors () {
      // (re)Set defaults
      let hasErrors = false
      this.error.leadCreate = false
      this.error.message = null
      this.error.status = null
      this.error.subject = null
      this.error.showDetails = false
      // Check validity
      if (!this.loanPurpose) {
        hasErrors = true
        console.log('Form Errors: loanPurpose', '\n')
      }
      this.validateFirstName(this.applicationData.firstName)
      this.validateLastName(this.applicationData.lastName)
      this.validateEmail(this.applicationData.email)
      this.validateCellPhone(this.applicationData.cellPhone)
      if (!hasErrors) {
        hasErrors = Object.keys(this.errors).some(k => this.errors[k])
        if (hasErrors) {
          console.log('Form Error Obj: ', '\n', this.errors)
          this.hasErrors = true
        } else {
          this.hasErrors = false
        }
      }
      return hasErrors
    },
    async handleSubmit () {
      this.$emit('leadSubmitStart')
      // Error checking
      const hasErrors = this.formHasErrors()
      // If no errors
      if (!hasErrors) {
        // console.log('Application Payload:\n', this.leadPayload)
        const data = await authenticate() // eslint-disable-line no-unused-vars
          .then((auth) => {
            return leadCreate(auth, this.leadPayload)
              .then((res) => {
                this.$emit('leadSubmitSuccess', res)
                return res
              })
              .catch((err) => {
                this.$emit('leadSubmitError')
                // console.log('There was an error POSTing the leadPayload data\n', err)
                /* throw err */
                this.error.leadCreate = true
                this.error.status = err.response?.status || false
                this.error.message = err.response?.data?.description || err
                this.error.subject = err.response?.data?.subject || null
              })
          })
          .catch((err) => {
            this.$emit('applicationSubmitError')
            /* throw err */ alert(err.response.data.subject + '\n\n' + err.response.data.description)
          })
        this.$store.commit('setApplicationResults', data)
      } else {
        this.scrollToTop()
      }
      this.$emit('applicationSubmitEnd')
    },
    scrollToTop () {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
      document.body.focus()
    },
    // Regex Tests
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validPhone (phone) {
      const re = /^(\([0-9]{3}\))\s([0-9]{3})-([0-9]{4})$/
      return re.test(phone)
    },
    validSsn (ssn) {
      const re = /^([0-9]{3})-([0-9]{2})-([0-9]{4})$/
      return re.test(ssn)
    },
    // Validation Methods
    validateFirstName (value) {
      if (value) {
        this.errors.firstName = false
      } else {
        this.errors.firstName = true
      }
    },
    validateLastName (value) {
      if (value) {
        this.errors.lastName = false
      } else {
        this.errors.lastName = true
      }
    },
    validateEmail (value) {
      if (!this.validEmail(value)) {
        this.errors.email = true
      }
      if (value && this.validEmail(value)) {
        this.errors.email = false
      }
    },
    validateCellPhone (value) {
      if (!value) {
        this.errors.cellPhone = true
      }
      if (value && !this.validPhone(value)) {
        this.errors.cellPhone = true
      }
      if (value && this.validPhone(value)) {
        this.errors.cellPhone = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.form--apply {
  &__header {
    color: $primary;
    font-size: 21px;
    font-weight: bold;
    line-height: 32px;
  }
  &__footer {
    color: $input-placeholder-color;
    font-size: #{$font-size-sm * 0.75};
    font-style: italic;
    line-height: 1.333333333333333;
    @include media-breakpoint-down('sm') {
      padding: 0 #{$spacer * 2};
      text-align: center;
    }
  }
  .section {
    margin-bottom: 4rem;
  }
  h3 {
    margin-bottom: 1em;
  }
}
</style>
