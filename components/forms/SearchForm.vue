<template>
  <div class="form-wrapper">
    <form
      id="search-rates-form"
      @submit.prevent="handleFormSubmit"
      method="POST"
      class="form form--search-rates"
    >
      <div v-if="hasErrors" class="form-errors">
        <p class="text-danger">
          <b>Please correct the following errors:</b>
        </p>
      </div>
      <div class="row">
        <div :class="{ error: errors.loanPurpose }" class="form-group col-12">
          <label
            :class="{ hasvalue: loanPurpose !== null, hasError: errors.loanPurpose }"
            for="loanPurpose"
          >
            {{ 'Loan Purpose' | titlecase }}
          </label>
          <select
            v-model="loanPurpose"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
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
            >
              {{ option.name | titlecase }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.propertyValue }" class="form-group col-12">
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
          <input
            v-model="propertyValue"
            v-currency="{distractionFree: false}"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="propertyValue"
            class="form-control"
            placeholder=""
          >
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
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="loanCashOutAmount"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.loanAmount }" class="form-group col-12">
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
          <input
            v-model="loanAmount"
            v-currency="{distractionFree: false}"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="loanAmount"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <div v-if="loanAmount && propertyValue" class="ltv wrapper wrapper--ltv form--search-rates__ltv">
            {{ this.$parseCurrency(loanAmount) / this.$parseCurrency(propertyValue) | percent(0) }} loan-to-value
          </div>
        </div>
      </div>
      <div class="form--search-rates__spacer form-group w-100" />
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
          <label
            :class="{ hasvalue: locAmount, hasError: errors.locAmount }"
            for="locAmount"
          >
            <span>
              {{ 'LOC Balance' }}
            </span>
          </label>
          <input
            v-model="locAmount"
            v-currency="{distractionFree: false}"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="locAmount"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <!-- <div v-if="loc && loanPurpose && (loanPurpose.name === 'Refinance Cash Out' || loanPurpose.name === 'Refinance')" class="row">
        <div class="form-group col-12">
          <div class="custom-control custom-checkbox">
            <input
              id="locAfterFirst"
              v-model="locAfterFirst"
              type="checkbox"
              class="custom-control-input"
            >
            <label
              class="custom-control-label"
              for="locAfterFirst"
            >
              Was the LOC added after the initial purchase of your current home?
            </label>
          </div>
        </div>
      </div> -->
      <div v-if="loc && loanPurpose && (loanPurpose.name === 'Refinance Cash Out' || loanPurpose.name === 'Refinance')" class="row">
        <div class="form-group col-12">
          <div class="custom-control custom-checkbox">
            <input
              id="keepingLoc"
              v-model="keepingLoc"
              type="checkbox"
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
          <div class="custom-control custom-checkbox">
            <input
              id="payOffLoc"
              v-model="payOffLoc"
              type="checkbox"
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
      <div class="form--search-rates__spacer form-group w-100" />
      <div class="row">
        <div :class="{ error: errors.state }" class="form-group col-12 col-lg-6 form--search-rates__col--state">
          <label
            :class="{ hasvalue: state !== null, hasError: errors.state }"
            for="state"
          >
            {{ 'State' | titlecase }}
          </label>
          <select
            v-model="state"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
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
        </div>
        <div :class="{ error: errors.propertyZip }" class="form-group col-12 col-lg-6 form--search-rates__col--zip">
          <label
            :class="{ hasvalue: propertyZip, hasError: errors.propertyZip }"
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
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.propertyType }" class="form-group col-12">
          <label
            :class="{ hasvalue: propertyType !== null, hasError: errors.propertyType }"
            for="propertyType"
          >
            {{ 'Property Type' | titlecase }}
          </label>
          <select
            v-model="propertyType"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
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
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.propertyUse }" class="form-group col-12">
          <label
            :class="{ hasvalue: propertyUse !== null, hasError: errors.propertyUse }"
            for="propertyUse"
          >
            {{ 'Property Use' | titlecase }}
          </label>
          <select
            v-model="propertyUse"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
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
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.creditRating }" class="form-group col-12">
          <label
            :class="{ hasvalue: creditRating !== null, hasError: errors.creditRating }"
            for="creditRating"
          >
            {{ 'Credit Rating' | titlecase }}
          </label>
          <select
            v-model="creditRating"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
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
        </div>
      </div>
      <!-- <div class="form--search-rates__spacer form-group w-100" /> -->
      <div class="row">
        <div class="form-group col-12">
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
          <select
            id="input-select--taxes"
            v-model="taxes"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
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
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12 form--search-rates__col--submit">
          <button
            :class="invertedSubmit ? 'btn-outline-primary' : 'btn-primary'"
            type="submit"
            class="btn form--search-rates__submit"
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
                  <label
                    :class="{ hasvalue: promotionCode }"
                    for="promotionCode"
                  >
                    {{ 'Promo Code' | titlecase }}
                  </label>
                  <input
                    v-model="promotionCode"
                    @focus="focusClassAdd($event)"
                    @blur="focusClassRemove($event)"
                    type="text"
                    name="promotionCode"
                    class="form-control"
                    placeholder=""
                  >
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
        propertyType: false,
        propertyUse: false,
        propertyValue: false,
        propertyZip: false,
        state: false
      },
      hasErrors: false,
      ltv: 0
      // submitButton: 'Search Live Rates'
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      creditRatingOptions: state => state.form.options.creditRatingOptions,
      loanPurposeOptions: state => state.form.options.loanPurposeOptions,
      maritalStatusOptions: state => state.form.options.maritalStatusOptions,
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
        this.$store.commit('updateLoanPurpose', value)
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
    formValidate () {
      this.$emit('searchValidateStart')
      if (!this.loanPurpose) { this.errors.loanPurpose = true } else { this.errors.loanPurpose = false }
      if (!this.propertyValue) { this.errors.propertyValue = true } else { this.errors.propertyValue = false }
      if (!this.loanAmount) { this.errors.loanAmount = true } else { this.errors.loanAmount = false }
      if (!this.state) { this.errors.state = true } else { this.errors.state = false }
      if (!this.propertyZip) { this.errors.propertyZip = true } else { this.errors.propertyZip = false }
      if (!this.propertyType) { this.errors.propertyType = true } else { this.errors.propertyType = false }
      if (!this.propertyUse) { this.errors.propertyUse = true } else { this.errors.propertyUse = false }
      if (!this.creditRating) { this.errors.creditRating = true } else { this.errors.creditRating = false }
      const hasErrors = Object.keys(this.errors).some(k => this.errors[k])
      this.hasErrors = hasErrors
      return hasErrors
    },
    async handleFormSubmit (e) {
      e.preventDefault()
      this.submitStart()
      // Check for errors
      const hasErrors = this.formValidate()
      // If no errors
      if (!hasErrors) {
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
  &__form-group {
    &--program-options {
      &__label {}
      &__list {
        margin-bottom: 0;
        .list-item {
          font-size: $font-size-sm;
          line-height: 1.75;
          margin-bottom: 2px;
        }
      }
    }
  }
  & .form-group {
    &.error {
      label {
        color: $danger !important;
      }
      input, select {
        border: 1px solid $danger;
      }
    }
    .custom-checkbox {
      label {
        color: $primary;
        font-size: $font-size-sm;
      }
    }
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
  &__spacer {
    margin-bottom: #{$spacer * 2};
  }
}
.form-errors {
  color: $danger;
  p {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    margin-bottom: 1em;
  }
}
</style>
