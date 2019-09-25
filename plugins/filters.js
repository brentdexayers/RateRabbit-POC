import Vue from 'vue'
import Phone from '~/mixins/phoneNumber.js'

Vue.filter('concat', function (value, param) {
  if (!value) { return '' }
  value = param + value
  return value
})

Vue.filter('capitalize', function (value) {
  if (!value) { return '' }
  value = value.toUpperCase()
  return value
})

Vue.filter('percent', function (value) {
  if (!value) { return '' }
  value = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(value)
  return value
})

Vue.filter('currency', function (value) {
  if (!value) { return '' }
  value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
  return value
})

Vue.filter('datetime', function (value) {
  if (!value) { return '' }
  const d = new Date(value)
  const month = d.toLocaleString('default', { month: 'long' })
  const day = d.getDate()
  const year = d.getFullYear()
  const hoursMil = d.getHours()
  const hours = hoursMil > 12 ? hoursMil - 12 : hoursMil
  const minutes = d.getMinutes()
  const ampm = hoursMil > 12 ? 'pm' : 'am'
  const formattedDate = month + ' ' + day + ', ' + year + ' : ' + hours + ':' + minutes + ' ' + ampm
  return formattedDate
})

Vue.filter('phone', function (value) {
  if (!value) { return '' }
  const PNF = require('google-libphonenumber').PhoneNumberFormat
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
  const localization = Phone.localization || 'US'
  const number = phoneUtil.parseAndKeepRawInput(value, localization)
  // if (!phoneUtil.isValidNumber(number)) { return '' }
  if (!phoneUtil.isValidNumberForRegion(number, localization)) { return '' }
  return phoneUtil.format(number, PNF.NATIONAL)
})

Vue.filter('phonelink', function (value) {
  if (!value) { return '' }
  const PNF = require('google-libphonenumber').PhoneNumberFormat
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
  const localization = Phone.localization || 'US'
  const number = phoneUtil.parseAndKeepRawInput(value, localization)
  return 'tel:' + phoneUtil.format(number, PNF.E164)
})
