<template>
  <div>
    <form
      id="search-rates-form"
      @submit.prevent="formValidate"
      action="/search/results"
      method="POST"
      class="form form--search-rates"
    >
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
              value="PURCHASE"
            >
              {{ 'Purchase' | titlecase }}
            </option>
            <option
              value="REFINANCE"
            >
              {{ 'Refinance' | titlecase }}
            </option>
            <option
              value="CASH_OUT"
            >
              {{ 'Cash Out' | titlecase }}
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
              value="az"
            >
              {{ 'Arizona' | titlecase }}
            </option>
            <option
              value="ca"
            >
              {{ 'California' | titlecase }}
            </option>
            <option
              value="id"
            >
              {{ 'Idaho' | titlecase }}
            </option>
            <option
              value="ma"
            >
              {{ 'Massachusetts' | titlecase }}
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
              value="SINGLE_FAMILY"
            >
              {{ 'Single Family' | titlecase }}
            </option>
            <option
              value="CONDO_1_4_STORY"
            >
              {{ 'Condo (1-4 Story)' | titlecase }}
            </option>
            <option
              value="CONDO_5_8_STORY"
            >
              {{ 'Condo (5-8 Story)' | titlecase }}
            </option>
            <option
              value="CONDO_9_STORY"
            >
              {{ 'Condo (9+ Story)' | titlecase }}
            </option>
            <option
              value="PUD"
            >
              {{ 'PUD' | titlecase }}
            </option>
            <option
              value="TWO_UNIT"
            >
              {{ '2-Unit' | titlecase }}
            </option>
            <option
              value="THREE_UNIT"
            >
              {{ '3-Unit' | titlecase }}
            </option>
            <option
              value="FOUR_UNIT"
            >
              {{ '4-Unit' | titlecase }}
            </option>
            <option
              value="TOWNHOUSE"
            >
              {{ 'Townhouse' | titlecase }}
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
              value="PRIMARY_HOME"
            >
              {{ 'Primary Home' | titlecase }}
            </option>
            <option
              value="SECONDARY_HOME"
            >
              {{ 'Secondary Home' | titlecase }}
            </option>
            <option
              value="INVESTMENT_PROPERTY"
            >
              {{ 'Investment Property' | titlecase }}
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
              value="740"
            >
              740+ (Excellent)
            </option>
            <option
              value="720"
            >
              720 - 739
            </option>
            <option
              value="700"
            >
              700 - 719
            </option>
            <option
              value="680"
            >
              680 - 699
            </option>
            <option
              value="660"
            >
              660 - 679
            </option>
            <option
              value="640"
            >
              640 - 659
            </option>
            <option
              value="620"
            >
              620 - 639
            </option>
            <option
              value="600"
            >
              600 - 619
            </option>
            <option
              value="580"
            >
              580 - 599 (Poor)
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
              value="YES"
            >
              Yes
            </option>
            <option
              value="NO"
            >
              No
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
              value="YES"
            >
              Yes
            </option>
            <option
              value="NO"
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
          value="NO_CASH_OUT"
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
    applicationCompleted () {
      return this.$store.state.application.completed
    },
    searchResults () {
      return this.$store.state.loanProducts
    },
    loanpurpose: {
      get () {
        return this.$store.state.application.loanpurpose
      },
      set (value) {
        this.$store.commit('application/setloanpurpose', value)
      }
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
    state: {
      get () {
        return this.$store.state.application.state
      },
      set (value) {
        this.$store.commit('application/setstate', value)
      }
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
    propertyuse: {
      get () {
        return this.$store.state.application.propertyuse
      },
      set (value) {
        this.$store.commit('application/setpropertyuse', value)
      }
    },
    creditrating: {
      get () {
        return this.$store.state.application.creditrating
      },
      set (value) {
        this.$store.commit('application/setcreditrating', value)
      }
    },
    interestonly: {
      get () {
        return this.$store.state.application.interestonly
      },
      set (value) {
        this.$store.commit('application/setinterestonly', value)
      }
    },
    taxesandinsurance: {
      get () {
        return this.$store.state.application.taxesandinsurance
      },
      set (value) {
        this.$store.commit('application/settaxesandinsurance', value)
      }
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
      if (self.$router.history.current.name === 'search-results') {
        window.scrollTo(0, 0)
      } else {
        self.$router.push({
          name: 'search-results'
        })
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
