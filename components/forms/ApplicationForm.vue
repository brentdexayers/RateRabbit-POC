<template>
  <div>
    <form
      id="application-form"
      @submit.prevent="handleSubmit"
      action="/apply"
      method="POST"
      class="form form--apply"
    >
      <!-- <h3 class="form--apply__header">
        Start the loan application process
      </h3> -->
      <div v-if="formErrors.length">
        <p class="text-danger">
          Please fix the following errors:
        </p>
        <ul class="text-danger">
          <li v-for="(error, index) in formErrors" :key="index">
            {{ error.error }}
          </li>
        </ul>
      </div>

      <div id="property_information" class="section">
        <h2 class="form--section_header">
          Property Information
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: propetyAddress }"
              for="propetyAddress"
            >
              {{ 'Property Address' | titlecase }}
            </label>
            <input
              v-model="propetyAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propetyAddress"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: propertyZip }"
              for="propertyZip"
            >
              {{ 'Zip Code' | titlecase }}
            </label>
            <input
              v-model="propertyZip"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyZip"
              class="form-control"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: propertyNumUnits }"
              for="propertyNumUnits"
            >
              {{ 'Number of Units' | titlecase }}
            </label>
            <input
              v-model="propertyNumUnits"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyNumUnits"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: propertyYearAcquired }"
              for="propertyYearAcquired"
            >
              {{ 'Year Acquired' | titlecase }}
            </label>
            <input
              v-model="propertyYearAcquired"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyYearAcquired"
              class="form-control"
            >
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Borrower Information
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerFirstName }"
              for="borrowerFirstName"
            >
              {{ 'First Name' | titlecase }}
            </label>
            <input
              v-model="borrowerFirstName"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerFirstName"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerLastName }"
              for="borrowerLastName"
            >
              {{ 'Last Name' | titlecase }}
            </label>
            <input
              v-model="borrowerLastName"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerLastName"
              class="form-control"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerSsn }"
              for="borrowerSsn"
            >
              {{ 'Social Security Number' | titlecase }}
            </label>
            <input
              v-model="borrowerSsn"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerSsn"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerHomePhone }"
              for="borrowerHomePhone"
            >
              {{ 'Home Phone' | titlecase }}
            </label>
            <input
              v-model="borrowerHomePhone"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerHomePhone"
              class="form-control"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerDob }"
              for="borrowerDob"
            >
              {{ 'DOB (mm/dd/yyyy)' }}
            </label>
            <input
              v-model="borrowerDob"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerDob"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerYrsSchool }"
              for="borrowerYrsSchool"
            >
              {{ 'Years School' | titlecase }}
            </label>
            <input
              v-model="borrowerYrsSchool"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerYrsSchool"
              class="form-control"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <label
              :class="{ hasvalue: borrowerMaritalStatus }"
              for="borrowerMaritalStatus"
            >
              {{ 'Marital Status' }}
            </label>
            <input
              v-model="borrowerMaritalStatus"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerMaritalStatus"
              class="form-control"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <label
              :class="{ hasvalue: borrowerPresentAddress }"
              for="borrowerPresentAddress"
            >
              {{ 'Present Address' }}
            </label>
            <input
              v-model="borrowerPresentAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerPresentAddress"
              class="form-control"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <label
              :class="{ hasvalue: borrowerMailingAddress }"
              for="borrowerMailingAddress"
            >
              {{ 'Mailing Address' }}
            </label>
            <input
              v-model="borrowerMailingAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerMailingAddress"
              class="form-control"
            >
          </div>
        </div>

        <h3>Employer</h3>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <label
              :class="{ hasvalue: borrowerEmployerName }"
              for="borrowerEmployerName"
            >
              {{ 'Employer Name' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerName"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerName"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-8">
            <label
              :class="{ hasvalue: borrowerEmployerAddress }"
              for="borrowerEmployerAddress"
            >
              {{ 'Employer Address' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerAddress"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: borrowerEmployerZip }"
              for="borrowerEmployerZip"
            >
              {{ 'Employer Zip Code' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerZip"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerZip"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: borrowerSelfEmployed }"
              for="borrowerSelfEmployed"
            >
              {{ 'Self Employed' | titlecase }}
            </label>
            <input
              v-model="borrowerSelfEmployed"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerSelfEmployed"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: borrowerEmployerYearsAtJob }"
              for="borrowerEmployerYearsAtJob"
            >
              {{ 'Years at this job' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerYearsAtJob"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerYearsAtJob"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: borrowerEmployerYearsInLineOfWork }"
              for="borrowerEmployerYearsInLineOfWork"
            >
              {{ 'Years in line of work' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerYearsInLineOfWork"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerYearsInLineOfWork"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-8">
            <label
              :class="{ hasvalue: borrowerEmployerJobTitle }"
              for="borrowerEmployerJobTitle"
            >
              {{ 'Position / Job Title' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerJobTitle"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerJobTitle"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: borrowerEmployerPhone }"
              for="borrowerEmployerPhone"
            >
              {{ 'Employer Address' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerPhone"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerPhone"
              class="form-control"
            >
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Monthly Income and Housing Expenses
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerEmployerIncome }"
              for="borrowerEmployerIncome"
            >
              {{ 'Base Income *' | titlecase }}
            </label>
            <input
              v-model="borrowerEmployerIncome"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerEmployerIncome"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: borrowerHoaDues }"
              for="borrowerHoaDues"
            >
              {{ 'Homeowner Association Dues' | titlecase }}
            </label>
            <input
              v-model="borrowerHoaDues"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="borrowerHoaDues"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-12">
            <p class="small">
              * Self employed Borrowers may  be required to provide additional documentation such as tax returns and financial statements.
            </p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Assets and Liabilities
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-8">
            <label
              :class="{ hasvalue: realEstateAddress }"
              for="realEstateAddress"
            >
              {{ 'Property Address' | titlecase }}
            </label>
            <input
              v-model="realEstateAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="realEstateAddress"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: realEstateZip }"
              for="realEstateZip"
            >
              {{ 'Property Zip Code' | titlecase }}
            </label>
            <input
              v-model="realEstateZip"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="realEstateZip"
              class="form-control"
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: realEstatePropertyType }"
              for="realEstatePropertyType"
            >
              {{ 'Property Type' | titlecase }}
            </label>
            <input
              v-model="realEstatePropertyType"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="realEstatePropertyType"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: realEstatePresentMarketValue }"
              for="realEstatePresentMarketValue"
            >
              {{ 'Present Market Value' | titlecase }}
            </label>
            <input
              v-model="realEstatePresentMarketValue"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="realEstatePresentMarketValue"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: realEstateTotalLiens }"
              for="realEstateTotalLiens"
            >
              {{ 'Amount of Mortgages & Liens' | titlecase }}
            </label>
            <input
              v-model="realEstateTotalLiens"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="realEstateTotalLiens"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: realEstateGrossRentalIncome }"
              for="realEstateGrossRentalIncome"
            >
              {{ 'Gross Rental Income' | titlecase }}
            </label>
            <input
              v-model="realEstateGrossRentalIncome"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="realEstateGrossRentalIncome"
              class="form-control"
            >
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12">
          <button
            type="submit"
            name="submit"
            class="btn btn-primary form--apply__submit mt-4"
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
  applicationCreate
} from '~/services/api'

export default {
  data () {
    return {
      formErrors: [],
      step: 0
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      applicationData: state => state.application.data,
      loanProduct: state => state.application.loanProduct
    }),
    borrowerFirstName: {
      get () {
        return this.$store.state.application.data.borrowerFirstName
      },
      set (value) {
        this.$store.commit('updateFirstName', value)
      }
    },
    borrowerLastName: {
      get () {
        return this.$store.state.application.data.borrowerLastName
      },
      set (value) {
        this.$store.commit('updateLastName', value)
      }
    },
    borrowerHomePhone: {
      get () {
        return this.$store.state.application.data.borrowerHomePhone
      },
      set (value) {
        this.$store.commit('updateHomePhone', value)
      }
    },
    email: {
      get () {
        return this.$store.state.application.data.email
      },
      set (value) {
        this.$store.commit('updateEmail', value)
      }
    }
  },
  methods: {
    focusClassAdd (event) {
      const self = event.target
      self.previousElementSibling.classList.add('focused')
    },
    focusClassRemove (event) {
      const self = event.target
      self.previousElementSibling.classList.remove('focused')
    },
    formValidate () {
      this.$emit('applicationValidateStart')
      this.formErrors = []
      if (!this.$store.state.application.data.borrowerFirstName) {
        this.formErrors.push({ field: 'borrowerFirstName', error: 'First Name is required' })
      }
      if (!this.$store.state.application.data.borrowerLastName) {
        this.formErrors.push({ field: 'borrowerLastName', error: 'Last Name is required' })
      }
      if (!this.$store.state.application.data.borrowerHomePhone) {
        this.formErrors.push({ field: 'borrowerHomePhone', error: 'Phone is required' })
      }
      if (!this.$store.state.application.data.email) {
        this.formErrors.push({ field: 'email', error: 'Email is required' })
      }
      if (this.formErrors.length) {
        this.$emit('applicationHasErrors', this.formErrors)
        return false
      }
      this.$emit('applicationValid')
      return true
    },
    async handleSubmit () {
      this.$emit('applicationSubmitStart')
      const valid = this.formValidate()
      if (valid) {
        const applicationPayload = {
          borrowers: [
            {
              address: '123 Main St.',
              borrowerType: 'Primary',
              businessPhone: '(208) 555-1212',
              cellPhone: '(208) 555-1212',
              creditRating: this.applicationData.creditRating.name,
              dob: '02/10/1970',
              email: this.applicationData.email,
              employer: {
                address: '555 W Elm St.',
                employerName: 'ACME Mechanical',
                jobTitle: 'Head Engineer',
                selfEmployed: 0,
                yearsAtJob: 10,
                zip: 83702
              },
              expense: [
                {
                  expenseType: 'Present',
                  firstMortgage: 1800,
                  hazardInsurance: 700,
                  hoaDues: 250,
                  realEstateTaxes: 3500
                },
                {
                  expenseType: 'Proposed',
                  hoaDues: 350
                }
              ],
              fax: '(208) 555-1212',
              firstName: this.applicationData.borrowerFirstName,
              grossIncome: 85000.00,
              homePhone: this.applicationData.borrowerHomePhone,
              lastName: this.applicationData.borrowerLastName,
              mailingAddress: '123 Main St.',
              mailingZip: 83702,
              maritalStatus: 'Married',
              ssn: '444-22-7777',
              status: 'Own',
              yearsAtAddress: 10,
              yearsLineOfWork: 22,
              yearsOfSchool: 20,
              zip: 83702
            }
          ],
          donationAmount: 0.00,
          loan: {
            amount: this.$parseCurrency(this.applicationData.loanAmount),
            cashOutAmount: this.$parseCurrency(this.applicationData.loanCashOutAmount),
            loanDocType: 'Full Doc',
            loanImpounds: 1,
            loanInterestOnly: this.applicationData.loanInterestOnly,
            loanPurpose: this.applicationData.loanPurpose.name,
            loanRefinanceType: 'No Cash Out'
          },
          productId: this.loanProduct.productId,
          promotionCode: this.applicationData.promotionCode,
          property: {
            numberUnits: 1,
            address: '555 Main St.',
            purchasePrice: this.$parseCurrency(this.applicationData.propertyValue),
            propertyType: this.applicationData.propertyType.name,
            propertyUse: this.applicationData.propertyUse.name,
            value: this.$parseCurrency(this.applicationData.propertyValue),
            yearAcquired: 2017,
            zip: this.applicationData.propertyZip
          },
          realEstate: [
            {
              address: '2020 W. Elm St.',
              propertyStatus: 'Sold',
              propertyType: 'Single Family Home',
              presentMarketValue: 600000.00,
              totalLeans: 300000.00,
              grossRentalIncome: 24500.00,
              mortgagePayments: 18000.00,
              taxesAndInsurance: 2500.00,
              netRentalIncome: 4000.00,
              zip: 83702
            },
            {
              address: '100 N. Maple St.',
              propertyStatus: 'Rental',
              propertyType: 'Single Family Home',
              presentMarketValue: 300000.00,
              totalLeans: 100000.00,
              grossRentalIncome: 12000.00,
              mortgagePayments: 6000.00,
              taxesAndInsurance: 400.00,
              netRentalIncome: 4000.00,
              zip: 83702
            }
          ],
          result: 'Really long JSON string here -- result from loan search'
        }
        if (applicationPayload.coBorrower) { // if COBORROWER
          applicationPayload.coBorrowerAddress = ''
          applicationPayload.coBorrowerBusinessPhone = ''
          applicationPayload.coBorrowerCellPhone = ''
          applicationPayload.coBorrowerCity = ''
          applicationPayload.coBorrowerCurrentHazardInsurance = ''
          applicationPayload.coBorrowerCurrentHoaFees = ''
          applicationPayload.coBorrowerCurrentMortgagePayment = ''
          applicationPayload.coBorrowerCurrentPropertyTaxes = ''
          applicationPayload.coBorrowerEmail = ''
          applicationPayload.coBorrowerEmployedHowLong = ''
          applicationPayload.coBorrowerEmployerAddress = ''
          applicationPayload.coBorrowerEmployerCity = ''
          applicationPayload.coBorrowerEmployerName = ''
          applicationPayload.coBorrowerEmployerState = ''
          applicationPayload.coBorrowerEmployerZip = ''
          applicationPayload.coBorrowerFax = ''
          applicationPayload.coBorrowerFirstName = ''
          applicationPayload.coBorrowerGrossIncome = ''
          applicationPayload.coBorrowerHomePhone = ''
          applicationPayload.coBorrowerJobTitle = ''
          applicationPayload.coBorrowerLastName = ''
          applicationPayload.coBorrowerMaritalStatus = ''
          applicationPayload.coBorrowerSelfEmployed = ''
          applicationPayload.coBorrowerSsn = ''
          applicationPayload.coBorrowerState = ''
          applicationPayload.coBorrowerTimeAtCurrentAddress = ''
          applicationPayload.coBorrowerZip = ''
        }
        const employer = false
        if (employer) { // if EMPLOYER
          applicationPayload.employedHowLong = ''
          applicationPayload.employerAddress = ''
          applicationPayload.employerCity = ''
          applicationPayload.employerName = ''
          applicationPayload.employerState = ''
          applicationPayload.employerZip = ''
        }
        const currentaddress = false
        if (currentaddress) { // if CURRENTADDRESS
          applicationPayload.currentAddress = ''
          applicationPayload.currentCity = ''
          applicationPayload.currentHazardInsurance = ''
          applicationPayload.currentHoaFees = ''
          applicationPayload.currentMortgagePayment = ''
          applicationPayload.currentPropertyTaxes = ''
          applicationPayload.currentState = this.applicationData.state.name
          applicationPayload.currentZip = this.applicationData.currentZip
        }
        const data = await authenticate() // eslint-disable-line no-unused-vars
          .then((auth) => {
            return applicationCreate(auth, applicationPayload)
              .then((res) => {
                this.$emit('applicationSubmitSuccess', res)
                return res
              })
              .catch((err) => {
                this.$emit('applicationSubmitError')
                throw err
              })
          })
          .catch((err) => {
            this.$emit('applicationSubmitError')
            throw err
          })
        this.$store.commit('setApplicationResults', data)
      }
      this.$emit('applicationSubmitEnd')
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
  &__submit {
    @include media-breakpoint-down('sm') {
      font-size: $font-size-lg;
      margin-top: #{$spacer * 1.625};
      padding-bottom: #{$spacer * 0.6875};
      padding-top: #{$spacer * 0.6875};
      width: 100%;
    }
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
}
</style>
