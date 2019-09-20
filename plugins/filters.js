import Vue from 'vue'

Vue.filter(
  'capitalize',
  val => val.toUpperCase())

Vue.filter(
  'percent',
  val => new Intl.NumberFormat(
    'en-US',
    {
      style: 'percent',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }
  ).format(val))

Vue.filter(
  'currency',
  val => new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD'
    }
  ).format(val))

Vue.filter(
  'datetime',
  function (date) {
    date = date || new Date()
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDay()
    const year = date.getFullYear()
    const hoursMil = date.getHours()
    const hours = hoursMil > 12 ? hoursMil - 12 : hoursMil
    const minutes = date.getMinutes()
    const ampm = hoursMil > 12 ? 'pm' : 'am'
    const formattedDate = month + ' ' + day + ', ' + year + ' : ' + hours + ':' + minutes + ' ' + ampm
    return formattedDate
  })
