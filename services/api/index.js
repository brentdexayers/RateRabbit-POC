import axios from 'axios'

const apiUrl = process.env.NUXT_ENV_API_ENDPOINT || '/api'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': null
  }
}

const authPayload = {
  'userName': process.env.apiUsername || 'ninthlink',
  'password': process.env.apiPassword || 'Y<CJfOD&B;xo5BphMm+D',
  'grantType': 'PASSWORD'
}

export const authenticate = async () => {
  const { data } = await axios.post(`${apiUrl}/authenticate`, authPayload, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error('Error :: authenticate', error)
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
      console.error('Error :: getCreditRating', error)
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
      console.error('Error :: getLoanDocType', error)
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
      console.error('Error :: getLoanProgram', error)
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
      console.error('Error :: getLoanPurpose', error)
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
      console.error('Error :: getLoanRefinanceType', error)
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
      console.error('Error :: getMaritalStatus', error)
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
      console.error('Error :: getPropertyType', error)
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
      console.error('Error :: getPropertyUse', error)
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
      console.error('Error :: getState', error)
    })
  // console.log('State Options', data)
  return data.filter((state) => {
    return state.active
  })
}

export default authenticate
