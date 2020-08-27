<template>
  <div class="form-wrapper">
    <form
      id="search-rates-form"
      @submit.prevent="handleFormSubmit"
      :class="sidebar ? 'form--sidebar' : null"
      method="POST"
      class="form form--search-rates"
    >
      <div class="row">
        <div :class="{ error: errors.loanPurpose }" class="form-group col-12">
          <select
            v-model="loanPurpose"
            @blur="validateLoanPurpose(loanPurpose)"
            name="loanPurpose"
            class="custom-select"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              v-for="(option, index) in loanPurposeOptions"
              :key="index"
              :value="option"
              :selected="option == loanPurpose"
            >
              {{ option.name | titlecase }}
            </option>
          </select>
          <label
            :class="{ hasvalue: loanPurpose !== null, hasError: errors.loanPurpose }"
            for="loanPurpose"
          >
            {{ 'Loan Purpose' | titlecase }}
          </label>
          <p
            v-if="errors.loanPurpose && !loanPurpose"
            class="error-inline"
          >
            Loan purpose is required
          </p>
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.propertyValue }" class="form-group col-12">
          <input
            v-model="propertyValue"
            v-currency="{distractionFree: false}"
            @blur="validatePropertyValue(propertyValue)"
            type="text"
            name="propertyValue"
            class="form-control"
            placeholder=""
          >
          <label
            :class="{ hasvalue: propertyValue, hasError: errors.propertyValue }"
            for="propertyValue"
          >
            <span v-if="loanPurpose && loanPurpose.name === 'Purchase'">
              {{ 'Purchase price' | titlecase }}
            </span>
            <span v-else>
              {{ 'Property value' | titlecase }}
            </span>
          </label>
          <p v-if="errors.propertyValue && !propertyValue" class="error-inline">
            {{ loanPurpose && loanPurpose.name === 'Purchase' ? `Purchase price` : `Property value` }} is required
          </p>
          <p v-if="errors.propertyValue && propertyValue && propertyValue < loanAmount" class="error-inline">
            {{ loanPurpose && loanPurpose.name === 'Purchase' ? `Purchase price` : `Property value` }} must not be less than the loan amount
          </p>
        </div>
      </div>
      <div v-if="loanPurpose && loanPurpose.name === 'Refinance Cash Out'" class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: loanCashOutAmount }"
            for="loanCashOutAmount"
          >
            {{ 'Cash Out Amount' | titlecase }}
          </label>
          <input
            v-model="loanCashOutAmount"
            v-currency="{distractionFree: false}"
            type="text"
            name="loanCashOutAmount"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.loanAmount || (errors.ltv && loanAmount && propertyValue) }" class="form-group col-12">
          <input
            v-model="loanAmount"
            v-currency="{distractionFree: false}"
            @blur="validateLoanAmount(loanAmount)"
            type="text"
            name="loanAmount"
            class="form-control"
            placeholder=""
          >
          <label
            :class="{ hasvalue: loanAmount, hasError: errors.loanAmount }"
            for="loanAmount"
          >
            <span v-if="loanPurpose && loanPurpose.name === 'Refinance Cash Out'">
              {{ 'Total Loan Amount' }}
              <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
              <b-tooltip target="taxes-tooltip" triggers="hover">
                Current loan amount plus cash out request
              </b-tooltip>
            </span>
            <span v-else>
              {{ 'Loan Amount' | titlecase }}
            </span>
          </label>
          <p
            v-if="errors.loanAmount && !loanAmount"
            class="error-inline"
          >
            Loan amount is required
          </p>
          <p
            v-if="errors.loanAmount && this.$parseCurrency(loanAmount) > 0 && this.$parseCurrency(loanAmount) < minLoanAmount"
            class="error-inline"
          >
            Minimum Loan Amount is {{ minLoanAmount | currency }}
          </p>
          <p
            v-if="errors.ltv && ltv > 0.95"
            class="error-inline"
          >
            Loan amount cannot exceed 95% of the {{ loanPurpose && loanPurpose.name === 'Purchase' ? `purchase price` : `property value` }} (95% LTV)
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <div v-if="loanAmount && propertyValue" class="ltv wrapper wrapper--ltv form--search-rates__ltv">
            {{ ltv | percent(0) }} Loan-to-Value (LTV)
          </div>
        </div>
      </div>
      <div class="form--search-rates__spacer form-group form-group--spacer w-100" />
      <div v-if="loanPurpose && (loanPurpose.name === 'Refinance Cash Out' || loanPurpose.name === 'Refinance')" class="row">
        <div :class="{ error: errors.loc }" class="form-group col-12">
          <div class="custom-control custom-checkbox">
            <input
              id="loc"
              v-model="loc"
              type="checkbox"
              class="custom-control-input"
            >
            <label
              class="custom-control-label"
              for="loc"
            >
              I currently have a home equity line of credit (LOC)
            </label>
          </div>
        </div>
      </div>
      <div v-if="loc && loanPurpose && (loanPurpose.name === 'Refinance Cash Out' || loanPurpose.name === 'Refinance')" class="row">
        <div :class="{ error: errors.locAmount }" class="form-group col-12">
          <input
            v-model="locAmount"
            v-currency="{distractionFree: false}"
            @blur="validateLocAmount(locAmount)"
            type="text"
            name="locAmount"
            class="form-control"
            placeholder=""
          >
          <label
            :class="{ hasvalue: locAmount, hasError: errors.locAmount }"
            for="locAmount"
          >
            <span>
              {{ 'LOC Balance' }}
            </span>
          </label>
          <p
            v-if="errors.locAmount && !locAmount"
            class="error-inline"
          >
            LOC balance is required
          </p>
        </div>
      </div>
      <div v-if="loc && loanPurpose && (loanPurpose.name === 'Refinance Cash Out' || loanPurpose.name === 'Refinance')" class="row">
        <div class="form-group col-12">
          <div class="custom-control custom-radio">
            <input
              id="keepingLoc"
              :checked="loanPurpose.name === 'Refinance'"
              v-model="keepingLoc"
              v-on:change.stop="updateLoanPurpose(loanPurposeOptions[1])"
              name="locStatus"
              type="radio"
              class="custom-control-input"
            >
            <label
              class="custom-control-label"
              for="keepingLoc"
            >
              I would like to keep the LOC in place
            </label>
          </div>
        </div>
      </div>
      <div v-if="loc && loanPurpose && (loanPurpose.name === 'Refinance Cash Out' || loanPurpose.name === 'Refinance')" class="row">
        <div class="form-group col-12">
          <div class="custom-control custom-radio">
            <input
              id="payOffLoc"
              :checked="loanPurpose.name === 'Refinance Cash Out'"
              v-model="payOffLoc"
              v-on:change.stop="updateLoanPurpose(loanPurposeOptions[2])"
              name="locStatus"
              type="radio"
              class="custom-control-input"
            >
            <label
              class="custom-control-label"
              for="payOffLoc"
            >
              I would like to pay off the LOC with this loan
            </label>
          </div>
        </div>
      </div>
      <div class="form--search-rates__spacer form-group form-group--spacer w-100" />
      <div class="row">
        <div :class="{ error: errors.state }" class="form-group col-12 col-lg-6 form--search-rates__col--state">
          <select
            v-model="state"
            @blur="validateState(state)"
            name="state"
            class="custom-select"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              v-for="(option, index) in stateOptions"
              :key="index"
              :value="option"
            >
              {{ option.name }}
            </option>
          </select>
          <label
            :class="{ hasvalue: state !== null, hasError: errors.state }"
            for="state"
          >
            {{ 'State' | titlecase }}
          </label>
          <p
            v-if="errors.state && !state"
            class="error-inline"
          >
            State is required
          </p>
        </div>
        <div :class="{ error: errors.propertyZip }" class="form-group col-12 col-lg-6 form--search-rates__col--zip">
          <input
            v-model="propertyZip"
            @blur="validatePropertyZip(propertyZip)"
            type="text"
            name="propertyZip"
            class="form-control"
            placeholder=""
          >
          <label
            :class="{ hasvalue: propertyZip, hasError: errors.propertyZip }"
            for="propertyZip"
          >
            {{ 'Zip Code' | titlecase }}
          </label>
          <p
            v-if="errors.propertyZip && !propertyZip"
            class="error-inline"
          >
            State is required
          </p>
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.propertyType }" class="form-group col-12">
          <select
            v-model="propertyType"
            @blur="validatePropertyType(propertyType)"
            name="propertyType"
            class="custom-select"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              v-for="(option, index) in propertyTypeOptions"
              :key="index"
              :value="option"
            >
              {{ option.name | titlecase }}
            </option>
          </select>
          <label
            :class="{ hasvalue: propertyType !== null, hasError: errors.propertyType }"
            for="propertyType"
          >
            {{ 'Property Type' | titlecase }}
          </label>
          <p
            v-if="errors.propertyType && !propertyType"
            class="error-inline"
          >
            Property type is required
          </p>
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.propertyUse }" class="form-group col-12">
          <select
            v-model="propertyUse"
            @blur="validatePropertyUse(propertyUse)"
            name="propertyUse"
            class="custom-select"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              v-for="(option, index) in propertyUseOptions"
              :key="index"
              :value="option"
            >
              {{ option.name | titlecase }}
            </option>
          </select>
          <label
            :class="{ hasvalue: propertyUse !== null, hasError: errors.propertyUse }"
            for="propertyUse"
          >
            {{ 'Property Use' | titlecase }}
          </label>
          <p
            v-if="errors.propertyUse && !propertyUse"
            class="error-inline"
          >
            Property use is required
          </p>
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.creditRating }" class="form-group col-12">
          <select
            v-model="creditRating"
            @blur="validateCreditRating(creditRating)"
            name="creditRating"
            class="custom-select"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              v-for="(option, index) in creditRatingOptions"
              :key="index"
              :value="option"
            >
              {{ option.name }}
            </option>
          </select>
          <label
            :class="{ hasvalue: creditRating !== null, hasError: errors.creditRating }"
            for="creditRating"
          >
            {{ 'Credit Rating' | titlecase }}
          </label>
          <p
            v-if="errors.creditRating && !creditRating"
            class="error-inline"
          >
            Credit rating is required
          </p>
        </div>
      </div>
      <!-- <div class="form--search-rates__spacer form-group form-group--spacer w-100" /> -->
      <div class="row">
        <div class="form-group col-12">
          <select
            id="input-select--taxes"
            v-model="taxes"
            name="taxes"
            class="custom-select has-info"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              value="Yes"
            >
              Yes
            </option>
            <option
              value="No"
            >
              No
            </option>
          </select>
          <label
            :class="{ hasvalue: taxes }"
            for="taxes"
          >
            {{ 'Taxes & Insurance' | titlecase }}
            <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
            <b-tooltip target="taxes-tooltip" triggers="hover">
              Would you like to add your monthly taxes and insurance to your payment?
            </b-tooltip>
          </label>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12 form--search-rates__col--submit">
          <button
            :class="invertedSubmit ? 'btn-outline-primary' : 'btn-primary'"
            :disabled="formHasErrors"
            type="submit"
            class="btn btn--submit"
          >
            {{ searchResults.length ? 'Update Search' : 'Search Live Rates' | titlecase }}
          </button>
        </div>
      </div>
      <div
        v-if="!hideExtraFields"
        class="row"
      >
        <div class="form-group col-12">
          <ul class="list-unstyled form--search-rates__supplemental-links">
            <li class="form--search-rates__supplemental-link">
              <div class="row">
                <div class="col-12">
                  <p class="mb-1">
                    Do you have a promotional code?
                  </p>
                </div>
                <div class="form-group col-12 mb-3">
                  <input
                    v-model="promotionCode"
                    type="text"
                    name="promotionCode"
                    class="form-control"
                    placeholder=""
                  >
                  <label
                    :class="{ hasvalue: promotionCode }"
                    for="promotionCode"
                  >
                    {{ 'Promo Code' | titlecase }}
                  </label>
                  <p
                    v-if="promotion.length && promotion[0].hasOwnProperty('displayMessage')"
                    class="success-inline"
                  >
                    {{ promotion[0].displayMessage }}
                  </p>
                </div>
              </div>
            </li>
            <li class="form--search-rates__supplemental-link">
              <div class="row">
                <div class="form-group col-12">
                  <p class="mb-0">
                    Sign Up for Rate Alerts?
                  </p>
                  <div class="custom-control custom-checkbox">
                    <input
                      id="signUp"
                      v-model="signUp"
                      type="checkbox"
                      class="custom-control-input"
                    >
                    <label
                      class="custom-control-label"
                      for="signUp"
                    >
                      Yes, I'd like to sign up!
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import {
  authenticate,
  getCreditRating,
  getLoanPurpose,
  getMaritalStatus,
  getPromotionCode,
  getPropertyType,
  getPropertyUse,
  getState,
  loanSearch
} from '~/services/api'

export default {
  props: {
    hideExtraFields: {
      type: Boolean,
      default: false
    },
    invertedSubmit: {
      type: Boolean,
      default: false
    },
    sidebar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // Form state
      errors: {
        creditRating: false,
        loanAmount: false,
        loanPurpose: false,
        locAmount: false,
        ltv: false,
        propertyType: false,
        propertyUse: false,
        propertyValue: false,
        propertyZip: false,
        state: false
      },
      minLoanAmount: 50000,
      promotion: false
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      creditRatingOptions: state => state.form.options.creditRatingOptions,
      loanPurposeOptions: state => state.form.options.loanPurposeOptions,
      maritalStatusOptions: state => state.form.options.maritalStatusOptions,
      promotionCodeOptions: state => state.form.options.promotionCodeOptions,
      propertyTypeOptions: state => state.form.options.propertyTypeOptions,
      propertyUseOptions: state => state.form.options.propertyUseOptions,
      searchResults: state => state.searchResultsReduced,
      stateOptions: state => state.form.options.stateOptions
    }),
    creditRating: {
      get () {
        return this.$store.state.application.data.creditRating
      },
      set (value) {
        this.$store.commit('updateCreditRating', value)
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
    loanPurpose: {
      get () {
        return this.$store.state.application.data.loanPurpose
      },
      set (value) {
        this.updateLoanPurpose(value)
      }
    },
    // loanRefinanceType: {
    //   get () {
    //     return this.$store.state.application.data.loanRefinanceType
    //   },
    //   set (value) {
    //     this.$store.commit('updateLoanRefinanceType', value)
    //   }
    // },
    loanRefinanceType () {
      let type = 'No Cash Out'
      if (this.loanPurpose.name === 'Refinance Cash Out') {
        type = 'Cash Out'
        if (!this.locAfterFirst || (this.locAfterFirst && this.keepingLoc)) {
          type = 'No Cash Out'
        }
        if (this.payOffLoc) {
          type = 'Cash Out'
        }
      }
      this.$store.commit('updateLoanRefinanceType', type)
      return type
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
        this.$store.commit('updateLocAfterFirst', value)
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
    ltv () {
      return this.$parseCurrency(this.loanAmount) / this.$parseCurrency(this.propertyValue)
    },
    payOffLoc: {
      get () {
        return this.$store.state.application.data.payOffLoc
      },
      set (value) {
        this.$store.commit('updatePayOffLoc', value)
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
    propertyZip: {
      get () {
        return this.$store.state.application.data.propertyZip
      },
      set (value) {
        this.$store.commit('updatePropertyZip', value)
      }
    },
    signUp: {
      get () {
        return this.$store.state.application.data.signUp
      },
      set (value) {
        this.$store.commit('updateSignUp', value)
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
    taxes: {
      get () {
        return this.$store.state.application.data.taxes
      },
      set (value) {
        this.$store.commit('updateTaxes', value)
      }
    },
    // Search Payload
    searchPayload () {
      const payload = {
        'creditRating': this.creditRating.name,
        'loanAmount': this.$parseCurrency(this.loanAmount),
        'loanPurpose': this.loanPurpose.name,
        'loanRefinanceType': this.loanRefinanceType,
        'promotionCode': this.promotionCode,
        'propertyType': this.propertyType.name,
        'propertyUse': this.propertyUse.name,
        'propertyValue': this.$parseCurrency(this.propertyValue),
        'taxesAndInsurance': this.taxes === 'Yes',
        'zipCode': this.propertyZip
      }
      return payload
    },
    // Error Checking
    formHasErrors () {
      let hasErrors
      if (
        !this.loanPurpose ||
        !this.propertyValue ||
        !this.loanAmount ||
        !this.state ||
        !this.propertyZip ||
        !this.propertyType ||
        !this.propertyUse ||
        !this.creditRating
      ) {
        hasErrors = true
      } else {
        hasErrors = Object.keys(this.errors).some(k => this.errors[k])
      }
      return hasErrors
    }
  },
  watch: {
    loanPurpose (value) {
      this.loanPurpose = value
      this.validateLoanPurpose(value)
    },
    propertyValue (value) {
      this.propertyValue = value
      this.validatePropertyValue(value)
    },
    loanAmount (value) {
      this.loanAmount = value
      this.validateLoanAmount(value)
    },
    locAmount (value) {
      this.locAmount = value
      this.validateLocAmount(value)
    },
    ltv (value) {
      // this.ltv = value
      this.validateLtv(value)
    },
    state (value) {
      this.state = value
      this.validateState(value)
    },
    propertyZip (value) {
      this.propertyZip = value
      this.validatePropertyZip(value)
    },
    propertyType (value) {
      this.propertyType = value
      this.validatePropertyType(value)
    },
    propertyUse (value) {
      this.propertyUse = value
      this.validatePropertyUse(value)
    },
    creditRating (value) {
      this.creditRating = value
      this.validateCreditRating(value)
    },
    promotionCode (value) {
      this.promotionCode = value
      this.validatePromotionCode(value)
    }
  },
  async fetch () {
    if (!this.auth?.expirationDate || this.$moment(this.auth.expirationDate).isBefore(this.$moment())) {
      this.$store.commit('setAuth', await authenticate())
    }
    if (!this.loanPurposeOptions.length) {
      this.$store.commit('updateLoanPurposeOptions', await getLoanPurpose(this.auth))
    }
    if (!this.stateOptions.length) {
      this.$store.commit('updateStateOptions', await getState(this.auth))
    }
    if (!this.propertyTypeOptions.length) {
      this.$store.commit('updatePropertyTypeOptions', await getPropertyType(this.auth))
    }
    if (!this.propertyUseOptions.length) {
      this.$store.commit('updatePropertyUseOptions', await getPropertyUse(this.auth))
    }
    if (!this.creditRatingOptions.length) {
      this.$store.commit('updateCreditRatingOptions', await getCreditRating(this.auth))
    }
    if (!this.maritalStatusOptions.length) {
      this.$store.commit('updateMaritalStatusOptions', await getMaritalStatus(this.auth))
    }
    if (!this.promotionCodeOptions.length) {
      this.$store.commit('updatePromotionCodeOptions', await getPromotionCode(this.auth))
    }
  },
  methods: {
    calculateLtv () {
      this.ltv = this.$parseCurrency(this.loanAmount) / this.$parseCurrency(this.propertyValue)
    },
    focusClassAdd (event) {
      const self = event.target
      self.closest('div').classList.add('focused')
    },
    focusClassRemove (event) {
      const self = event.target
      self.closest('div').classList.remove('focused')
    },
    getLoanRefinanceType () {
      let type = 'No Cash Out'
      if (this.loanPurpose.name === 'Refinance Cash Out') {
        type = 'Cash Out'
        if (!this.applicationData.locAfterFirst || (this.applicationData.locAfterFirst && this.applicationData.keepingLoc)) {
          type = 'No Cash Out'
        }
        if (this.applicationData.payOffLoc) {
          type = 'Cash Out'
        }
      }
      return type
    },
    scrollToTop (event) {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
      // window.scrollTo(0, 0)
      document.body.focus()
    },
    toggleLoader () {
      this.$store.commit('toggleLoader')
    },
    // Submit Methods
    reduceResults (results) {
      // const r = results.searchResultDetails.sort((a, b) => (a.amortizationTerm < b.amortizationTerm) ? 1 : -1) // < DESC, > ASC
      const reduced = {}
      results.forEach((item, index) => {
        if (!reduced[item.amortizationTerm + ' Year ' + item.amortizationType]) {
          reduced[item.amortizationTerm + ' Year ' + item.amortizationType] = []
        }
        reduced[item.amortizationTerm + ' Year ' + item.amortizationType].push(item)
      })
      const reducedMore = []
      for (const [key, value] of Object.entries(reduced)) {
        reducedMore.push({
          amortization: key,
          results: value
        })
      }
      return reducedMore
    },
    submitStart () {
      this.$emit('submitStart')
      this.toggleLoader()
    },
    submitEnd () {
      this.$emit('submitEnd')
      setTimeout(() => this.toggleLoader(), 250)
    },
    updateLoanPurpose (payload) {
      this.$store.commit('updateLoanPurpose', payload)
    },
    updateSearchResults (results) {
      this.$store.commit('setSearchResultDetails', results)
      const reduced = this.reduceResults(results)
      if (reduced) {
        this.$store.commit('setSearchResults', reduced)
      }
    },
    updateSidebar (payload) {
      this.$store.commit('setLayoutSidebar', payload)
    },
    updateRoute () {
      this.updateSidebar('default')
      this.$router.push({
        path: '/search/results'
      })
    },
    async handleFormSubmit (e) {
      e.preventDefault()
      this.submitStart()
      // Check for errors
      // const hasErrors = this.formValidate()
      // If no errors
      if (!this.formHasErrors) {
        // Get search data (API)
        const data = await authenticate()
          .then((auth) => {
            return loanSearch(auth, this.searchPayload)
              .then((res) => {
                return res
              })
              .catch((err) => {
                throw err
              })
          })
          .catch((err) => {
            throw err
          })
        // Check search results are valid
        this.updateSearchResults(data)
        this.updateRoute()
      }
      this.scrollToTop(e)
      this.submitEnd()
    },
    validateLoanPurpose (value) {
      if (value) {
        this.errors.loanPurpose = false
      } else {
        this.errors.loanPurpose = true
      }
    },
    validatePropertyValue (value) {
      if (value) {
        if (this.loanAmount && this.$parseCurrency(value) < this.$parseCurrency(this.loanAmount)) {
          this.errors.propertyValue = true
        } else {
          this.errors.propertyValue = false
        }
      } else {
        this.errors.propertyValue = true
      }
    },
    validateLoanAmount (value) {
      if (value) {
        if (
          (this.propertyValue &&
          this.$parseCurrency(value) > this.$parseCurrency(this.propertyValue)) ||
          this.$parseCurrency(value) < this.minLoanAmount
        ) {
          this.errors.loanAmount = true
        } else {
          this.errors.loanAmount = false
        }
      } else {
        this.errors.loanAmount = true
      }
    },
    validateLocAmount (value) {
      if (value) {
        this.errors.locAmount = false
      } else {
        this.errors.locAmount = true
      }
    },
    validateLtv (value) {
      if (value) {
        if (this.ltv > 0.95) {
          this.errors.ltv = true
        } else {
          this.errors.ltv = false
        }
      } else {
        this.errors.ltv = true
      }
    },
    validateState (value) {
      if (value) {
        this.errors.state = false
      } else {
        this.errors.state = true
      }
    },
    validatePropertyZip (value) {
      if (value) {
        this.errors.propertyZip = false
      } else {
        this.errors.propertyZip = true
      }
    },
    validatePropertyType (value) {
      if (value) {
        this.errors.propertyType = false
      } else {
        this.errors.propertyType = true
      }
    },
    validatePropertyUse (value) {
      if (value) {
        this.errors.propertyUse = false
      } else {
        this.errors.propertyUse = true
      }
    },
    validateCreditRating (value) {
      if (value) {
        this.errors.creditRating = false
      } else {
        this.errors.creditRating = true
      }
    },
    validatePromotionCode (value) {
      if (value) {
        if (this.promotionCodeOptions.length) {
          this.promotion = this.promotionCodeOptions.filter(
            function (promoItem) {
              return promoItem.promotionCode.toUpperCase() === value.toUpperCase()
            }
          )
        }
      } else {
        this.promotion = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.form--search-rates {
  &__ltv {
    margin: auto;
    // margin-top: $spacer;
    background-color: $gray-300;
    font-size: #{$font-size-sm * 0.875};
    line-height: 1.785714285714286;
    text-align: center;
    padding: 0 #{$spacer * 0.75};
  }
  &__supplemental-links {
    margin-bottom: 0;
  }
  &__supplemental-link {
    font-size: 16px;
    line-height: 28px;
    .link-text {
      color: $body-color;
      margin-bottom: 1em;
      &:active,
      &:focus,
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
