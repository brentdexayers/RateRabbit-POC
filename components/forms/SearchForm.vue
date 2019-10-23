<template>
  <div>
    <form
      id="search-rates-form"
      action="/search/results"
      method="POST"
      class="form form--search-rates"
      @submit.prevent="formValidate"
    >
      <div v-if="formErrors.length" class="form-errors form-errors--wrapper">
        <p>
          Please correct the following error(s):
        </p>
        <ul class="list form-errors__list">
          <li
            v-for="(error, i) in formErrors"
            :key="i"
            class="form-errors__error"
          >
            <span v-html="error" />
          </li>
        </ul>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            for="loanPurpose"
            :class="{ hasvalue: loanPurpose }"
          >
            {{ 'Loan Purpose' | titlecase }}
          </label>
          <select
            v-model="loanPurpose"
            name="loanPurpose"
            class="custom-select"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in loanPurposeOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            for="propertyValue"
            :class="{ hasvalue: propertyValue }"
          >
            {{ 'Property value' | titlecase }}
          </label>
          <input
            v-model="propertyValue"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
            type="text"
            class="form-control"
            name="propertyValue"
            placeholder=""
            @change="calculateLTV"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            for="loanAmount"
            :class="{ hasvalue: loanAmount }"
          >
            {{ 'Loan Amount' | titlecase }}
          </label>
          <input
            v-model="loanAmount"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
            type="text"
            class="form-control"
            name="loanAmount"
            placeholder=""
            @change="calculateLTV"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
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
        <div
          v-for="(program, i) in loanProgramOptions"
          :key="i"
          class="form-group col-6 form--search-rates__form-group--program-options"
        >
          <label class="form--search-rates__form-group--program-options__label">
            {{ program.name }}
            <template v-if="program.tooltip">
              <img :id="'program-options-tooltip-' + i" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
              <b-tooltip :target="'program-options-tooltip-' + i" triggers="hover">
                {{ program.tooltip }}
              </b-tooltip>
            </template>
          </label>
          <ul class="list-unstyled form--search-rates__form-group--program-options__list">
            <li
              v-for="(term, j) in program.terms"
              :key="j"
              class="custom-control custom-checkbox list-item"
            >
              <input
                :id="term.value"
                v-model="loanProgram"
                class="custom-control-input"
                :value="term.value"
                type="checkbox"
              >
              <label
                class="custom-control-label"
                :for="term.value"
              >
                {{ term.label }}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="form--search-rates__spacer form-group w-100" />
      <div class="row">
        <div class="form-group col-12 form--search-rates__col--state">
          <label
            for="state"
            :class="{ hasvalue: state }"
          >
            {{ 'State' | titlecase }}
          </label>
          <select
            v-model="state"
            name="state"
            class="custom-select"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="option in stateOptions"
              :key="option.value"
              :value="option.value"
              :title="option.label"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="form-group col-12 form--search-rates__col--county">
          <label
            for="county"
            :class="{ hasvalue: county }"
          >
            {{ 'County' | titlecase }}
          </label>
          <select
            v-model="county"
            name="county"
            class="custom-select"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <template
              v-if="state"
            >
              <option
                value=""
                disabled
                hidden
              />
              <option
                v-for="option in countyOptions[state]"
                :key="option.value"
                :value="option.value"
                :title="option.label"
              >
                {{ option.label }}
              </option>
            </template>
            <template
              v-else
            >
              <option
                v-for="option in countyOptions.default"
                :key="option.value"
                :value="option.value"
                :title="option.label"
                selected
                disabled
              >
                {{ option.label }}
              </option>
            </template>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            for="propertyType"
            :class="{ hasvalue: propertyType }"
          >
            {{ 'Property Type' | titlecase }}
          </label>
          <select
            v-model="propertyType"
            name="propertyType"
            class="custom-select"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in propertyTypeOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            for="propertyUse"
            :class="{ hasvalue: propertyUse }"
          >
            {{ 'Property Use' | titlecase }}
          </label>
          <select
            v-model="propertyUse"
            name="propertyUse"
            class="custom-select"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in propertyUseOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            for="creditRating"
            :class="{ hasvalue: creditRating }"
          >
            {{ 'Credit Rating' | titlecase }}
          </label>
          <select
            v-model="creditRating"
            name="creditRating"
            class="custom-select"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in creditRatingOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="form--search-rates__spacer form-group w-100" />
      <div class="row">
        <div class="form-group col-12 form--search-rates__col--interest">
          <label
            for="interestOnly"
            :class="{ hasvalue: interestOnly }"
          >
            {{ 'Interest Only' | titlecase }}
          </label>
          <select
            v-model="interestOnly"
            name="interestOnly"
            class="custom-select"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in interestOnlyOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="form-group col-12 form--search-rates__col--taxes">
          <label
            for="taxesInsurance"
            :class="{ hasvalue: taxesInsurance }"
          >
            {{ 'Taxes & Insurance' | titlecase }}
            <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
            <b-tooltip target="taxes-tooltip" triggers="hover">
              Including your taxes and insurance with your monthly payment may result in a lower rate or loan fee
            </b-tooltip>
          </label>
          <select
            id="input-select--taxes"
            v-model="taxesInsurance"
            name="taxesInsurance"
            class="custom-select has-info"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in taxesInsuranceOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            for="refinanceType"
            :class="{ hasvalue: refinanceType }"
          >
            {{ 'Refinance Type' | titlecase }}
            <img id="refinance-type-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
            <b-tooltip target="refinance-type-tooltip" triggers="hover">
              <p>If you are consolidating a 2nd mortgage, home equity line of credit after the purchase of property, your loan will be considered a "Refinance With Cash Out"</p>
              <p>You should also choose <strong>Cash Out</strong> if you are netting more than $2000 Cash, if you are paying off a Second Mortgage that was not taken out at the time of purchase or if you are paying off any other consumer debts with the proceeds of this loan.</p>
            </b-tooltip>
          </label>
          <select
            id="input-select--refinance-type"
            v-model="refinanceType"
            name="refinanceType"
            class="custom-select has-info"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in refinanceTypeOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12 form--search-rates__col--submit">
          <button
            v-if="searchResults.length > 0"
            class="btn btn-outline-primary form--search-rates__submit"
            type="submit"
          >
            {{ 'Update Search' | titlecase }}
          </button>
          <button
            v-else-if="applicationCompleted"
            class="btn btn-primary form--search-rates__submit"
            type="submit"
          >
            {{ 'Start New Search' | titlecase }}
          </button>
          <button
            v-else
            class="btn btn-primary form--search-rates__submit"
            type="submit"
          >
            {{ 'Search Live Rates' | titlecase }}
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
                    for="promoCode"
                    :class="{ hasvalue: promoCode }"
                  >
                    {{ 'Promo Code' | titlecase }}
                  </label>
                  <input
                    v-model="promoCode"
                    type="text"
                    class="form-control"
                    name="promoCode"
                    placeholder=""
                    @focus="focusClassAdd($event)"
                    @blur="focusClassRemove($event)"
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
                      class="custom-control-input"
                      type="checkbox"
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

export default {
  components: {
  },
  data () {
    return {
      hasSignUp: false,
      hasPromoCode: false
    }
  },
  computed: {
    loading () {
      return this.$store.state.searchresults.loading
    },
    applicationCompleted () {
      return this.$store.state.application.completed
    },
    latestSubmit () {
      const latest = () => {
        const datetimesArray = this.$store.state.searchform.datetimes
        return datetimesArray.slice(-1)[0]
      }
      return latest()
    },
    searchResults () {
      return this.$store.state.searchresults.results
    },
    formFields () {
      return this.$store.state.searchform.fields
    },
    formErrors () {
      return this.$store.state.searchform.errors
    },
    loanPurpose: {
      get () {
        return this.$store.state.application.loanPurpose
      },
      set (value) {
        this.$store.commit('application/setLoanPurpose', value)
      }
    },
    loanPurposeOptions () {
      return this.$store.state.searchform.fields.loanPurpose.options
    },
    propertyValue: {
      get () {
        return this.$store.state.application.propertyValue
      },
      set (value) {
        this.$store.commit('application/setPropertyValue', value)
      }
    },
    loanAmount: {
      get () {
        return this.$store.state.application.loanAmount
      },
      set (value) {
        this.$store.commit('application/setLoanAmount', value)
      }
    },
    ltv: {
      get () {
        return this.$store.state.application.ltv
      },
      set (value) {
        this.$store.commit('application/setLTV', value)
      }
    },
    loanProgram: {
      get () {
        return this.$store.state.application.loanProgram
      },
      set (value) {
        this.$store.commit('application/setLoanProgram', value)
      }
    },
    loanProgramOptions () {
      return this.$store.state.searchform.fields.loanProgram.options
    },
    state: {
      get () {
        return this.$store.state.application.state
      },
      set (value) {
        this.$store.commit('application/setState', value)
      }
    },
    stateOptions () {
      return this.$store.state.searchform.fields.state.options
    },
    county: {
      get () {
        return this.$store.state.application.county
      },
      set (value) {
        this.$store.commit('application/setCounty', value)
      }
    },
    countyOptions () {
      return this.$store.state.searchform.fields.county.options
    },
    propertyType: {
      get () {
        return this.$store.state.application.propertyType
      },
      set (value) {
        this.$store.commit('application/setPropertyType', value)
      }
    },
    propertyTypeOptions () {
      return this.$store.state.searchform.fields.propertyType.options
    },
    propertyUse: {
      get () {
        return this.$store.state.application.propertyUse
      },
      set (value) {
        this.$store.commit('application/setPropertyUse', value)
      }
    },
    propertyUseOptions () {
      return this.$store.state.searchform.fields.propertyUse.options
    },
    creditRating: {
      get () {
        return this.$store.state.application.creditRating
      },
      set (value) {
        this.$store.commit('application/setCreditRating', value)
      }
    },
    creditRatingOptions () {
      return this.$store.state.searchform.fields.creditRating.options
    },
    interestOnly: {
      get () {
        return this.$store.state.application.interestOnly
      },
      set (value) {
        this.$store.commit('application/setInterestOnly', value)
      }
    },
    interestOnlyOptions () {
      return this.$store.state.searchform.fields.interestOnly.options
    },
    taxesInsurance: {
      get () {
        return this.$store.state.application.taxesInsurance
      },
      set (value) {
        this.$store.commit('application/setTaxesInsurance', value)
      }
    },
    taxesInsuranceOptions () {
      return this.$store.state.searchform.fields.taxesInsurance.options
    },
    refinanceType: {
      get () {
        return this.$store.state.application.refinanceType
      },
      set (value) {
        this.$store.commit('application/setRefinanceType', value)
      }
    },
    refinanceTypeOptions () {
      return this.$store.state.searchform.fields.refinanceType.options
    },
    promoCode: {
      get () {
        return this.$store.state.application.promoCode
      },
      set (value) {
        this.$store.commit('application/setPromoCode', value)
      }
    },
    signUp: {
      get () {
        return this.$store.state.application.signUp
      },
      set (value) {
        this.$store.commit('application/setSignUp', value)
      }
    }
  },
  methods: {
    calculateLTV () {
      let ltv = 0
      if (this.propertyValue && this.loanAmount) {
        ltv = this.$parseCurrency(this.loanAmount, 'en', 'USD') / this.$parseCurrency(this.propertyValue, 'en', 'USD')
      }
      this.$store.commit('application/setLTV', ltv)
    },
    focusClassAdd (event) {
      const self = event.target
      self.previousElementSibling.classList.add('focused')
    },
    focusClassRemove (event) {
      const self = event.target
      self.previousElementSibling.classList.remove('focused')
    },
    formValidate () {
      const self = this
      // Reset application data
      let formIsValid = true
      self.$store.commit('searchform/clearErrors')
      // Add Errors to form state
      Object.keys(self.formFields).forEach(function (key) {
        if (self.formFields[key].required) {
          if (
            !self.$store.state.application[key] ||
            self.$store.state.application[key].length <= 0
          ) {
            formIsValid = false
            if (
              self.formFields[key].hasOwnProperty('errorStr') &&
              self.formFields[key].errorStr.hasOwnProperty('required') &&
              self.formFields[key].errorStr.required
            ) {
              const errStr = self.formFields[key].errorStr.required
              self.$store.commit('searchform/addError', errStr.replace('$1', '<i>' + self.formFields[key].label + '</i>'))
            } else {
              self.$store.commit('searchform/addError', '<i>' + self.formFields[key].label + '</i> is required')
            }
          }
        }
      })
      // After error checking...
      if (
        formIsValid &&
        self.formErrors.length <= 0
      ) {
        // Form is valid
        self.$store.commit('searchform/addDatetime')
        // self.$store.commit('searchresults/setLoading', true)
        if (self.$router.history.current.name === 'search-results') {
          window.scrollTo(0, 0)
        } else {
          self.$router.push({
            name: 'search-results'
          })
        }
      } else {
        // Form is not valid
        window.scrollTo(0, 0)
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
