<template>
  <div>
    <div v-if="error.leadCreate" class="alert alert-danger small">
      <p v-if="error.status">
        <strong class="text-danger">There was a problem submitting your form. Please try again later.</strong>
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
      :class="{ blur: loader }"
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
              type="text"
              name="firstName"
              class="form-control"
            >
            <label
              :class="{ hasvalue: firstName }"
              for="firstName"
            >
              {{ 'First Name' | titlecase }} <sup>*</sup>
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
              type="text"
              name="lastName"
              class="form-control"
            >
            <label
              :class="{ hasvalue: lastName }"
              for="lastName"
            >
              {{ 'Last Name' | titlecase }} <sup>*</sup>
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
              type="text"
              name="email"
              class="form-control"
            >
            <label
              :class="{ hasvalue: email }"
              for="email"
            >
              {{ 'Email Address' | titlecase }} <sup>*</sup>
            </label>
            <p
              v-if="errors.email && !email"
              class="error-inline"
            >
              Email is required
            </p>
            <p
              v-if="errors.email && email && !validEmail(email)"
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
              type="text"
              name="cellPhone"
              class="form-control"
            >
            <label
              :class="{ hasvalue: cellPhone }"
              for="cellPhone"
            >
              {{ 'Cell Phone' | titlecase }} <sup>*</sup>
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

          <div
            v-if="showComments"
            :class="{ error: errors.customerComment }"
            class="form-group col-12 col-lg-12"
          >
            <textarea
              ref="customerComment"
              v-model="customerComment"
              type="text"
              name="customerComment"
              class="form-control"
              rows="3"
            />
            <label
              :class="{ hasvalue: customerComment }"
              for="customerComment"
            >
              {{ 'Comments' | titlecase }}
            </label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-auto ml-auto">
          <p class="small form-text text-muted">
            * Required
          </p>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12">
          <button
            type="submit"
            name="submit"
            class="btn btn--submit btn-primary form--apply__submit mt-4"
          >
            {{ submitText | titlecase }}
          </button>
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
  props: {
    comments: Boolean,
    loader: Boolean,
    submitText: {
      type: String,
      default: 'Submit'
    }
  },
  data () {
    return {
      customerComment: null,
      error: {
        leadCreate: false,
        message: null,
        status: null,
        subject: null,
        showDetails: false
      },
      errors: {
        cellPhone: false,
        email: false,
        firstName: false,
        lastName: false
      },
      hasErrors: false,
      showComments: this.comments
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      applicationData: state => state.application.data,
      leadData: state => state.lead,
      loanProduct: state => state.application.loanProduct,
      searchResults: state => state.searchResultsReduced,
      searchResultDetails: state => state.searchResultDetails
    }),
    cellPhone: {
      get () {
        return this.$store.state.application.data.cellPhone
      },
      set (value) {
        this.$store.commit('updateCellPhone', value)
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
    // Lead Payload
    leadPayload () {
      // The Application Payload object
      const payload = {
        lead: {
          vendorLeadId: '',
          filterId: 'New Loan Lead',
          leadSource: 'New Loan Applicant Lead',
          leadDescription: 'Partial application submission',
          investor: this.loanProduct.investor || null,
          product: this.loanProduct.productName || null,
          productId: this.loanProduct.productId || null,
          result: this.searchResultDetails.length ? JSON.stringify(this.searchResultDetails) : null,
          customerComment: this.customerComment
        },
        borrowers: [],
        loan: {
          amount: this.$parseCurrency(this.applicationData.loanAmount) || 0,
          amortizationType: this.loanProduct.amortizationType || null,
          interestRate: this.loanProduct.rate || null,
          loanPurpose: this.applicationData.loanPurpose?.name || null
        },
        property: {
          address: this.applicationData.propertyAddress || null,
          propertyType: this.applicationData.propertyType?.name || null,
          propertyUse: this.applicationData.propertyUse?.name || null,
          value: this.$parseCurrency(this.applicationData.propertyValue) || null,
          zip: this.applicationData.propertyZip || null
        }
      }
      // Primary Borrower information
      const primaryBorrower = {
        firstName: this.applicationData.firstName,
        lastName: this.applicationData.lastName,
        email: this.applicationData.email,
        cellPhone: this.applicationData.cellPhone
      }
      payload.borrowers.push(primaryBorrower)

      // RETURN
      console.log('Payload:', payload)
      return payload
    }
  },
  // watch: {
  //   firstName (value) {
  //     this.firstName = value
  //     this.validateFirstName(value)
  //   },
  //   lastName (value) {
  //     this.lastName = value
  //     this.validateLastName(value)
  //   },
  //   email (value) {
  //     this.email = value
  //     this.validateEmail(value)
  //   },
  //   cellPhone (value) {
  //     this.cellPhone = value
  //     this.validateCellPhone(value)
  //   }
  // },
  methods: {
    errorShowDetails (e) {
      e.preventDefault()
      this.error.showDetails = !this.error.showDetails
    },
    formHasErrors () {
      // (re)Set defaults
      let hasErrors = false
      this.error.leadCreate = false
      this.error.message = null
      this.error.status = null
      this.error.subject = null
      this.error.showDetails = false
      // Check validity
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
      this.$emit('leadCreateStart')
      // Error checking
      const hasErrors = this.formHasErrors()
      // If no errors
      if (!hasErrors) {
        // console.log('Application Payload:\n', this.leadPayload)
        const data = await authenticate() // eslint-disable-line no-unused-vars
          .then((auth) => {
            return leadCreate(auth, this.leadPayload)
              .then((res) => {
                this.$emit('leadCreateSuccess', res)
                console.log('Lead Create Result:\n', res)
                return res
              })
              .catch((err) => {
                this.$emit('leadCreateError')
                // throw err
                this.error.leadCreate = true
                this.error.status = err.response?.status || false
                this.error.message = err.response?.data?.description || err
                this.error.subject = err.response?.data?.subject || null
              })
          })
          .catch((err) => {
            this.$emit('leadCreateError')
            // throw err
            alert(err.response.data.subject + '\n\n' + err.response.data.description)
          })
        this.$store.commit('setLeadResults', data)
      } else {
        this.scrollToRoot()
      }
      this.$emit('leadCreateEnd')
    },
    scrollToRoot () {
      const el = this.$el
      console.log('EL', el)
      if (el) {
        window.requestAnimationFrame(this.scrollToRoot)
        el.scrollIntoView()
      }
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
