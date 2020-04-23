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
            :class="{ hasvalue: fieldData.loanPurpose !== null }"
            for="loanPurpose"
          >
            {{ 'Loan Purpose' | titlecase }}
          </label>
          <select
            v-model="fieldData.loanPurpose"
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
            :class="{ hasvalue: fieldData.propertyValue }"
            for="propertyValue"
          >
            {{ 'Property value' | titlecase }}
          </label>
          <input
            v-model="fieldData.propertyValue"
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
            :class="{ hasvalue: fieldData.loanAmount }"
            for="loanAmount"
          >
            {{ 'Loan Amount' | titlecase }}
          </label>
          <input
            v-model="fieldData.loanAmount"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: true}"
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
      <div v-if="fieldData.loanPurpose && fieldData.loanPurpose.name === 'Refinance Cash Out'" class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: fieldData.cashAmount }"
            for="cashAmount"
          >
            {{ 'Cash Amount' | titlecase }}
          </label>
          <input
            v-model="fieldData.cashAmount"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: true}"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="cashAmount"
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
            :class="{ hasvalue: fieldData.state !== null }"
            for="state"
          >
            {{ 'State' | titlecase }}
          </label>
          <select
            v-model="fieldData.state"
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
            :class="{ hasvalue: fieldData.zipCode }"
            for="zipCode"
          >
            {{ 'Zip Code' | titlecase }}
          </label>
          <input
            v-model="fieldData.zipCode"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="zipCode"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: fieldData.propertyType !== null }"
            for="propertyType"
          >
            {{ 'Property Type' | titlecase }}
          </label>
          <select
            v-model="fieldData.propertyType"
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
            :class="{ hasvalue: fieldData.propertyUse !== null }"
            for="propertyUse"
          >
            {{ 'Property Use' | titlecase }}
          </label>
          <select
            v-model="fieldData.propertyUse"
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
            :class="{ hasvalue: fieldData.creditRating !== null }"
            for="creditRating"
          >
            {{ 'Credit Rating' | titlecase }}
          </label>
          <select
            v-model="fieldData.creditRating"
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
            :class="{ hasvalue: fieldData.interestOnly }"
            for="interestOnly"
          >
            {{ 'Interest Only' | titlecase }}
          </label>
          <select
            v-model="fieldData.interestOnly"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="interestOnly"
            class="custom-select"
          >
            <option
              value="null"
              disabled
              hidden
            />
            <option
              value="true"
            >
              Yes
            </option>
            <option
              value="false"
            >
              No
            </option>
          </select>
        </div>
        <div class="form-group col-12 form--search-rates__col--taxes">
          <label
            :class="{ hasvalue: fieldData.taxesAndInsurance }"
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
            v-model="fieldData.taxesAndInsurance"
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
              value="true"
            >
              Yes
            </option>
            <option
              value="false"
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
                    :class="{ hasvalue: fieldData.promotionCode }"
                    for="promotionCode"
                  >
                    {{ 'Promo Code' | titlecase }}
                  </label>
                  <input
                    v-model="fieldData.promotionCode"
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
                      v-model="fieldData.signUp"
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
      auth: {},
      // Field Options
      loanPurposeOptions: {},
      propertyTypeOptions: {},
      propertyUseOptions: {},
      creditRatingOptions: {},
      stateOptions: {},
      // Field Data
      fieldData: {
        cashAmount: null,
        creditRating: null,
        interestOnly: null,
        loanAmount: null,
        loanRefinanceType: null,
        loanPurpose: null,
        promotionCode: null,
        propertyType: null,
        propertyUse: null,
        propertyValue: null,
        signUp: false,
        state: null,
        taxesAndInsurance: null,
        zipCode: null
      },
      // Form state
      ltv: 0,
      submitButton: 'Search Live Rates',
      search: {
        results: {}
      }
    }
  },
  computed: {
    applicationCompleted () {
      return this.$store.state.application.completed
    },
    searchResults () {
      return this.$store.state.loanProducts
    }
  },
  async fetch () {
    this.auth = await authenticate()
    this.loanPurposeOptions = await getLoanPurpose(this.auth)
    this.stateOptions = await getState(this.auth)
    this.propertyTypeOptions = await getPropertyType(this.auth)
    this.propertyUseOptions = await getPropertyUse(this.auth)
    this.creditRatingOptions = await getCreditRating(this.auth)
  },
  methods: {
    calculateLTV () {
      if (this.propertyValue && this.loanAmount) {
        this.ltv = this.$parseCurrency(this.fieldData.loanAmount) / this.$parseCurrency(this.fieldData.propertyValue)
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
    updateSearchData (payload) {
      this.$store.commit('setSearchData', payload)
    },
    updateSearchResults (payload) {
      this.$store.commit('setSearchResults', payload)
    },
    async handleFormSubmit () {
      this.$emit('submitStart')
      console.log('TODO: Set loading state HERE...')
      const searchData = {
        'creditRating': this.fieldData.creditRating.name,
        'interestOnly': this.fieldData.interestOnly === 'true',
        'loanAmount': this.$parseCurrency(this.fieldData.loanAmount),
        'loanPurpose': this.fieldData.loanPurpose.name,
        'loanRefinanceType': this.fieldData.loanRefinanceType,
        'promotionCode': this.fieldData.promotionCode,
        'propertyType': this.fieldData.propertyType.name,
        'propertyUse': this.fieldData.propertyUse.name,
        'propertyValue': this.$parseCurrency(this.fieldData.propertyValue),
        'taxesAndInsurance': this.fieldData.taxesAndInsurance === 'true',
        'zipCode': this.fieldData.zipCode
      }
      this.updateSearchData(searchData)
      const data = await authenticate()
        .then((auth) => {
          return loanSearch(auth, searchData)
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
