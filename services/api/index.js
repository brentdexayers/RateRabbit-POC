import axios from 'axios'

const apiUrl = process.env.apiEndpont || 'https://development.raterabbit.com:8181/RateRabbit/webapi'

// const instance = axios.create({
//   baseURL: apiUrl
// })

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

const handleError = (error, payload = null) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (payload) {
      console.log('Payload\n', payload)
    }
    console.log('Error response')
    console.log(error.response.status)
    console.log(error.response.data)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    console.log('Error request')
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error message', error.message)
  }
  console.log('Error config', error.config)
  return error
}

// Default returns if API error
const defaults = {
  loanPurpose: [
    { name: 'Purchase' },
    { name: 'Refinance' },
    { name: 'Refinance Cash Out' }
  ],
  maritalStatus: [
    { name: 'Married' },
    { name: 'Single' }
  ],
  state: [
    { name: 'Arizona', active: true },
    { name: 'California', active: true },
    { name: 'Idaho', active: true },
    { name: 'Massachusetts', active: true }
  ]
}

export const authenticate = async () => {
  const { data } = await axios.post(`${apiUrl}/authenticate`, authPayload, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error, authPayload)
      throw error
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
      handleError(error)
      throw error
    })
  return data
}

export const getLoanDocType = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loandoctype`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      throw error
    })
  return data
}

export const getLoanProgram = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loanprogram`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      throw error
    })
  return data
}

export const getLoanPurpose = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loanpurpose`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      // throw error
      return defaults.loanPurpose
    })
  return data
}

export const getLoanRefinanceType = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/loanrefinancetype`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      throw error
    })
  return data
}

export const getMaritalStatus = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/maritalstatus`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      // throw error
      return defaults.maritalStatus
    })
  return data
}

export const getPropertyType = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/propertytype`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      throw error
    })
  return data
}

export const getPropertyUse = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/propertyuse`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      throw error
    })
  return data
}

export const getState = async (auth) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.get(`${apiUrl}/state`, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      // throw error
      return defaults.state
    })
  return data.filter((state) => {
    return state.active
  })
}

export const loanSearch = async (auth, payload) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.post(`${apiUrl}/loansearch`, payload, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      throw error
    })
  return data
}

export const applicationCreate = async (auth, payload) => {
  axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
  const { data } = await axios.post(`${apiUrl}/application/create`, payload, axiosConfig)
    .then((res) => {
      return res
    })
    .catch((error) => {
      handleError(error)
      throw error
    })
  return data
}

export default authenticate
