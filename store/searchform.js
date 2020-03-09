export const state = () => ({
  errors: [],
  fields: {
    loanpurpose: {
      default: '',
      label: 'Loan Purpose',
      options: [
        { label: 'Purchase', value: 'PURCHASE' },
        { label: 'Refinance', value: 'REFINANCE' },
        { label: 'Cash Out', value: 'CASH_OUT' }
      ],
      required: true
    },
    propertyvalue: {
      default: '',
      label: 'Property Value',
      required: true
    },
    loanamount: {
      default: '',
      label: 'Loan Amount',
      required: true
    },
    ltv: {
      default: 0,
      label: 'loan-to-value',
      required: false
    },
    // loanprogram: {
    //   default: [],
    //   label: 'Loan Programs',
    //   options: [
    //     {
    //       name: 'Fixed Rates',
    //       tooltip: 'Fixed Rates are mortgages in which the interest rate does not change during the entire term of the loan.',
    //       terms: [
    //         {
    //           label: '10 Year Fixed',
    //           value: 'TEN_YEAR_FIXED'
    //         },
    //         {
    //           label: '15 Year Fixed',
    //           value: 'FIFTEEN_YEAR_FIXED'
    //         },
    //         {
    //           label: '20 Year Fixed',
    //           value: 'TWENTY_YEAR_FIXED'
    //         },
    //         {
    //           label: '30 Year Fixed',
    //           value: 'THIRTY_YEAR_FIXED'
    //         }
    //       ]
    //     },
    //     {
    //       name: 'Adjustable Rates',
    //       tooltip: 'Adjustable Rates permit the lender to adjust the mortgage interest rate periodically on the basis of changes in a specified index. The interest rates on these loans will be fixed for a specified period of time, then will become adjustable for the remaining years of the loan. Once adjustable, the interest rates may move up or down, as market conditions change.',
    //       terms: [
    //         {
    //           label: '3 Year Arm',
    //           value: 'THREE_YEAR_ARM'
    //         },
    //         {
    //           label: '5 Year Arm',
    //           value: 'FIVE_YEAR_ARM'
    //         },
    //         {
    //           label: '7 Year Arm',
    //           value: 'SEVEN_YEAR_ARM'
    //         },
    //         {
    //           label: '10 Year Arm',
    //           value: 'TEN_YEAR_ARM'
    //         }
    //       ]
    //     }
    //   ],
    //   required: false,
    //   type: 'checkbox',
    //   errorStr: {
    //     invalid: '$1 are invalid'
    //   }
    // },
    state: {
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
    zipcode: {
      default: '',
      label: 'Zip Code',
      required: true
    },
    propertytype: {
      default: '',
      label: 'Property Type',
      options: [
        { label: 'Single Family', value: 'SINGLE_FAMILY' },
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
    propertyuse: {
      default: '',
      label: 'Property use',
      options: [
        { label: 'Primary Home', value: 'PRIMARY_HOME' },
        { label: 'Secondary Home', value: 'SECONDARY_HOME' },
        { label: 'Investment Property', value: 'INVESTMENT_PROPERTY' }
      ],
      required: true
    },
    creditrating: {
      default: '',
      label: 'Credit Rating',
      options: [
        { label: '740+ (Excellent)', value: 740 },
        { label: '720 - 739', value: 720 },
        { label: '700 - 719', value: 700 },
        { label: '680 - 699', value: 680 },
        { label: '660 - 679', value: 660 },
        { label: '640 - 659', value: 640 },
        { label: '620 - 639', value: 620 },
        { label: '600 - 619', value: 600 },
        { label: '580 - 599 (Poor)', value: 580 }
      ],
      required: true
    },
    interestonly: {
      default: '',
      label: 'Interest Only',
      options: [
        { label: 'Yes', value: 'YES' },
        { label: 'No', value: 'NO' }
      ],
      required: true
    },
    taxesandinsurance: {
      default: '',
      label: 'Taxes & Insurance',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],
      required: true
    },
    loanrefinancetype: {
      default: 'CASH_OUT',
      label: 'Refinance Type',
      options: [
        { label: 'Cash Out', value: 'CASH_OUT' },
        { label: 'No Cash Out', value: 'NO_CASH_OUT' }
      ],
      required: false
    },
    haspromotioncode: {
      default: false,
      label: null,
      required: false
    },
    promotioncode: {
      default: '',
      label: 'Promo Code',
      required: false
    },
    hassignup: {
      default: false,
      label: null,
      required: false
    },
    signup: {
      default: '',
      label: 'Sign Up',
      required: false
    }
  },
  datetimes: []
})

export const getters = {
  getDatetimeLatest: (state) => {
    return state.datetimes.filter(
      (datetime) => {
        return datetime.slice(-1)[0]
      }
    )
  }
}

export const mutations = {
  addError (state, error) {
    state.errors.push(error)
  },
  clearErrors (state, errors) {
    state.errors = []
  },
  addDatetime (state) {
    state.datetimes.push(new Date())
  }
}
