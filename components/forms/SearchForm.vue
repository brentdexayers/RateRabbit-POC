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
      <div class="form-group col-12 form--search-rates__col--state">
        <select
          v-model="searchForm.state"
          name="state"
          class="custom-select"
          @change="setCountyOptions"
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
          <option
            v-for="option in searchForm.stateOptions"
            :key="option.value"
            :value="option.value"
            :title="option.text"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="form-group col-12 form--search-rates__col--county">
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
          <option
            v-for="option in searchForm.countyOptionsCurrent"
            :key="option.value"
            :value="option.value"
            :title="option.text"
          >
            {{ option.text }}
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
      <div class="form-group col-12 form--search-rates__col--interest">
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
      <div class="form-group col-12 form--search-rates__col--taxes">
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
      <div class="form-group col-12 form--search-rates__col--submit">
        <input
          class="btn btn-primary form--search-rates__submit"
          type="submit"
          :value="cta"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <ul class="list-unstyled form--search-rates__supplemental-links">
          <li class="form--search-rates__supplemental-link">
            <p
              class="link-text"
              @click="searchForm.promoCode = !searchForm.promoCode"
            >
              Do you have a promotional code?
            </p>
            <div
              v-if="searchForm.promoCode"
              class="row"
            >
              <div class="form-group col-12">
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
          <li class="form--search-rates__supplemental-link">
            <p
              class="link-text"
              @click="searchForm.signUp = !searchForm.signUp"
            >
              Sign Up for Rate Alerts
            </p>
            <div
              v-if="searchForm.signUp"
              class="row"
            >
              <div class="form-group col-12">
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
  props: {
    cta: {
      type: String,
      default: 'Search Live Rates'
    }
  },
  data () {
    return {
      searchForm: {
        loanPurpose: 'Loan Purpose',
        propertyValue: '',
        loanAmount: '',
        ltv: 0,
        loanProgram: [],
        state: 'State',
        stateOptions: [
          { text: 'Arizona', value: 'az' },
          { text: 'California', value: 'ca' },
          { text: 'Idaho', value: 'id' },
          { text: 'Massachusetts', value: 'ma' }
        ],
        county: 'County',
        countyOptionsAll: {
          az: [
            { text: 'APACHE', value: '159' },
            { text: 'COCHISE', value: '160' },
            { text: 'COCONINO', value: '161' },
            { text: 'GILA', value: '162' },
            { text: 'GRAHAM', value: '163' },
            { text: 'GREENLEE', value: '164' },
            { text: 'LA PAZ', value: '165' },
            { text: 'MARICOPA', value: '166' },
            { text: 'MOHAVE', value: '167' },
            { text: 'NAVAJO', value: '168' },
            { text: 'PIMA', value: '169' },
            { text: 'PINAL', value: '170' },
            { text: 'PINAL W RT 77', value: '171' },
            { text: 'SANTA CRUZ', value: '172' },
            { text: 'YAVAPAI', value: '173' },
            { text: 'YUMA', value: '174' }
          ],
          ca: [
            { text: 'ALAMEDA', value: '175' },
            { text: 'ALPINE', value: '176' },
            { text: 'AMADOR', value: '177' },
            { text: 'BUTTE', value: '178' },
            { text: 'CALAVERAS', value: '179' },
            { text: 'COLUSA', value: '180' },
            { text: 'CONTRA COSTA', value: '181' },
            { text: 'DEL NORTE', value: '182' },
            { text: 'EL DORADO', value: '183' },
            { text: 'FRESNO', value: '184' },
            { text: 'GLENN', value: '185' },
            { text: 'HUMBOLDT', value: '186' },
            { text: 'IMPERIAL', value: '187' },
            { text: 'INYO', value: '188' },
            { text: 'KERN', value: '189' },
            { text: 'KINGS', value: '190' },
            { text: 'LAKE', value: '191' },
            { text: 'LASSEN', value: '192' },
            { text: 'LOS ANGELES', value: '193' },
            { text: 'MADERA', value: '194' },
            { text: 'MARIN', value: '195' },
            { text: 'MARIPOSA', value: '196' },
            { text: 'MENDOCINO', value: '197' },
            { text: 'MERCED', value: '198' },
            { text: 'MODOC', value: '199' },
            { text: 'MONO', value: '200' },
            { text: 'MONTEREY', value: '201' },
            { text: 'NAPA', value: '202' },
            { text: 'NEVADA', value: '203' },
            { text: 'ORANGE', value: '204' },
            { text: 'PLACER', value: '205' },
            { text: 'PLUMAS', value: '206' },
            { text: 'RIVERSIDE', value: '207' },
            { text: 'SACRAMENTO', value: '208' },
            { text: 'SAN BENITO', value: '209' },
            { text: 'SAN BERNARDINO', value: '210' },
            { text: 'SAN DIEGO', value: '211' },
            { text: 'SAN FRANCISCO', value: '212' },
            { text: 'SAN JOAQUIN', value: '213' },
            { text: 'SAN LUIS OBISPO', value: '214' },
            { text: 'SAN MATEO', value: '215' },
            { text: 'SANTA BARBARA', value: '216' },
            { text: 'SANTA CLARA', value: '217' },
            { text: 'SANTA CRUZ', value: '218' },
            { text: 'SHASTA', value: '219' },
            { text: 'SIERRA', value: '220' },
            { text: 'SISKIYOU', value: '221' },
            { text: 'SOLANO', value: '222' },
            { text: 'SONOMA', value: '223' },
            { text: 'STANISLAUS', value: '224' },
            { text: 'SUTTER', value: '225' },
            { text: 'TEHAMA', value: '226' },
            { text: 'TRINITY', value: '227' },
            { text: 'TULARE', value: '228' },
            { text: 'TUOLUMNE', value: '229' },
            { text: 'VENTURA', value: '230' },
            { text: 'YOLO', value: '231' },
            { text: 'YUBA', value: '232' }
          ],
          id: [
            { text: 'ADA', value: '639' },
            { text: 'ADAMS', value: '640' },
            { text: 'BANNOCK', value: '641' },
            { text: 'BEAR LAKE', value: '642' },
            { text: 'BENEWAH', value: '643' },
            { text: 'BINGHAM', value: '644' },
            { text: 'BLAINE', value: '645' },
            { text: 'BOISE', value: '646' },
            { text: 'BONNER', value: '647' },
            { text: 'BONNEVILLE', value: '648' },
            { text: 'BOUNDARY', value: '649' },
            { text: 'BUTTE', value: '650' },
            { text: 'CAMAS', value: '651' },
            { text: 'CANYON', value: '652' },
            { text: 'CARIBOU', value: '653' },
            { text: 'CASSIA', value: '654' },
            { text: 'CLARK', value: '655' },
            { text: 'CLEARWATER', value: '656' },
            { text: 'CUSTER', value: '657' },
            { text: 'ELMORE', value: '658' },
            { text: 'FRANKLIN', value: '659' },
            { text: 'FREMONT', value: '660' },
            { text: 'GEM', value: '661' },
            { text: 'GOODING', value: '662' },
            { text: 'IDAHO', value: '663' },
            { text: 'JEFFERSON', value: '664' },
            { text: 'JEROME', value: '665' },
            { text: 'KOOTENAI', value: '666' },
            { text: 'LATAH', value: '667' },
            { text: 'LEMHI', value: '668' },
            { text: 'LEWIS', value: '669' },
            { text: 'LINCOLN', value: '670' },
            { text: 'MADISON', value: '671' },
            { text: 'MINIDOKA', value: '672' },
            { text: 'NEZ PERCE', value: '673' },
            { text: 'ONEIDA', value: '674' },
            { text: 'OWYHEE', value: '675' },
            { text: 'PAYETTE', value: '676' },
            { text: 'POWER', value: '677' },
            { text: 'SHOSHONE', value: '678' },
            { text: 'TETON', value: '679' },
            { text: 'TWIN FALLS', value: '680' },
            { text: 'VALLEY', value: '681' },
            { text: 'WASHINGTON', value: '682' }
          ],
          ma: [
            { text: 'BARNSTABLE', value: '1166' },
            { text: 'BERKSHIRE', value: '1167' },
            { text: 'BRISTOL', value: '1168' },
            { text: 'DUKES', value: '1169' },
            { text: 'ESSEX', value: '1170' },
            { text: 'FRANKLIN', value: '1171' },
            { text: 'HAMPDEN', value: '1172' },
            { text: 'HAMPSHIRE', value: '1173' },
            { text: 'MIDDLESEX', value: '1174' },
            { text: 'NANTUCKET', value: '1175' },
            { text: 'NORFOLK', value: '1176' },
            { text: 'PLYMOUTH', value: '1177' },
            { text: 'SUFFOLK', value: '1178' },
            { text: 'WORCESTER', value: '1179' }
          ]
        },
        countyOptionsCurrent: [
          { text: 'Please select a State', value: '0' }
        ],
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
    },
    setCountyOptions () {
      this.searchForm.countyOptionsCurrent = this.searchForm.countyOptionsAll[this.searchForm.state]
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
    margin-top: 15px;
    background-color: $gray-300;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    padding: 0 12px;
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
}
</style>
