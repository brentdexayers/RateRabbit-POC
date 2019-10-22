export const state = () => ({
  errors: [],
  fields: {
    loanPurpose: {
      value: '',
      default: '',
      label: 'Loan Purpose',
      options: [
        { label: 'Purchase', value: 'purchase' },
        { label: 'Refinance', value: 'refinance' }
      ],
      required: true
    },
    propertyValue: {
      value: '',
      default: '',
      label: 'Property Value',
      required: true
    },
    loanAmount: {
      value: '',
      default: '',
      label: 'Loan Amount',
      required: true
    },
    ltv: {
      value: 0,
      default: 0,
      label: 'loan-to-value',
      required: false
    },
    loanProgram: {
      value: [],
      default: [],
      label: 'Loan Programs',
      options: [
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
      required: true,
      type: 'checkbox',
      error: {
        required: '$1 are required',
        invalid: '$1 are invalid'
      }
    },
    state: {
      value: '',
      default: '',
      label: 'State',
      options: [
        { label: 'Arizona', value: 'az' },
        { label: 'California', value: 'ca' },
        { label: 'Idaho', value: 'id' },
        { label: 'Massachusetts', value: 'ma' }
      ],
      required: true,
      type: 'select'
    },
    county: {
      value: '',
      default: '',
      label: 'County',
      options: {
        default: [
          { label: 'Please select a State', value: '0' }
        ],
        az: [
          { label: 'APACHE', value: '159' },
          { label: 'COCHISE', value: '160' },
          { label: 'COCONINO', value: '161' },
          { label: 'GILA', value: '162' },
          { label: 'GRAHAM', value: '163' },
          { label: 'GREENLEE', value: '164' },
          { label: 'LA PAZ', value: '165' },
          { label: 'MARICOPA', value: '166' },
          { label: 'MOHAVE', value: '167' },
          { label: 'NAVAJO', value: '168' },
          { label: 'PIMA', value: '169' },
          { label: 'PINAL', value: '170' },
          { label: 'PINAL W RT 77', value: '171' },
          { label: 'SANTA CRUZ', value: '172' },
          { label: 'YAVAPAI', value: '173' },
          { label: 'YUMA', value: '174' }
        ],
        ca: [
          { label: 'ALAMEDA', value: '175' },
          { label: 'ALPINE', value: '176' },
          { label: 'AMADOR', value: '177' },
          { label: 'BUTTE', value: '178' },
          { label: 'CALAVERAS', value: '179' },
          { label: 'COLUSA', value: '180' },
          { label: 'CONTRA COSTA', value: '181' },
          { label: 'DEL NORTE', value: '182' },
          { label: 'EL DORADO', value: '183' },
          { label: 'FRESNO', value: '184' },
          { label: 'GLENN', value: '185' },
          { label: 'HUMBOLDT', value: '186' },
          { label: 'IMPERIAL', value: '187' },
          { label: 'INYO', value: '188' },
          { label: 'KERN', value: '189' },
          { label: 'KINGS', value: '190' },
          { label: 'LAKE', value: '191' },
          { label: 'LASSEN', value: '192' },
          { label: 'LOS ANGELES', value: '193' },
          { label: 'MADERA', value: '194' },
          { label: 'MARIN', value: '195' },
          { label: 'MARIPOSA', value: '196' },
          { label: 'MENDOCINO', value: '197' },
          { label: 'MERCED', value: '198' },
          { label: 'MODOC', value: '199' },
          { label: 'MONO', value: '200' },
          { label: 'MONTEREY', value: '201' },
          { label: 'NAPA', value: '202' },
          { label: 'NEVADA', value: '203' },
          { label: 'ORANGE', value: '204' },
          { label: 'PLACER', value: '205' },
          { label: 'PLUMAS', value: '206' },
          { label: 'RIVERSIDE', value: '207' },
          { label: 'SACRAMENTO', value: '208' },
          { label: 'SAN BENITO', value: '209' },
          { label: 'SAN BERNARDINO', value: '210' },
          { label: 'SAN DIEGO', value: '211' },
          { label: 'SAN FRANCISCO', value: '212' },
          { label: 'SAN JOAQUIN', value: '213' },
          { label: 'SAN LUIS OBISPO', value: '214' },
          { label: 'SAN MATEO', value: '215' },
          { label: 'SANTA BARBARA', value: '216' },
          { label: 'SANTA CLARA', value: '217' },
          { label: 'SANTA CRUZ', value: '218' },
          { label: 'SHASTA', value: '219' },
          { label: 'SIERRA', value: '220' },
          { label: 'SISKIYOU', value: '221' },
          { label: 'SOLANO', value: '222' },
          { label: 'SONOMA', value: '223' },
          { label: 'STANISLAUS', value: '224' },
          { label: 'SUTTER', value: '225' },
          { label: 'TEHAMA', value: '226' },
          { label: 'TRINITY', value: '227' },
          { label: 'TULARE', value: '228' },
          { label: 'TUOLUMNE', value: '229' },
          { label: 'VENTURA', value: '230' },
          { label: 'YOLO', value: '231' },
          { label: 'YUBA', value: '232' }
        ],
        id: [
          { label: 'ADA', value: '639' },
          { label: 'ADAMS', value: '640' },
          { label: 'BANNOCK', value: '641' },
          { label: 'BEAR LAKE', value: '642' },
          { label: 'BENEWAH', value: '643' },
          { label: 'BINGHAM', value: '644' },
          { label: 'BLAINE', value: '645' },
          { label: 'BOISE', value: '646' },
          { label: 'BONNER', value: '647' },
          { label: 'BONNEVILLE', value: '648' },
          { label: 'BOUNDARY', value: '649' },
          { label: 'BUTTE', value: '650' },
          { label: 'CAMAS', value: '651' },
          { label: 'CANYON', value: '652' },
          { label: 'CARIBOU', value: '653' },
          { label: 'CASSIA', value: '654' },
          { label: 'CLARK', value: '655' },
          { label: 'CLEARWATER', value: '656' },
          { label: 'CUSTER', value: '657' },
          { label: 'ELMORE', value: '658' },
          { label: 'FRANKLIN', value: '659' },
          { label: 'FREMONT', value: '660' },
          { label: 'GEM', value: '661' },
          { label: 'GOODING', value: '662' },
          { label: 'IDAHO', value: '663' },
          { label: 'JEFFERSON', value: '664' },
          { label: 'JEROME', value: '665' },
          { label: 'KOOTENAI', value: '666' },
          { label: 'LATAH', value: '667' },
          { label: 'LEMHI', value: '668' },
          { label: 'LEWIS', value: '669' },
          { label: 'LINCOLN', value: '670' },
          { label: 'MADISON', value: '671' },
          { label: 'MINIDOKA', value: '672' },
          { label: 'NEZ PERCE', value: '673' },
          { label: 'ONEIDA', value: '674' },
          { label: 'OWYHEE', value: '675' },
          { label: 'PAYETTE', value: '676' },
          { label: 'POWER', value: '677' },
          { label: 'SHOSHONE', value: '678' },
          { label: 'TETON', value: '679' },
          { label: 'TWIN FALLS', value: '680' },
          { label: 'VALLEY', value: '681' },
          { label: 'WASHINGTON', value: '682' }
        ],
        ma: [
          { label: 'BARNSTABLE', value: '1166' },
          { label: 'BERKSHIRE', value: '1167' },
          { label: 'BRISTOL', value: '1168' },
          { label: 'DUKES', value: '1169' },
          { label: 'ESSEX', value: '1170' },
          { label: 'FRANKLIN', value: '1171' },
          { label: 'HAMPDEN', value: '1172' },
          { label: 'HAMPSHIRE', value: '1173' },
          { label: 'MIDDLESEX', value: '1174' },
          { label: 'NANTUCKET', value: '1175' },
          { label: 'NORFOLK', value: '1176' },
          { label: 'PLYMOUTH', value: '1177' },
          { label: 'SUFFOLK', value: '1178' },
          { label: 'WORCESTER', value: '1179' }
        ]
      },
      required: true,
      type: 'select'
    },
    propertyType: {
      value: '',
      default: '',
      label: 'Property Type',
      options: [
        { label: 'Single Family', value: 'Single Family' },
        { label: 'Condo (1-4 Story)', value: 'Condo (1-4 Story)' },
        { label: 'Condo (5-8 Story)', value: 'Condo (5-8 Story)' },
        { label: 'Condo (9+ Story)', value: 'Condo (9+ Story)' },
        { label: 'PUD', value: 'PUD' },
        { label: '2-Unit', value: '2-Unit' },
        { label: '3-Unit', value: '3-Unit' },
        { label: '4-Unit', value: '4-Unit' },
        { label: 'Townhouse', value: 'Townhouse' }
      ],
      required: true
    },
    propertyUse: {
      value: '',
      default: '',
      label: 'Property use',
      options: [
        { label: 'Primary Home', value: 'Primary Home' },
        { label: 'Secondary Home', value: 'Secondary Home' },
        { label: 'Investment Property', value: 'Investment Property' }
      ],
      required: true
    },
    creditRating: {
      value: '',
      default: '',
      label: 'Credit Rating',
      options: [
        { label: '740+ (Excellent)', value: '740' },
        { label: '720 - 739', value: '720-739' },
        { label: '700 - 719', value: '700-719' },
        { label: '680 - 699', value: '680-699' },
        { label: '660 - 679', value: '660-679' },
        { label: '640 - 659', value: '640-659' },
        { label: '620 - 639', value: '620-639' },
        { label: '600 - 619', value: '600-619' },
        { label: '580 - 599 (Poor)', value: '580-599' }
      ],
      required: true
    },
    interestOnly: {
      value: '',
      default: '',
      label: 'Interest Only',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],
      required: true
    },
    taxesInsurance: {
      value: '',
      default: '',
      label: 'Taxes & Insurance',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],
      required: true
    },
    refinanceType: {
      value: '',
      default: '',
      label: 'Refinance Type',
      options: [
        { label: 'Cash Out', value: 'cash out' },
        { label: 'No Cash Out', value: 'no cash out' }
      ],
      required: true
    },
    hasPromoCode: {
      value: false,
      default: false,
      label: null,
      required: false
    },
    promoCode: {
      value: '',
      default: '',
      label: 'Promo Code',
      required: false
    },
    hasSignUp: {
      value: false,
      default: false,
      label: null,
      required: false
    },
    signUp: {
      value: '',
      default: '',
      label: 'Sign Up',
      required: false
    }
  },
  submit: {
    datetime: null
  }
})

export const mutations = {
  add (state, payload) {
    Object.assign(state, payload)
  },
  addLoanPurpose (state, value) {
    state.fields.loanPurpose.value = value
  },
  addPropertyValue (state, value) {
    state.fields.propertyValue.value = value
  },
  addLoanAmount (state, value) {
    state.fields.loanAmount.value = value
  },
  addLTV (state, value) {
    state.fields.ltv.value = value
  },
  addLoanProgram (state, value) {
    state.fields.loanProgram.value = value
  },
  addState (state, value) {
    state.fields.state.value = value
  },
  addCounty (state, value) {
    state.fields.county.value = value
  },
  addPropertyType (state, value) {
    state.fields.propertyType.value = value
  },
  addPropertyUse (state, value) {
    state.fields.propertyUse.value = value
  },
  addCreditRating (state, value) {
    state.fields.creditRating.value = value
  },
  addInterestOnly (state, value) {
    state.fields.interestOnly.value = value
  },
  addTaxesInsurance (state, value) {
    state.fields.taxesInsurance.value = value
  },
  addRefinanceType (state, value) {
    state.fields.refinanceType.value = value
  },
  addHasPromoCode (state, value) {
    state.fields.hasPromoCode.value = value
  },
  addPromoCode (state, value) {
    state.fields.promoCode.value = value
  },
  addHasSignUp (state, value) {
    state.fields.hasSignUp.value = value
  },
  addSignUp (state, value) {
    state.fields.signUp.value = value
  },
  reset (state) {
    Object.keys(state.fields).forEach(function (key) {
      state.fields[key].value = state.fields[key].default
    })
  },
  addErrors (state, errors) {
    state.errors = errors
  },
  clearErrors (state, errors) {
    state.errors = []
  },
  setDatetime (state, payload = false) {
    if (payload) {
      state.submit.datetime = payload
    } else {
      state.submit.datetime = new Date()
    }
  }
}
