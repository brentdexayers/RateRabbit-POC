import axios from 'axios'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

const authPayload = {
  'userName': process.env.NUXT_ENV_AUTH_USER_NAME || 'ninthlink',
  'password': process.env.NUXT_ENV_AUTH_PASSWORD || 'Y<CJfOD&B;xo5BphMm+D',
  'grantType': 'PASSWORD'
}

export default async function authenticate () {
  try {
    const { data } = await axios.post('/api/authenticate', authPayload, axiosConfig)
    console.log('authenticate::data', data)
    return data
  } catch (err) {
    console.warn('AXIOS ERROR: ', err)
    return false
  }
}
