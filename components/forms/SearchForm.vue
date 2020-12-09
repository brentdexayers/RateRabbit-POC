<template>
  <div class="form-wrapper">
    <div v-if="error.status && errors.loanSearch" class="alert alert-danger small">
      <p v-if="error.status !== 500">
        <strong class="text-danger">There was a problem searching. Please try your search again later.</strong>
      </p>
      <p v-if="error.status === 500">
        <strong class="text-danger">There was a problem with your search. Please check the form to ensure your data is accurate.</strong>
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
    <div v-if="errors.loanSearch && (errors.creditRating || errors.loanAmount || errors.loanPurpose || errors.locAmount || errors.propertyType || errors.propertyUse || errors.propertyValue || errors.propertyZip || errors.state)" class="alert alert-danger form-errors-title small">
      <p>
        <strong class="text-danger">Please fix the errors below.</strong>
      </p>
    </div>
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="validateLoanPurpose(loanPurpose);$event.target.closest('.form-group').classList.toggle('focus');"
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
            {{ 'Loan Purpose' | titlecase }} *
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
              {{ 'Property value' | titlecase }} *
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
            {{ 'Cash Out Amount' | titlecase }} *
          </label>
          <input
            v-model="loanCashOutAmount"
            v-currency="{distractionFree: false}"
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
              <img id="loanAmount-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
              <b-tooltip target="loanAmount-tooltip" triggers="hover">
                Current loan amount plus cash out request
              </b-tooltip>
            </span>
            <span v-else>
              {{ 'Loan Amount' | titlecase }} *
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
              {{ 'LOC Balance' }} *
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
            {{ 'State' | titlecase }} *
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
            type="text"
            name="propertyZip"
            class="form-control"
            placeholder=""
          >
          <label
            :class="{ hasvalue: propertyZip, hasError: errors.propertyZip }"
            for="propertyZip"
          >
            {{ 'Zip Code' | titlecase }} *
          </label>
          <p
            v-if="errors.propertyZip && !propertyZip"
            class="error-inline"
          >
            Zip code is required
          </p>
        </div>
      </div>
      <div class="row">
        <div :class="{ error: errors.propertyType }" class="form-group col-12">
          <select
            v-model="propertyType"
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
            {{ 'Property Type' | titlecase }} *
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
            {{ 'Property Use' | titlecase }} *
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
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
            {{ 'Credit Rating' | titlecase }} *
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
        <div :class="{ error: errors.taxes }" class="form-group col-12">
          <select
            id="input-select--taxes"
            v-model="taxes"
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
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
            {{ 'Taxes & Insurance' | titlecase }} *
            <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
            <b-tooltip target="taxes-tooltip" triggers="hover">
              Would you like to add your monthly taxes and insurance to your payment?
            </b-tooltip>
          </label>
        </div>
      </div>
      <div class="row row-promo">
        <div
          :class="{ error: errors.promotionCodeNoSubmit }"
          class="form-group col-12"
        >
          <input
            v-model="promotionCode"
            @focus="$event.target.closest('.form-group').classList.toggle('focus')"
            @blur="$event.target.closest('.form-group').classList.toggle('focus')"
            type="text"
            name="promotionCode"
            class="form-control"
            placeholder=""
          >
          <label
            :class="{ hasvalue: promotionCode }"
            for="promotionCode"
          >
            {{ 'Promotion Code' | titlecase }}
          </label>
          <p
            v-if="promotionIsExact && promotion[0].hasOwnProperty('displayMessage')"
            class="success-inline"
          >
            {{ promotion[0].displayMessage }}
          </p>
          <p
            v-if="errors.promotionCodeNoSubmit"
            class="error-inline"
          >
            Invalid promotion code
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-auto ml-auto">
          <p class="small form-text text-muted">
            * Required
          </p>
        </div>
      </div>

      <div class="row row-submit">
        <div class="form-group col-12 form--search-rates__col--submit">
          <button
            :class="invertedSubmit ? 'btn-outline-primary' : 'btn-primary'"
            type="submit"
            class="btn btn--submit"
          >
            {{ searchResults.length ? 'Update Search' : 'Search Live Rates' | titlecase }}
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
        authenticate: false,
        creditRating: false,
        loanAmount: false,
        loanPurpose: false,
        loanSearch: false,
        locAmount: false,
        ltv: false,
        promotionCodeNoSubmit: false,
        propertyType: false,
        propertyUse: false,
        propertyValue: false,
        propertyZip: false,
        state: false,
        taxes: false
      },
      error: {
        message: null,
        status: null,
        subject: null,
        showDetails: false
      },
      minLoanAmount: 50000
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      applicationData: state => state.application.data,
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
    promotion: {
      get () {
        return this.$store.state.application.data.promotion
      },
      set (value) {
        this.$store.commit('updatePromotion', value)
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
    promotionIsExact () {
      return this.validatePromotionIsExact(this.promotionCode)
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
    },
    taxes (value) {
      this.taxes = value
      this.validateTaxesAndInsurance(value)
    }
  },
  async fetch () {
    if (!this.auth?.expirationDate || this.$moment(this.auth.expirationDate).isBefore(this.$moment())) {
      this.$store.commit('setAuth', await authenticate())
    }
    if (!this.loanPurposeOptions?.length) {
      this.$store.commit('updateLoanPurposeOptions', await getLoanPurpose(this.auth))
    }
    if (!this.stateOptions?.length) {
      this.$store.commit('updateStateOptions', await getState(this.auth))
    }
    if (!this.propertyTypeOptions?.length) {
      this.$store.commit('updatePropertyTypeOptions', await getPropertyType(this.auth))
    }
    if (!this.propertyUseOptions?.length) {
      this.$store.commit('updatePropertyUseOptions', await getPropertyUse(this.auth))
    }
    if (!this.creditRatingOptions?.length) {
      this.$store.commit('updateCreditRatingOptions', await getCreditRating(this.auth))
    }
    if (!this.maritalStatusOptions?.length) {
      this.$store.commit('updateMaritalStatusOptions', await getMaritalStatus(this.auth))
    }
    if (!this.promotionCodeOptions?.length) {
      this.$store.commit('updatePromotionCodeOptions', await getPromotionCode(this.auth))
    }
  },
  methods: {
    calculateLtv () {
      this.ltv = this.$parseCurrency(this.loanAmount) / this.$parseCurrency(this.propertyValue)
    },
    errorShowDetails (e) {
      e.preventDefault()
      this.error.showDetails = !this.error.showDetails
    },
    focusClassAdd (event) {
      const self = event.target
      self.closest('div').classList.add('focused')
    },
    focusClassRemove (event) {
      const self = event.target
      self.closest('div').classList.remove('focused')
    },
    formHasErrors () {
      // (re)Set defaults
      this.errors.loanSearch = false
      this.error.message = null
      this.error.status = null
      this.error.subject = null
      this.error.showDetails = false
      let hasErrors = false
      // Check for errors
      this.validateLoanPurpose(this.applicationData.loanPurpose)
      this.validatePropertyValue(this.applicationData.propertyValue)
      this.validateLoanAmount(this.applicationData.loanAmount)
      this.validateLocAmount(this.applicationData.locAmount)
      this.validateState(this.applicationData.state)
      this.validatePropertyZip(this.applicationData.propertyZip)
      this.validatePropertyType(this.applicationData.propertyType)
      this.validatePropertyUse(this.applicationData.propertyUse)
      this.validateCreditRating(this.applicationData.creditRating)
      this.validateTaxesAndInsurance(this.applicationData.creditRating)
      if (!hasErrors) {
        hasErrors = Object.keys(this.errors).some(k => this.errors[k])
        if (hasErrors) {
          this.errors.loanSearch = true
          console.log('Form Error Obj:', '\n', this.errors)
        }
      }
      return hasErrors
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
    scrollToTop (event) {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
      // window.scrollTo(0, 0)
      document.body.focus()
    },
    submitStart () {
      this.$emit('submitStart')
      this.toggleLoader()
    },
    submitEnd () {
      this.$emit('submitEnd')
      setTimeout(() => this.toggleLoader(), 250)
    },
    toggleLoader () {
      this.$store.commit('toggleLoader')
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
      if (value || !this.loc || this.loanPurpose.name === 'Purchase') {
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
      if (value && this.promotionCodeOptions.length) {
        this.promotion = this.promotionCodeOptions.filter(
          function (promoItem) {
            return promoItem.promotionCode.toUpperCase().includes(value.toUpperCase())
          }
        )
      } else {
        this.promotion = false
      }
      // this.validatePromotionIsExact(value)
    },
    validatePromotionIsExact (value) {
      if (this.promotion && this.promotion.length === 1 && this.promotion[0].promotionCode.toUpperCase() === value.toUpperCase()) {
        return true
      } else {
        return false
      }
    },
    validatePromotionCodeNoSubmit (value) {
      if (value && !this.promotionIsExact) {
        this.errors.promotionCodeNoSubmit = true
      } else {
        this.errors.promotionCodeNoSubmit = false
      }
    },
    validateTaxesAndInsurance (value) {
      if (this.taxes) {
        this.errors.taxes = false
      } else {
        this.errors.taxes = true
      }
    },
    async handleFormSubmit (e) {
      e.preventDefault()
      this.validatePromotionCodeNoSubmit(this.promotionCode)
      this.submitStart()
      // Check for errors
      const hasErrors = this.formHasErrors()
      // If no errors
      if (!hasErrors) {
        // Get search data (API)
        const data = await authenticate()
          .then((auth) => {
            return loanSearch(auth, this.searchPayload)
              .then((res) => {
                // console.log('result:', '\n', res)
                return res
              })
              .catch((err) => {
                console.log(err)
                console.log('Payload: ', '\n', this.searchPayload)
                this.errors.loanSearch = true
                this.error.status = err.response?.status || true
                this.error.message = err.response?.data?.description || err
                this.error.subject = err.response?.data?.subject || null
              })
          })
          .catch((err) => {
            console.log(err)
            this.errors.authenticate = true
          })
        // Check search results are valid
        if (!this.errors.authenticate && !this.errors.loanSearch) {
          this.updateSearchResults(data)
          // console.log('Raw Results: ', data)
          this.updateRoute()
        }
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
  display: flex;
  flex-direction: column;
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
