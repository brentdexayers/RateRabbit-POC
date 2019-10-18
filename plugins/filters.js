import Vue from 'vue'
import phone from '~/mixins/phoneNumber.js'

Vue.filter('concat', function (value, param) {
  if (!value) { return '' }
  value = param + value
  return value
})

Vue.filter('capitalize', function (value) {
  if (!value) { return '' }
  return value[0].toUpperCase() + value.slice(1)
})

Vue.filter('uppercase', function (value) {
  if (!value) { return '' }
  value = value.toUpperCase()
  return value
})

Vue.filter('titlecase', function (value) {
  return value
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

Vue.filter('percent', function (value, digits = 3) {
  if (!value) { return '' }
  value = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value)
  return value
})

Vue.filter('currency', function (value) {
  // if (!value) { return '' }
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
  const localization = phone.localization || 'US'
  const number = phoneUtil.parseAndKeepRawInput(value, localization)
  // if (!phoneUtil.isValidNumber(number)) { return '' }
  if (!phoneUtil.isValidNumberForRegion(number, localization)) { return '' }
  return phoneUtil.format(number, PNF.NATIONAL)
})

Vue.filter('phonelink', function (value) {
  if (!value) { return '' }
  const PNF = require('google-libphonenumber').PhoneNumberFormat
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
  const localization = phone.localization || 'US'
  const number = phoneUtil.parseAndKeepRawInput(value, localization)
  return 'tel:' + phoneUtil.format(number, PNF.E164)
})

Vue.filter('emaillink', function (value) {
  if (!value) { return '' }
  return 'mailto:' + value
})

Vue.filter('anchor', function (value) {
  if (!value) { return '' }
  return '#' + value
})

Vue.filter('nospecialchars', function (value) {
  if (!value) { return '' }
  return value.replace(/[^A-Z0-9]+/ig, '_')
})
