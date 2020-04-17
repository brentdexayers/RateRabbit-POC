import axios from 'axios'

const apiUrl = process.env.apiEndpont

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': null
  }
}

const authPayload = {
  'userName': process.env.apiUsername,
  'password': process.env.apiPassword,
  'grantType': 'PASSWORD'
}

export const authenticate = async () => {
  const { data } = await axios.post(`${apiUrl}/authenticate`, authPayload, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: authenticate\n', error)
    })
  return data
}

export const getCreditRating = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/creditrating`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getCreditRating\n', error)
    })
  // console.log('Credit Rating Options', data)
  return data
}

export const getLoanDocType = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loandoctype`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getLoanDocType\n', error)
    })
  // console.log('Loan Doc Type Options', data)
  return data
}

export const getLoanProgram = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loanprogram`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getLoanProgram\n', error)
    })
  // console.log('Loan Program Options', data)
  return data
}

export const getLoanPurpose = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loanpurpose`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getLoanPurpose\n', error)
    })
  // console.log('Loan Purpose Options', data)
  return data
}

export const getLoanRefinanceType = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loanrefinancetype`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getLoanRefinanceType\n', error)
    })
  // console.log('Loan Refinance Type Options', data)
  return data
}

export const getMaritalStatus = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/status/statustypename/Marital%20Status`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getMaritalStatus\n', error)
    })
  // console.log('Marital Status Options', data)
  return data
}

export const getPropertyType = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/propertytype`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getPropertyType\n', error)
    })
  // console.log('Property Type Options', data)
  return data
}

export const getPropertyUse = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/propertyuse`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getPropertyUse\n', error)
    })
  // console.log('Property Use Options', data)
  return data
}

export const getState = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/state`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: getState\n', error)
    })
  // console.log('State Options', data)
  return data.filter((state) => {
    return state.active
  })
}

export const loanSearch = async (auth, searchData) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  try {
    const { data } = await axios.post(`${apiUrl}/loansearch`, searchData, axiosConfig)
    console.log('Search Data:', data)
    const reduced = data.searchResultDetails.reduce(function (r, a) {
      r[a.amortizationTerm] = r[a.amortizationTerm] || []
      r[a.amortizationTerm].push(a)
      return r
    }, Object.create(null))
    console.log('Search Data (reduced)', reduced)
    return reduced
  } catch (err) {
    console.warn(err)
    return false
  }
}

export default authenticate
