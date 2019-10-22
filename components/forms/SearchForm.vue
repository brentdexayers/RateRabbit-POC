<template>
  <div>
    <form
      id="search-rates-form"
      action="/search/results"
      method="POST"
      class="form form--search-rates"
      @submit.prevent="formValidate"
    >
      <div v-if="errors.length" class="form-errors form-errors--wrapper">
        <p>
          Please correct the following error(s):
        </p>
        <ul class="list form-errors__list">
          <li
            v-for="(error, i) in errors"
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
            v-if="$route.path == '/search/results' || $route.path == '/apply'"
            class="btn btn-outline-primary form--search-rates__submit"
            type="submit"
          >
            {{ 'Update Search' | titlecase }}
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
              <p
                class="link-text"
                :class="{label: hasPromoCode}"
                @click="hasPromoCode = !hasPromoCode"
              >
                Do you have a promotional code?
              </p>
              <div
                v-show="hasPromoCode"
                class="row"
              >
                <div class="form-group col-12">
                  <input
                    id="promoCode"
                    v-model="promoCode"
                    class="form-control"
                    type="text"
                    placeholder="Promo Code"
                    tabindex="-1"
                  >
                </div>
              </div>
            </li>
            <li class="form--search-rates__supplemental-link">
              <p
                class="link-text"
                :class="{'label label-list': hasSignUp}"
                @click="hasSignUp = !hasSignUp"
              >
                {{ 'Sign Up for Rate Alerts' }}
              </p>
              <div
                v-if="hasSignUp"
                class="row"
              >
                <div class="form-group col-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      id="signUp"
                      v-model="signUp"
                      class="custom-control-input"
                      type="checkbox"
                      tabindex="-1"
                    >
                    <label class="custom-control-label" for="signUp">Yes, I'd like to sign up!</label>
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
// import { mapMutations } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      loader: false
    }
  },
  computed: {
    form () {
      return this.$store.state.searchform
    },
    errors () {
      return this.$store.state.searchform.errors
    },
    loanPurpose: {
      get () {
        return this.$store.state.searchform.fields.loanPurpose.value
      },
      set (value) {
        this.$store.commit('searchform/addLoanPurpose', value)
      }
    },
    loanPurposeOptions () {
      return this.$store.state.searchform.fields.loanPurpose.options
    },
    propertyValue: {
      get () {
        return this.$store.state.searchform.fields.propertyValue.value
      },
      set (value) {
        this.$store.commit('searchform/addPropertyValue', value)
      }
    },
    loanAmount: {
      get () {
        return this.$store.state.searchform.fields.loanAmount.value
      },
      set (value) {
        this.$store.commit('searchform/addLoanAmount', value)
      }
    },
    ltv () {
      return this.$store.state.searchform.fields.ltv.value
    },
    loanProgram: {
      get () {
        return this.$store.state.searchform.fields.loanProgram.value
      },
      set (value) {
        this.$store.commit('searchform/addLoanProgram', value)
      }
    },
    loanProgramOptions () {
      return this.$store.state.searchform.fields.loanProgram.options
    },
    state: {
      get () {
        return this.$store.state.searchform.fields.state.value
      },
      set (value) {
        this.$store.commit('searchform/addState', value)
      }
    },
    stateOptions () {
      return this.$store.state.searchform.fields.state.options
    },
    county: {
      get () {
        return this.$store.state.searchform.fields.county.value
      },
      set (value) {
        this.$store.commit('searchform/addCounty', value)
      }
    },
    countyOptions () {
      return this.$store.state.searchform.fields.county.options
    },
    propertyType: {
      get () {
        return this.$store.state.searchform.fields.propertyType.value
      },
      set (value) {
        this.$store.commit('searchform/addPropertyType', value)
      }
    },
    propertyTypeOptions () {
      return this.$store.state.searchform.fields.propertyType.options
    },
    propertyUse: {
      get () {
        return this.$store.state.searchform.fields.propertyUse.value
      },
      set (value) {
        this.$store.commit('searchform/addPropertyUse', value)
      }
    },
    propertyUseOptions () {
      return this.$store.state.searchform.fields.propertyUse.options
    },
    creditRating: {
      get () {
        return this.$store.state.searchform.fields.creditRating.value
      },
      set (value) {
        this.$store.commit('searchform/addCreditRating', value)
      }
    },
    creditRatingOptions () {
      return this.$store.state.searchform.fields.creditRating.options
    },
    interestOnly: {
      get () {
        return this.$store.state.searchform.fields.interestOnly.value
      },
      set (value) {
        this.$store.commit('searchform/addInterestOnly', value)
      }
    },
    interestOnlyOptions () {
      return this.$store.state.searchform.fields.interestOnly.options
    },
    taxesInsurance: {
      get () {
        return this.$store.state.searchform.fields.taxesInsurance.value
      },
      set (value) {
        this.$store.commit('searchform/addTaxesInsurance', value)
      }
    },
    taxesInsuranceOptions () {
      return this.$store.state.searchform.fields.taxesInsurance.options
    },
    refinanceType: {
      get () {
        return this.$store.state.searchform.fields.refinanceType.value
      },
      set (value) {
        this.$store.commit('searchform/addRefinanceType', value)
      }
    },
    refinanceTypeOptions () {
      return this.$store.state.searchform.fields.refinanceType.options
    },
    hasPromoCode: {
      get () {
        return this.$store.state.searchform.fields.hasPromoCode.value
      },
      set (value) {
        this.$store.commit('searchform/addHasPromoCode', value)
      }
    },
    promoCode: {
      get () {
        return this.$store.state.searchform.fields.promoCode.value
      },
      set (value) {
        this.$store.commit('searchform/addPromoCode', value)
      }
    },
    hasSignUp: {
      get () {
        return this.$store.state.searchform.fields.hasSignUp.value
      },
      set (value) {
        this.$store.commit('searchform/addHasSignUp', value)
      }
    },
    signUp: {
      get () {
        return this.$store.state.searchform.fields.signUp.value
      },
      set (value) {
        this.$store.commit('searchform/addSignUp', value)
      }
    }
  },
  methods: {
    // ...mapMutations({
    //   add: 'searchform/add'
    // }),
    calculateLTV () {
      let ltv = 0
      if (this.propertyValue && this.loanAmount) {
        ltv = this.$parseCurrency(this.loanAmount, 'en', 'USD') / this.$parseCurrency(this.propertyValue, 'en', 'USD')
      }
      this.$store.commit('searchform/addLTV', ltv)
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
      let formIsValid = true
      const formErrors = []
      Object.keys(self.form.fields).forEach(function (key) {
        if (self.form.fields[key].required) {
          if (!self.form.fields[key].value || self.form.fields[key].value.length === 0) {
            formIsValid = false
            if (self.form.fields[key].hasOwnProperty('error') &&
              self.form.fields[key].error.hasOwnProperty('required') &&
              self.form.fields[key].error.required) {
              const errStr = self.form.fields[key].error.required
              formErrors.push(errStr.replace('$1', '<i>' + self.form.fields[key].label + '</i>'))
            } else {
              formErrors.push('<i>' + self.form.fields[key].label + '</i> is required')
            }
          }
        }
      })
      if (formIsValid) {
        formErrors.length = 0
        self.$store.commit('searchform/addErrors', formErrors)
        self.loader = true
        /* Do something here to retrieve search result data and push it to the store... */
        // const timeoutID = window.setTimeout(self.formRedirect, 2000)
        // window.scrollTo(0, 0)
        // return timeoutID
        self.$router.push({
          path: '/search/results'
        })
      } else {
        window.scrollTo(0, 0)
        self.$store.commit('searchform/addErrors', formErrors)
      }
    },
    formRedirect () {
      const self = this
      window.scrollTo(0, 0)
      self.loader = false
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
