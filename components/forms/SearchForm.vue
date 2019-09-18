<template>
  <form class="form form--search-rates">
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.loanPurpose"
          name="loanPurpose"
          class="custom-select"
        >
          <option
            value="Loan Purpose"
            disabled
            hidden
            selected
          >
            Loan Purpose
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option
            value="Purchase"
          >
            Purchase
          </option>
          <option
            value="Refinance"
          >
            Refinance
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <input
          v-model="searchForm.propertyValue"
          type="text"
          class="form-control"
          name="propertyValue"
          placeholder="Property Value"
          @change="calculateLTV"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <input
          v-model="searchForm.loanAmount"
          type="text"
          class="form-control"
          name="loanAmount"
          placeholder="Loan Amount"
          @change="calculateLTV"
        >
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="ltv wrapper wrapper--ltv form--search-rates__ltv">
          {{ searchForm.ltv }}% loan-to-value
        </div>
      </div>
    </div>
    <div class="form--search-rates__spacer form-group w-100" />
    <div class="row">
      <div class="form-group col-6">
        <label>Fixed Rates</label>
        <div class="custom-control custom-checkbox">
          <input
            id="fixed10"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="fixed10"
            type="checkbox"
          >
          <label class="custom-control-label" for="fixed10">10 Year Fixed</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="fixed15"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="fixed15"
            type="checkbox"
          >
          <label class="custom-control-label" for="fixed15">15 Year Fixed</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="fixed20"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="fixed20"
            type="checkbox"
          >
          <label class="custom-control-label" for="fixed20">20 Year Fixed</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="fixed30"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="fixed30"
            type="checkbox"
          >
          <label class="custom-control-label" for="fixed30">30 Year Fixed</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="fixed40"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="fixed40"
            type="checkbox"
          >
          <label class="custom-control-label" for="fixed40">40 Year Fixed</label>
        </div>
      </div>
      <div class="form-group col-6">
        <label>Adjustable Rates</label>
        <div class="custom-control custom-checkbox">
          <input
            id="adjustable3"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="adjustable3"
            type="checkbox"
          >
          <label class="custom-control-label" for="adjustable3">3 Year Arm</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="adjustable5"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="adjustable5"
            type="checkbox"
          >
          <label class="custom-control-label" for="adjustable5">5 Year Arm</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="adjustable7"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="adjustable7"
            type="checkbox"
          >
          <label class="custom-control-label" for="adjustable7">7 Year Arm</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="adjustable10"
            v-model="searchForm.loanProgram"
            class="custom-control-input"
            value="adjustable10"
            type="checkbox"
          >
          <label class="custom-control-label" for="adjustable10">10 Year Arm</label>
        </div>
      </div>
    </div>
    <div class="form--search-rates__spacer form-group w-100" />
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.state"
          name="state"
          class="custom-select"
        >
          <option
            value="State"
            disabled
            hidden
            selected
          >
            State
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option value="az">
            Arizona
          </option>
          <option value="ca">
            California
          </option>
          <option value="id">
            Idaho
          </option>
          <option value="ma">
            Massachusetts
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.county"
          name="county"
          class="custom-select"
        >
          <option
            value="County"
            disabled
            hidden
            selected
          >
            County
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.propertyType"
          name="propertyType"
          class="custom-select"
        >
          <option
            value="Property Type"
            disabled
            hidden
            selected
          >
            Property Type
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option value="Single Family">
            Single Family
          </option>
          <option value="Condo (1-4 Story)">
            Condo (1-4 Story)
          </option>
          <option value="Condo (5-8 Story)">
            Condo (5-8 Story)
          </option>
          <option value="Condo (9+ Story)">
            Condo (9+ Story)
          </option>
          <option value="PUD">
            PUD
          </option>
          <option value="2-Unit">
            2-Unit
          </option>
          <option value="3-Unit">
            3-Unit
          </option>
          <option value="4-Unit">
            4-Unit
          </option>
          <option value="Townhouse">
            Townhouse
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.propertyUse"
          name="propertyUse"
          class="custom-select"
        >
          <option
            value="Property Use"
            disabled
            hidden
            selected
          >
            Property Use
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option value="Primary Home">
            Primary Home
          </option>
          <option value="Secondary Home">
            Secondary Home
          </option>
          <option value="Investment Property">
            Investment Property
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.creditRating"
          name="creditRating"
          class="custom-select"
        >
          <option
            value="Credit Rating"
            disabled
            hidden
            selected
          >
            Credit Rating
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option value="740">
            740+ (Excellent)
          </option>
          <option value="720-739">
            720 - 739
          </option>
          <option value="700-719">
            700 - 719
          </option>
          <option value="680-699">
            680 - 699
          </option>
          <option value="660-679">
            660 - 679
          </option>
          <option value="640-659">
            640 - 659
          </option>
          <option value="620-639">
            620 - 639
          </option>
          <option value="600-619">
            600 - 619
          </option>
          <option value="580-599">
            580 - 599 (Poor)
          </option>
        </select>
      </div>
    </div>
    <div class="form--search-rates__spacer form-group w-100" />
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.interestOnly"
          name="interestOnly"
          class="custom-select"
        >
          <option
            value="Interest Only"
            disabled
            hidden
            selected
          >
            Interest Only
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option value="Yes">
            Yes
          </option>
          <option value="No">
            No
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.taxesInsurance"
          name="taxesInsurance"
          class="custom-select"
        >
          <option
            value="Taxes and Insurance"
            disabled
            hidden
            selected
          >
            Taxes &amp; Insurance
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option value="Yes">
            Yes
          </option>
          <option value="No">
            No
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <select
          v-model="searchForm.refinanceType"
          name="refinanceType"
          class="custom-select"
        >
          <option
            value="Refinance Type"
            disabled
            hidden
            selected
          >
            Refinance Type
          </option>
          <option
            value=""
            disabled
            hidden
          >
            ---
          </option>
          <option value="Cash Out">
            Cash Out
          </option>
          <option value="No Cash Out">
            No Cash Out
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <input
          class="btn btn-primary"
          type="submit"
          value="Submit"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <ul class="list-unstyled">
          <li>
            <p
              class="link-text form--search-rates__supplemental-links"
              @click="promoCode = !promoCode"
            >
              Do you have a promotional code?
            </p>
            <div
              v-if="promoCode"
              class="row"
            >
              <div class="col-12">
                <input
                  id="promoCode"
                  class="form-control"
                  type="text"
                  placeholder="Promo Code"
                  value=""
                >
              </div>
            </div>
          </li>
          <li>
            <p
              class="link-text form--search-rates__supplemental-links"
              @click="signUp = !signUp"
            >
              Sign Up for Rate Alerts
            </p>
            <div
              v-if="signUp"
              class="row"
            >
              <div class="col-12">
                <div class="custom-control custom-checkbox">
                  <input
                    id="signUp"
                    class="custom-control-input"
                    type="checkbox"
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
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        loanPurpose: 'Loan Purpose',
        propertyValue: '',
        loanAmount: '',
        ltv: 0,
        loanProgram: [],
        state: 'State',
        county: 'County',
        propertyType: 'Property Type',
        propertyUse: 'Property Use',
        creditRating: 'Credit Rating',
        interestOnly: 'Interest Only',
        taxesInsurance: 'Taxes and Insurance',
        refinanceType: 'Refinance Type',
        promoCode: false,
        signUp: false
      }
    }
  },
  methods: {
    calculateLTV () {
      if (this.searchForm.loanAmount > 0 && this.searchForm.propertyValue > 0) {
        this.searchForm.ltv = (this.searchForm.loanAmount / this.searchForm.propertyValue) * 100
      } else {
        this.searchForm.ltv = 0
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

.form--search-rates {
  &__ltv {
    margin: auto;
    margin-top: 15px;
    background-color: $gray-300;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    padding: 0 12px;
  }
  &__supplemental-links {
    &.link-text {
      color: $body-color;
    }
    font-size: 16px;
    line-height: 28px;
  }
}
</style>
