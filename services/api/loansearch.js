import axios from 'axios'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': null
  }
}

// const searchPayloadSample = {
//   'loanpurpose': 'PURCHASE',
//   'propertyvalue': 800000,
//   'loanamount': 400000,
//   'loanprogram': 'SEVEN_YEAR_ARM',
//   'zipcode': '83702',
//   'propertytype': 'SINGLE_FAMILY',
//   'propertyuse': 'PRIMARY_HOME',
//   'creditrating': 'SEVEN_FORTY_PLUS',
//   'interestonly': false,
//   'taxesandinsurance': true,
//   'loanrefinancetype': 'NO_CASH_OUT',
//   'promotioncode': 'Test Promotion Code'
// }

function mutatedSearchPayload (search) {
  const payload = {
    'loanpurpose': search.loanpurpose,
    'propertyvalue': search.propertyvalue,
    'loanamount': search.loanamount,
    'zipcode': search.zipcode,
    'propertytype': search.propertytype,
    'propertyuse': search.propertyuse,
    'creditrating': search.creditrating,
    'interestonly': search.interestonly,
    'taxesandinsurance': search.taxesandinsurance,
    'loanrefinancetype': search.loanrefinancetype,
    'promotioncode': search.promotioncode
  }
  return payload
}

export default async function loanSearch (auth, search) {
  try {
    axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
    const searchPayload = mutatedSearchPayload(search)
    console.log('Search Payload:', searchPayload)
    const { data } = await axios.post('/api/loansearch', searchPayload, axiosConfig)
    console.log('loansearch::data: ', data)
    return data
  } catch (err) {
    console.warn('AXIOS ERROR: ', err)
    return false
  }
}
