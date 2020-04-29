<template>
  <div>
    <form
      id="application-form"
      @submit.prevent="handleSubmit"
      action="/apply"
      method="POST"
      class="form form--apply"
    >
      <h3 class="form--apply__header">
        Start the loan application process
      </h3>
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
      <div class="row">
        <div class="form-group col-12 col-lg-6">
          <label
            :class="{ hasvalue: firstName }"
            for="firstName"
          >
            {{ 'First Name' | titlecase }}
          </label>
          <input
            v-model="firstName"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="firstName"
            class="form-control"
          >
        </div>
        <div class="form-group col-12 col-lg-6">
          <label
            :class="{ hasvalue: lastName }"
            for="lastName"
          >
            {{ 'Last Name' | titlecase }}
          </label>
          <input
            v-model="lastName"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="lastName"
            class="form-control"
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12 col-lg-6">
          <label
            :class="{ hasvalue: homePhone }"
            for="homePhone"
          >
            {{ 'Phone Number' | titlecase }}
          </label>
          <input
            v-model="homePhone"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="homePhone"
            class="form-control"
          >
        </div>
        <div class="form-group col-12 col-lg-6">
          <label
            :class="{ hasvalue: email }"
            for="email"
          >
            {{ 'Email Address' | titlecase }}
          </label>
          <input
            v-model="email"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="email"
            class="form-control"
          >
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
      formErrors: []
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      applicationData: state => state.application.data,
      loanProduct: state => state.application.loanProduct
    }),
    firstName: {
      get () {
        return this.$store.state.application.data.firstName
      },
      set (value) {
        this.$store.commit('updateFirstName', value)
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
    homePhone: {
      get () {
        return this.$store.state.application.data.homePhone
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
      if (!this.$store.state.application.data.firstName) {
        this.formErrors.push({ field: 'firstName', error: 'First Name is required' })
      }
      if (!this.$store.state.application.data.lastName) {
        this.formErrors.push({ field: 'lastName', error: 'Last Name is required' })
      }
      if (!this.$store.state.application.data.homePhone) {
        this.formErrors.push({ field: 'homePhone', error: 'Phone is required' })
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
          // businessPhone: '',
          // cellPhone: '',
          coBorrower: 0,
          // county: '',
          creditRating: this.applicationData.creditRating.name,
          // donationAmount: '',
          email: this.applicationData.email,
          // fax: '',
          firstName: this.applicationData.firstName,
          // grossIncome: '',
          homePhone: this.applicationData.homePhone,
          // jobTitle: '',
          lastName: this.applicationData.lastName,
          loanAmount: this.$parseCurrency(this.applicationData.loanAmount),
          loanCashOutAmount: this.$parseCurrency(this.applicationData.loanCashOutAmount),
          // loanDocType: '',
          loanImpounds: 0,
          loanInterestOnly: this.applicationData.loanInterestOnly,
          loanPurpose: this.applicationData.loanPurpose.name,
          // loanRefinanceType: '',
          // maritalStatus: '',
          productId: this.loanProduct.productId,
          promotionCode: this.applicationData.promotionCode,
          // propertyAddress: '',
          // propertyCity: '',
          propertyPurchasePrice: '',
          propertyType: this.applicationData.propertyType.name,
          propertyUse: this.applicationData.propertyUse.name,
          propertyValue: this.$parseCurrency(this.applicationData.propertyValue),
          // propertyYearAcquired: '',
          propertyZip: this.applicationData.propertyZip,
          result: '',
          selfEmployed: 0, // eslint-disable-line comma-dangle
          // ssn: '',
          // state: this.applicationData.state.name,
          // timeAtCurrentAddress: '',
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
