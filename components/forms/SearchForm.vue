<template>
  <div>
    <form
      id="search-rates-form"
      @submit.prevent="handleFormSubmit"
      method="POST"
      class="form form--search-rates"
    >
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: loanPurpose !== null }"
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
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: propertyValue }"
            for="propertyValue"
          >
            {{ 'Property value' | titlecase }}
          </label>
          <input
            v-model="propertyValue"
            v-currency="{distractionFree: true}"
            @change="calculateLTV"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="propertyValue"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: loanAmount }"
            for="loanAmount"
          >
            {{ 'Loan Amount' | titlecase }}
          </label>
          <input
            v-model="loanAmount"
            v-currency="{distractionFree: true}"
            @change="calculateLTV"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="loanAmount"
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
            {{ 'Cash Amount' | titlecase }}
          </label>
          <input
            v-model="loanCashOutAmount"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: true}"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="loanCashOutAmount"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <div class="ltv wrapper wrapper--ltv form--search-rates__ltv">
            {{ ltv | percent(0) }} loan-to-value
          </div>
        </div>
      </div>
      <div class="form--search-rates__spacer form-group w-100" />
      <div class="row">
        <div class="form-group col-12 col-lg-6 form--search-rates__col--state">
          <label
            :class="{ hasvalue: state !== null }"
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
        <div class="form-group col-12 col-lg-6 form--search-rates__col--zip">
          <label
            :class="{ hasvalue: currentZip }"
            for="currentZip"
          >
            {{ 'Zip Code' | titlecase }}
          </label>
          <input
            v-model="currentZip"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="currentZip"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: propertyType !== null }"
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
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: propertyUse !== null }"
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
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: creditRating !== null }"
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
      <div class="form--search-rates__spacer form-group w-100" />
      <div class="row">
        <div class="form-group col-12 form--search-rates__col--interest">
          <label
            :class="{ hasvalue: loanInterestOnly }"
            for="loanInterestOnly"
          >
            {{ 'Interest Only' | titlecase }}
          </label>
          <select
            v-model="loanInterestOnly"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="loanInterestOnly"
            class="custom-select"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              value="1"
            >
              Yes
            </option>
            <option
              value="0"
            >
              No
            </option>
          </select>
        </div>
        <div class="form-group col-12 form--search-rates__col--taxes">
          <label
            :class="{ hasvalue: taxesAndInsurance }"
            for="taxesAndInsurance"
          >
            {{ 'Taxes & Insurance' | titlecase }}
            <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
            <b-tooltip target="taxes-tooltip" triggers="hover">
              Including your taxes and insurance with your monthly payment may result in a lower rate or loan fee
            </b-tooltip>
          </label>
          <select
            id="input-select--taxes"
            v-model="taxesAndInsurance"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="taxesAndInsurance"
            class="custom-select has-info"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              value="1"
            >
              Yes
            </option>
            <option
              value="0"
            >
              No
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12 form--search-rates__col--submit">
          <button
            type="submit"
            class="btn btn-primary form--search-rates__submit"
          >
            {{ submitButton | titlecase }}
          </button>
        </div>
      </div>
      <div class="row">
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
  getPropertyType,
  getPropertyUse,
  getState,
  loanSearch
} from '~/services/api'

export default {
  components: {
  },
  data () {
    return {
      // Form state
      ltv: 0,
      submitButton: 'Search Live Rates'
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      loanPurposeOptions: state => state.form.options.loanPurposeOptions,
      propertyTypeOptions: state => state.form.options.propertyTypeOptions,
      propertyUseOptions: state => state.form.options.propertyUseOptions,
      creditRatingOptions: state => state.form.options.creditRatingOptions,
      stateOptions: state => state.form.options.stateOptions
    }),
    loanCashOutAmount: {
      get () {
        return this.$store.state.application.data.loanCashOutAmount
      },
      set (value) {
        this.$store.commit('updateLoanCashOutAmount', value)
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
    loanInterestOnly: {
      get () {
        return this.$store.state.application.data.loanInterestOnly
      },
      set (value) {
        this.$store.commit('updateLoanInterestOnly', value)
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
    loanRefinanceType: {
      get () {
        return this.$store.state.application.data.loanRefinanceType
      },
      set (value) {
        this.$store.commit('updateLoanRefinanceType', value)
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
    signUp: {
      get () {
        return this.$store.state.form.data.signUp
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
    taxesAndInsurance: {
      get () {
        return this.$store.state.form.data.taxesAndInsurance
      },
      set (value) {
        this.$store.commit('updateTaxesAndInsurance', value)
      }
    },
    currentZip: {
      get () {
        return this.$store.state.application.data.currentZip
      },
      set (value) {
        this.$store.commit('updateCurrentZip', value)
      }
    }
  },
  async fetch () {
    this.$store.commit('setAuth', await authenticate())
    this.$store.commit('updateLoanPurposeOptions', await getLoanPurpose(this.auth))
    this.$store.commit('updateStateOptions', await getState(this.auth))
    this.$store.commit('updatePropertyTypeOptions', await getPropertyType(this.auth))
    this.$store.commit('updatePropertyUseOptions', await getPropertyUse(this.auth))
    this.$store.commit('updateCreditRatingOptions', await getCreditRating(this.auth))
  },
  methods: {
    calculateLTV () {
      if (this.propertyValue && this.loanAmount) {
        this.ltv = this.$parseCurrency(this.loanAmount) / this.$parseCurrency(this.propertyValue)
      }
    },
    focusClassAdd (event) {
      const self = event.target
      self.previousElementSibling.classList.add('focused')
    },
    focusClassRemove (event) {
      const self = event.target
      self.previousElementSibling.classList.remove('focused')
    },
    // Submit Methods
    updateSearchResults (payload) {
      this.$store.commit('setSearchResults', payload)
    },
    updateRoute () {
      this.$router.push({
        path: '/search/results/'
      })
    },
    async handleFormSubmit () {
      this.$emit('submitStart')
      console.log('TODO: Set loading state HERE...')
      const searchPayload = {
        'creditRating': this.creditRating.name,
        'interestOnly': this.loanInterestOnly === 'true',
        'loanAmount': this.$parseCurrency(this.loanAmount),
        'loanPurpose': this.loanPurpose.name,
        'loanRefinanceType': this.loanRefinanceType,
        'promotionCode': this.promotionCode,
        'propertyType': this.propertyType.name,
        'propertyUse': this.propertyUse.name,
        'propertyValue': this.$parseCurrency(this.propertyValue),
        'taxesAndInsurance': this.taxesAndInsurance === 'true',
        'zipCode': this.currentZip
      }
      const data = await authenticate()
        .then((auth) => {
          return loanSearch(auth, searchPayload)
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
      if (typeof data === 'object' && data?.searchResultDetails) {
        const reduced = data.searchResultDetails.reduce(function (r, a) {
          r[a.amortizationTerm] = r[a.amortizationTerm] || []
          r[a.amortizationTerm].push(a)
          return r
        }, Object.create(null))
        this.updateSearchResults(reduced)
        this.$emit('searchResults', true)
      } else {
        this.$emit('searchResults', false)
      }
      this.updateRoute()
      console.log('TODO: Set UN-loading state HERE...')
      this.$emit('submitEnd')
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
  &--wrapper {
    color: $danger;
    p {
      font-weight: $font-weight-bold;
      margin-bottom: .2em;
    }
  }
  &__list {
    font-size: $font-size-sm;
  }
  &__error {
    margin-bottom: 0;
  }
}
</style>
