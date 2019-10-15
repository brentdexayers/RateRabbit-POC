<template>
  <form
    id=""
    action=""
    method="POST"
    class="form form--search-rates"
    @submit="validateForm"
  >
    <p v-if="formErrors.length" class="text-danger">
      <b>Please correct the following error(s):</b>
      <ul class="list-unstyled">
        <li
          v-for="(error, i) in formErrors"
          :key="i"
        >
          {{ error }}
        </li>
      </ul>
    </p>
    <div class="row">
      <div class="form-group col-12">
        <label
          for="loanPurpose"
          :class="{ hasvalue: searchForm.loanPurpose }"
        >
          {{ 'Loan Purpose' | titlecase }}
        </label>
        <select
          v-model="searchForm.loanPurpose"
          name="loanPurpose"
          class="custom-select"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
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
        <label
          for="propertyValue"
          :class="{ hasvalue: searchForm.propertyValue }"
        >
          {{ 'Property value' | titlecase }}
        </label>
        <input
          v-model="searchForm.propertyValue"
          v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
          type="text"
          class="form-control"
          name="propertyValue"
          placeholder=""
          @change="calculateLTV"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <label
          for="loanAmount"
          :class="{ hasvalue: searchForm.loanAmount }"
        >
          {{ 'Loan Amount' | titlecase }}
        </label>
        <input
          v-model="searchForm.loanAmount"
          v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
          type="text"
          class="form-control"
          name="loanAmount"
          placeholder=""
          @change="calculateLTV"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
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
      <div
        v-for="(program, i) in searchFormOptions.loanProgramOptions"
        :key="i"
        class="form-group col-6 form--search-rates__form-group--program-options"
      >
        <label class="form--search-rates__form-group--program-options__label">
          {{ program.name }}
          <template v-if="program.tooltip">
            <img :id="concat('program-options-tooltip-', i)" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
            <b-tooltip :target="concat('program-options-tooltip-', i)" triggers="hover">
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
              v-model="searchForm.loanProgram"
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
          :class="{ hasvalue: searchForm.state }"
        >
          {{ 'State' | titlecase }}
        </label>
        <select
          v-model="searchForm.state"
          name="state"
          class="custom-select"
          @change="setCountyOptions"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
          <option
            v-for="option in searchFormOptions.stateOptions"
            :key="option.value"
            :value="option.value"
            :title="option.text"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="form-group col-12 form--search-rates__col--county">
        <label
          for="county"
          :class="{ hasvalue: searchForm.county }"
        >
          {{ 'County' | titlecase }}
        </label>
        <select
          v-model="searchForm.county"
          name="county"
          class="custom-select"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
          <option
            v-for="option in searchFormOptions.countyOptionsCurrent"
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
        <label
          for="propertyType"
          :class="{ hasvalue: searchForm.propertyType }"
        >
          {{ 'Property Type' | titlecase }}
        </label>
        <select
          v-model="searchForm.propertyType"
          name="propertyType"
          class="custom-select"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
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
        <label
          for="propertyUse"
          :class="{ hasvalue: searchForm.propertyUse }"
        >
          {{ 'Property Use' | titlecase }}
        </label>
        <select
          v-model="searchForm.propertyUse"
          name="propertyUse"
          class="custom-select"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
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
        <label
          for="creditRating"
          :class="{ hasvalue: searchForm.creditRating }"
        >
          {{ 'Credit Rating' | titlecase }}
        </label>
        <select
          v-model="searchForm.creditRating"
          name="creditRating"
          class="custom-select"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
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
        <label
          for="interestOnly"
          :class="{ hasvalue: searchForm.interestOnly }"
        >
          {{ 'Interest Only' | titlecase }}
        </label>
        <select
          v-model="searchForm.interestOnly"
          name="interestOnly"
          class="custom-select"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
          <option value="Yes">
            Yes
          </option>
          <option value="No">
            No
          </option>
        </select>
      </div>
      <div class="form-group col-12 form--search-rates__col--taxes">
        <label
          for="taxesInsurance"
          :class="{ hasvalue: searchForm.taxesInsurance }"
        >
          {{ 'Taxes & Insurance' | titlecase }}
          <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
          <b-tooltip target="taxes-tooltip" triggers="hover">
            Including your taxes and insurance with your monthly payment may result in a lower rate or loan fee
          </b-tooltip>
        </label>
        <select
          id="input-select--taxes"
          v-model="searchForm.taxesInsurance"
          name="taxesInsurance"
          class="custom-select has-info"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
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
        <label
          for="refinanceType"
          :class="{ hasvalue: searchForm.refinanceType }"
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
          v-model="searchForm.refinanceType"
          name="refinanceType"
          class="custom-select has-info"
          @focus="setFocus($event)"
          @blur="unFocus($event)"
        >
          <option
            value=""
            disabled
            hidden
          />
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
        <button
          class="btn btn-primary form--search-rates__submit"
          type="submit"
        >
          {{ cta }}
        </button>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <ul class="list-unstyled form--search-rates__supplemental-links">
          <li class="form--search-rates__supplemental-link">
            <p
              class="link-text"
              :class="{label: searchForm.hasPromoCode}"
              @click="searchForm.hasPromoCode = !searchForm.hasPromoCode"
            >
              Do you have a promotional code?
            </p>
            <div
              v-show="searchForm.hasPromoCode"
              class="row"
            >
              <div class="form-group col-12">
                <input
                  id="promoCode"
                  v-model="searchForm.promoCode"
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
              :class="{'label label-list': searchForm.hasSignUp}"
              @click="searchForm.hasSignUp = !searchForm.hasSignUp"
            >
              Sign Up for Rate Alerts
            </p>
            <div
              v-if="searchForm.hasSignUp"
              class="row"
            >
              <div class="form-group col-12">
                <div class="custom-control custom-checkbox">
                  <input
                    id="signUp"
                    v-model="searchForm.signUp"
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
    <button
      class="btn btn-secondary btn-sm"
      @click.prevent="resetSearchForm"
    >
      Reset
    </button>
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
      searchFormOptions: {
        loanProgramOptions: [
          {
            name: 'Fixed Rates',
            tooltip: 'Fixed Rates are mortgages in which the interest rate does not change during the entire term of the loan.',
            terms: [
              {
                label: '10 Year Fixed',
                value: 'fixed10yr'
              },
              {
                label: '15 Year Fixed',
                value: 'fixed15yr'
              },
              {
                label: '20 Year Fixed',
                value: 'fixed20yr'
              },
              {
                label: '30 Year Fixed',
                value: 'fixed30yr'
              },
              {
                label: '40 Year Fixed',
                value: 'fixed40yr'
              }
            ]
          },
          {
            name: 'Adjustable Rates',
            tooltip: 'Adjustable Rates permit the lender to adjust the mortgage interest rate periodically on the basis of changes in a specified index. The interest rates on these loans will be fixed for a specified period of time, then will become adjustable for the remaining years of the loan. Once adjustable, the interest rates may move up or down, as market conditions change.',
            terms: [
              {
                label: '3 Year Arm',
                value: 'arm3yr'
              },
              {
                label: '5 Year Arm',
                value: 'arm5yr'
              },
              {
                label: '7 Year Arm',
                value: 'arm7yr'
              },
              {
                label: '10 Year Arm',
                value: 'arm10yr'
              }
            ]
          }
        ],
        stateOptions: [
          { text: 'Arizona', value: 'az' },
          { text: 'California', value: 'ca' },
          { text: 'Idaho', value: 'id' },
          { text: 'Massachusetts', value: 'ma' }
        ],
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
        ]
      },
      searchForm: {
        loanPurpose: '',
        propertyValue: '',
        loanAmount: '',
        ltv: 0,
        loanProgram: [],
        state: '',
        county: '',
        propertyType: '',
        propertyUse: '',
        creditRating: '',
        interestOnly: '',
        taxesInsurance: '',
        refinanceType: '',
        hasPromoCode: false,
        promoCode: '',
        hasSignUp: false,
        signUp: false
      },
      formErrors: []
    }
  },
  watch: {
    'searchForm.loanPurpose' (newloanPurpose) {
      localStorage.loanPurpose = newloanPurpose
    },
    'searchForm.propertyValue' (newpropertyValue) {
      localStorage.propertyValue = newpropertyValue
      this.calculateLTV()
    },
    'searchForm.loanAmount' (newloanAmount) {
      localStorage.loanAmount = newloanAmount
      this.calculateLTV()
    },
    'searchForm.loanProgram' (newloanProgram) {
      localStorage.loanProgram = JSON.stringify(newloanProgram)
    },
    'searchForm.state' (newstate) {
      localStorage.state = newstate
    },
    'searchForm.county' (newcounty) {
      localStorage.county = newcounty
    },
    'searchForm.propertyType' (newpropertyType) {
      localStorage.propertyType = newpropertyType
    },
    'searchForm.propertyUse' (newpropertyUse) {
      localStorage.propertyUse = newpropertyUse
    },
    'searchForm.creditRating' (newcreditRating) {
      localStorage.creditRating = newcreditRating
    },
    'searchForm.interestOnly' (newinterestOnly) {
      localStorage.interestOnly = newinterestOnly
    },
    'searchForm.taxesInsurance' (newtaxesInsurance) {
      localStorage.taxesInsurance = newtaxesInsurance
    },
    'searchForm.refinanceType' (newrefinanceType) {
      localStorage.refinanceType = newrefinanceType
    },
    'searchForm.promoCode' (newpromoCode) {
      localStorage.promoCode = newpromoCode
    },
    'searchForm.signUp' (newsignUp) {
      localStorage.signUp = newsignUp
    }
  },
  mounted () {
    if (localStorage.loanPurpose) {
      this.searchForm.loanPurpose = localStorage.loanPurpose
    }
    if (localStorage.propertyValue) {
      this.searchForm.propertyValue = localStorage.propertyValue
    }
    if (localStorage.loanAmount) {
      this.searchForm.loanAmount = localStorage.loanAmount
    }
    if (localStorage.loanProgram) {
      this.searchForm.loanProgram = JSON.parse(localStorage.loanProgram)
    }
    if (localStorage.state) {
      this.searchForm.state = localStorage.state
      this.setCountyOptions()
    }
    if (localStorage.county) {
      this.searchForm.county = localStorage.county
    }
    if (localStorage.propertyType) {
      this.searchForm.propertyType = localStorage.propertyType
    }
    if (localStorage.propertyUse) {
      this.searchForm.propertyUse = localStorage.propertyUse
    }
    if (localStorage.creditRating) {
      this.searchForm.creditRating = localStorage.creditRating
    }
    if (localStorage.interestOnly) {
      this.searchForm.interestOnly = localStorage.interestOnly
    }
    if (localStorage.taxesInsurance) {
      this.searchForm.taxesInsurance = localStorage.taxesInsurance
    }
    if (localStorage.refinanceType) {
      this.searchForm.refinanceType = localStorage.refinanceType
    }
    if (localStorage.promoCode) {
      this.searchForm.promoCode = localStorage.promoCode
    }
    if (localStorage.signUp) {
      this.searchForm.signUp = localStorage.signUp
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
      this.searchFormOptions.countyOptionsCurrent = this.searchFormOptions.countyOptionsAll[this.searchForm.state]
    },
    concat (value, value1) {
      return value.concat(value1)
    },
    setFocus (event) {
      const self = event.target
      self.previousElementSibling.classList.add('focused')
    },
    unFocus (event) {
      const self = event.target
      self.previousElementSibling.classList.remove('focused')
    },
    resetSearchForm () {
      Object.keys(this.searchForm).forEach(function (key) {
        this.searchForm[key] = ''
        if (localStorage[key]) {
          localStorage[key] = ''
        }
      })
      this.setCountyOptions()
      this.$store.commit('resetSearchForm')
    },
    validateForm (e) {
      e.preventDefault()
      if (this.searchForm.loanPurpose && this.searchForm.propertyValue && this.searchForm.loanAmount && this.searchForm.loanProgram && this.searchForm.state && this.searchForm.county && this.searchForm.propertyType && this.searchForm.propertyUse && this.searchForm.creditRating && this.searchForm.interestOnly && this.searchForm.taxesInsurance && this.searchForm.refinanceType) {
        // this.$root.$emit('search-form-submit', this.searchForm)
        this.$store.commit('updateSearchForm', this.searchForm)
        this.$router.push({
          path: '/search/results'
        })
        return true
      } else {
        this.formErrors = []
        if (!this.searchForm.loanPurpose) {
          this.formErrors.push('Loan Purpose required.')
        }
        if (!this.searchForm.propertyValue) {
          this.formErrors.push('Property Value required')
        }
        if (!this.searchForm.loanAmount) {
          this.formErrors.push('Loan Amount required')
        }
        if (!this.searchForm.loanProgram) {
          this.formErrors.push('Loan Program required')
        }
        if (!this.searchForm.state) {
          this.formErrors.push('State required')
        }
        if (!this.searchForm.county) {
          this.formErrors.push('County required')
        }
        if (!this.searchForm.propertyType) {
          this.formErrors.push('Property Type required')
        }
        if (!this.searchForm.propertyUse) {
          this.formErrors.push('Property Use required')
        }
        if (!this.searchForm.creditRating) {
          this.formErrors.push('Credit Rating required')
        }
        if (!this.searchForm.interestOnly) {
          this.formErrors.push('Interest Only required')
        }
        if (!this.searchForm.taxesInsurance) {
          this.formErrors.push('Taxes and Insurance required')
        }
        if (!this.searchForm.refinanceType) {
          this.formErrors.push('Refinance Type required')
        }
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
</style>
