import axios from 'axios'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': null
  }
}

export default async function fieldOptions (auth, option) {
  try {
    axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT
    const { data } = await axios.get('/api/' + option, axiosConfig)
    return data
  } catch (err) {
    console.warn('AXIOS ERROR: ', err)
    return false
  }
}
