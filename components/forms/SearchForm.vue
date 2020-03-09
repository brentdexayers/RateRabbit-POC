<template>
  <div>
    <form
      id="search-rates-form"
      @submit.prevent="formValidate"
      action="/search/results"
      method="POST"
      class="form form--search-rates"
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
            :class="{ hasvalue: loanpurpose }"
            for="loanpurpose"
          >
            {{ 'Loan Purpose' | titlecase }}
          </label>
          <select
            v-model="loanpurpose"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="loanpurpose"
            class="custom-select"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in loanpurposeOptions"
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
            :class="{ hasvalue: propertyvalue }"
            for="propertyvalue"
          >
            {{ 'Property value' | titlecase }}
          </label>
          <input
            v-model="propertyvalue"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
            @change="calculateLTV"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="propertyvalue"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: loanamount }"
            for="loanamount"
          >
            {{ 'Loan Amount' | titlecase }}
          </label>
          <input
            v-model="loanamount"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
            @change="calculateLTV"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="loanamount"
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
            :class="{ hasvalue: state }"
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
        <div class="form-group col-12 col-lg-6 form--search-rates__col--zip">
          <label
            :class="{ hasvalue: zipcode }"
            for="zipcode"
          >
            {{ 'Zip Code' | titlecase }}
          </label>
          <input
            v-model="zipcode"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            type="text"
            name="zipcode"
            class="form-control"
            placeholder=""
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: propertytype }"
            for="propertytype"
          >
            {{ 'Property Type' | titlecase }}
          </label>
          <select
            v-model="propertytype"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="propertytype"
            class="custom-select"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in propertytypeOptions"
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
            :class="{ hasvalue: propertyuse }"
            for="propertyuse"
          >
            {{ 'Property Use' | titlecase }}
          </label>
          <select
            v-model="propertyuse"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="propertyuse"
            class="custom-select"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in propertyuseOptions"
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
            :class="{ hasvalue: creditrating }"
            for="creditrating"
          >
            {{ 'Credit Rating' | titlecase }}
          </label>
          <select
            v-model="creditrating"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="creditrating"
            class="custom-select"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in creditratingOptions"
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
            :class="{ hasvalue: interestonly }"
            for="interestonly"
          >
            {{ 'Interest Only' | titlecase }}
          </label>
          <select
            v-model="interestonly"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="interestonly"
            class="custom-select"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in interestonlyOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="form-group col-12 form--search-rates__col--taxes">
          <label
            :class="{ hasvalue: taxesandinsurance }"
            for="taxesandinsurance"
          >
            {{ 'Taxes & Insurance' | titlecase }}
            <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
            <b-tooltip target="taxes-tooltip" triggers="hover">
              Including your taxes and insurance with your monthly payment may result in a lower rate or loan fee
            </b-tooltip>
          </label>
          <select
            id="input-select--taxes"
            v-model="taxesandinsurance"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="taxesandinsurance"
            class="custom-select has-info"
          >
            <option
              value=""
              disabled
              hidden
            />
            <option
              v-for="(option, i) in taxesandinsuranceOptions"
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
            v-if="Object.entries(searchResults).length === 0 && searchResults.constructor === Object"
            type="submit"
            class="btn btn-outline-primary form--search-rates__submit"
          >
            {{ 'Update Search' | titlecase }}
          </button>
          <button
            v-else-if="applicationCompleted"
            type="submit"
            class="btn btn-primary form--search-rates__submit"
          >
            {{ 'Start New Search' | titlecase }}
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-primary form--search-rates__submit"
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
                    :class="{ hasvalue: promotioncode }"
                    for="promotioncode"
                  >
                    {{ 'Promo Code' | titlecase }}
                  </label>
                  <input
                    v-model="promotioncode"
                    @focus="focusClassAdd($event)"
                    @blur="focusClassRemove($event)"
                    type="text"
                    name="promotioncode"
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
                      id="signup"
                      v-model="signup"
                      type="checkbox"
                      class="custom-control-input"
                    >
                    <label
                      class="custom-control-label"
                      for="signup"
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
      <div class="hidden">
        <input
          id="input-hidden--refinance-type"
          v-model="loanrefinancetype"
          name="loanrefinancetype"
          class="custom-control-input"
        >
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
      hassignup: false,
      haspromotioncode: false
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
      return this.$store.state.searchresults.loanProducts
    },
    formFields () {
      return this.$store.state.searchform.fields
    },
    formErrors () {
      return this.$store.state.searchform.errors
    },
    loanpurpose: {
      get () {
        return this.$store.state.application.loanpurpose
      },
      set (value) {
        this.$store.commit('application/setloanpurpose', value)
      }
    },
    loanpurposeOptions () {
      return this.$store.state.searchform.fields.loanpurpose.options
    },
    propertyvalue: {
      get () {
        return this.$store.state.application.propertyvalue
      },
      set (value) {
        this.$store.commit('application/setpropertyvalue', value)
      }
    },
    loanamount: {
      get () {
        return this.$store.state.application.loanamount
      },
      set (value) {
        this.$store.commit('application/setloanamount', value)
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
    // loanprogram: {
    //   get () {
    //     return this.$store.state.application.loanprogram
    //   },
    //   set (value) {
    //     this.$store.commit('application/setloanprogram', value)
    //   }
    // },
    loanprogramOptions () {
      return this.$store.state.searchform.fields.loanprogram.options
    },
    state: {
      get () {
        return this.$store.state.application.state
      },
      set (value) {
        this.$store.commit('application/setstate', value)
      }
    },
    stateOptions () {
      return this.$store.state.searchform.fields.state.options
    },
    zipcode: {
      get () {
        return this.$store.state.application.zipcode
      },
      set (value) {
        this.$store.commit('application/setzipcode', value)
      }
    },
    propertytype: {
      get () {
        return this.$store.state.application.propertytype
      },
      set (value) {
        this.$store.commit('application/setpropertytype', value)
      }
    },
    propertytypeOptions () {
      return this.$store.state.searchform.fields.propertytype.options
    },
    propertyuse: {
      get () {
        return this.$store.state.application.propertyuse
      },
      set (value) {
        this.$store.commit('application/setpropertyuse', value)
      }
    },
    propertyuseOptions () {
      return this.$store.state.searchform.fields.propertyuse.options
    },
    creditrating: {
      get () {
        return this.$store.state.application.creditrating
      },
      set (value) {
        this.$store.commit('application/setcreditrating', value)
      }
    },
    creditratingOptions () {
      return this.$store.state.searchform.fields.creditrating.options
    },
    interestonly: {
      get () {
        return this.$store.state.application.interestonly
      },
      set (value) {
        this.$store.commit('application/setinterestonly', value)
      }
    },
    interestonlyOptions () {
      return this.$store.state.searchform.fields.interestonly.options
    },
    taxesandinsurance: {
      get () {
        return this.$store.state.application.taxesandinsurance
      },
      set (value) {
        this.$store.commit('application/settaxesandinsurance', value)
      }
    },
    taxesandinsuranceOptions () {
      return this.$store.state.searchform.fields.taxesandinsurance.options
    },
    loanrefinancetype: {
      get () {
        return this.$store.state.application.loanrefinancetype
      },
      set (value) {
        this.$store.commit('application/setloanrefinancetype', value)
      }
    },
    promotioncode: {
      get () {
        return this.$store.state.application.promotioncode
      },
      set (value) {
        this.$store.commit('application/setpromotioncode', value)
      }
    },
    signup: {
      get () {
        return this.$store.state.application.signup
      },
      set (value) {
        this.$store.commit('application/setsignup', value)
      }
    }
  },
  methods: {
    calculateLTV () {
      let ltv = 0
      if (this.propertyvalue && this.loanamount) {
        ltv = this.$parseCurrency(this.loanamount, 'en', 'USD') / this.$parseCurrency(this.propertyvalue, 'en', 'USD')
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
