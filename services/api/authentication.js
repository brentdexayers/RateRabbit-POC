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

export default async function authenticate (state) {
  const auth = state?.auth
  const expires = state?.auth?.expirationDate
  const e = expires && typeof expires !== 'undefined' ? Date.parse(expires.replace('[UTC]', '')) : false
  const n = Date.now()
  if (!e || n > e) {
    console.log('Authenticating...')
    try {
      const { data } = await axios.post('/api/authenticate', authPayload, axiosConfig)
      return data
    } catch (err) {
      console.warn('AXIOS ERROR: ', err)
      return false
    }
  }
  return auth
}
