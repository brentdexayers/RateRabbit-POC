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
            :class="{ hasvalue: fields.loanpurpose !== null }"
            for="loanpurpose"
          >
            {{ 'Loan Purpose' | titlecase }}
          </label>
          <select
            v-model="fields.loanpurpose"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="loanpurpose"
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
              :value="index"
            >
              {{ option.name | titlecase }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: fields.propertyvalue }"
            for="propertyvalue"
          >
            {{ 'Property value' | titlecase }}
          </label>
          <input
            v-model="fields.propertyvalue"
            v-currency="{distractionFree: true}"
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
            :class="{ hasvalue: fields.loanamount }"
            for="loanamount"
          >
            {{ 'Loan Amount' | titlecase }}
          </label>
          <input
            v-model="fields.loanamount"
            v-currency="{currency: 'USD', locale: 'en', distractionFree: true}"
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
            {{ fields.ltv | percent(0) }} loan-to-value
          </div>
        </div>
      </div>
      <div class="form--search-rates__spacer form-group w-100" />
      <div class="row">
        <div class="form-group col-12 col-lg-6 form--search-rates__col--state">
          <label
            :class="{ hasvalue: fields.state !== null }"
            for="state"
          >
            {{ 'State' | titlecase }}
          </label>
          <select
            v-model="fields.state"
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
              :value="index"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="form-group col-12 col-lg-6 form--search-rates__col--zip">
          <label
            :class="{ hasvalue: fields.zipcode }"
            for="zipcode"
          >
            {{ 'Zip Code' | titlecase }}
          </label>
          <input
            v-model="fields.zipcode"
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
            :class="{ hasvalue: fields.propertytype !== null }"
            for="propertytype"
          >
            {{ 'Property Type' | titlecase }}
          </label>
          <select
            v-model="fields.propertytype"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="propertytype"
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
              :value="index"
            >
              {{ option.name | titlecase }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: fields.propertyuse !== null }"
            for="propertyuse"
          >
            {{ 'Property Use' | titlecase }}
          </label>
          <select
            v-model="fields.propertyuse"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="propertyuse"
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
              :value="index"
            >
              {{ option.name | titlecase }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <label
            :class="{ hasvalue: fields.creditrating !== null }"
            for="creditrating"
          >
            {{ 'Credit Rating' | titlecase }}
          </label>
          <select
            v-model="fields.creditrating"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="creditrating"
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
              :value="index"
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
            :class="{ hasvalue: fields.interestonly }"
            for="interestonly"
          >
            {{ 'Interest Only' | titlecase }}
          </label>
          <select
            v-model="fields.interestonly"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="interestonly"
            class="custom-select"
          >
            <option
              value="null"
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
            :class="{ hasvalue: fields.taxesandinsurance }"
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
            v-model="fields.taxesandinsurance"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
            name="taxesandinsurance"
            class="custom-select has-info"
          >
            <option
              value="null"
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
                    :class="{ hasvalue: fields.promotioncode }"
                    for="promotioncode"
                  >
                    {{ 'Promo Code' | titlecase }}
                  </label>
                  <input
                    v-model="fields.promotioncode"
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
                      v-model="fields.signup"
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
          v-model="fields.loanrefinancetype"
          name="loanrefinancetype"
          class="custom-control-input"
          value="NO_CASH_OUT"
        >
      </div>
    </form>
  </div>
</template>

<script>
import {
  authenticate,
  getCreditRating,
  // getLoanprogram,
  getLoanPurpose,
  getPropertyType,
  getPropertyUse,
  getState
} from '~/services/api'

export default {
  components: {
  },
  data () {
    return {
      fields: {
        hassignup: false,
        haspromotioncode: false,
        // Field Options
        loanPurposeOptions: {},
        propertyTypeOptions: {},
        propertyUseOptions: {},
        creditRatingOptions: {},
        stateOptions: {},
        // Field Values
        loanpurpose: null,
        propertyvalue: null,
        loanamount: null,
        ltv: 0,
        state: null,
        zipcode: null,
        propertytype: null,
        propertyuse: null,
        creditrating: null,
        interestonly: null,
        taxesandinsurance: null,
        loanrefinancetype: null,
        promotioncode: null,
        signup: false
      },
      // Form state
      submitButton: 'Search Live Rates',
      showForm: true,
      showResults: false
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
    this.loanPurposeOptions = await authenticate().then(res => getLoanPurpose(res))
    this.stateOptions = await authenticate().then(res => getState(res))
    this.propertyTypeOptions = await authenticate().then(res => getPropertyType(res))
    this.propertyUseOptions = await authenticate().then(res => getPropertyUse(res))
    this.creditRatingOptions = await authenticate().then(res => getCreditRating(res))
  },
  methods: {
    calculateLTV () {
      if (this.propertyvalue && this.loanamount) {
        this.fields.ltv = this.$parseCurrency(this.fields.loanamount) / this.$parseCurrency(this.fields.propertyvalue)
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
    handleFormSubmit () {
      // const self = this
      console.log('Form Submitted')
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
