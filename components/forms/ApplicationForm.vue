<template>
  <div>
    <div v-if="error.applicationCreate" class="alert alert-danger small">
      <p v-if="error.status !== 500">
        <strong class="text-danger">There was a problem creating your application. Please try again later.</strong>
      </p>
      <p v-if="error.status === 500">
        <strong class="text-danger">There was a problem with your application. Please check your application to ensure your data is accurate.</strong>
      </p>
      <div v-if="error.message">
        <p class="small text-right">
          <a
            @click="(event) => errorShowDetails(event)"
            href="#"
            class="link text-danger"
          >
            {{ error.showDetails ? 'Hide Details' : 'Show Details' }}
          </a>
        </p>
        <p v-if="error.showDetails">
          {{ error.message }}
        </p>
      </div>
    </div>

    <div v-if="hasErrors" class="alert alert-danger small">
      <p>
        <strong class="text-danger">Please fix the form errros below</strong>
      </p>
    </div>

    <form
      id="application-form"
      @submit.prevent="handleSubmit"
      :class="{ blur: loader }"
      action="/apply"
      method="POST"
      class="form form--apply"
    >
      {{ errors }}
      <div id="property_information" class="section">
        <h2 class="form--section_header">
          {{ 'Subject Property' | titlecase }}
        </h2>
        <div class="row">
          <div
            :class="{ error: hasError('propertyAddress') }"
            class="form-group col-12 col-lg-9"
          >
            <input
              v-model="propertyAddress"
              @blur="validatePropertyAddress(propertyAddress)"
              type="text"
              name="propertyAddress"
              class="form-control"
            >
            <label
              :class="{ hasvalue: propertyAddress }"
              for="propertyAddress"
            >
              {{ 'Property Address (street, city, state)' }}
            </label>
            <p
              v-if="hasError('propertyAddress')"
              class="error-inline"
            >
              {{ getErrorMessage('propertyAddress') }}
            </p>
          </div>
          <div
            :class="{ error: hasError('propertyZip') }"
            class="form-group col-12 col-lg-3"
          >
            <input
              v-model="propertyZip"
              v-mask="'#####'"
              @blur="validatePropertyZip(propertyZip)"
              type="text"
              name="propertyZip"
              class="form-control"
            >
            <label
              :class="{ hasvalue: propertyZip }"
              for="propertyZip"
            >
              {{ 'Zip Code' | titlecase }}
            </label>
            <p
              v-if="hasError('propertyZip')"
              class="error-inline"
            >
              {{ getErrorMessage('propertyZip') }}
            </p>
          </div>
        </div>
        <div v-if="loanPurpose && (loanPurpose.name === 'Refinance' || loanPurpose.name === 'Refinance Cash Out')" class="row">
          <div class="form-group col-12 col-lg-6">
            <input
              v-model="propertyYearAcquired"
              v-mask="'####'"
              type="text"
              name="propertyYearAcquired"
              class="form-control"
            >
            <label
              :class="{ hasvalue: propertyYearAcquired }"
              for="propertyYearAcquired"
            >
              {{ 'Year Acquired' | titlecase }}
            </label>
          </div>
          <div class="form-group col-12 col-lg-6">
            <input
              v-model="propertyPurchasePrice"
              v-currency="{distractionFree: false}"
              type="text"
              name="propertyPurchasePrice"
              class="form-control"
            >
            <label
              :class="{ hasvalue: propertyPurchasePrice }"
              for="propertyPurchasePrice"
            >
              {{ 'Original Cost' | titlecase }}
            </label>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Borrower Information
        </h2>
        <div class="row">
          <div
            :class="{ error: errors.firstName }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="firstName"
              @blur="validateFirstName(firstName)"
              type="text"
              name="firstName"
              class="form-control"
            >
            <label
              :class="{ hasvalue: firstName }"
              for="firstName"
            >
              {{ 'First Name' | titlecase }}
            </label>
            <p
              v-if="errors.firstName"
              class="error-inline"
            >
              First name is required
            </p>
          </div>

          <div
            :class="{ error: errors.lastName }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="lastName"
              @blur="validateLastName(lastName)"
              type="text"
              name="lastName"
              class="form-control"
            >
            <label
              :class="{ hasvalue: lastName }"
              for="lastName"
            >
              {{ 'Last Name' | titlecase }}
            </label>
            <p
              v-if="errors.lastName"
              class="error-inline"
            >
              Last name is required
            </p>
          </div>

          <div
            :class="{ error: errors.email }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="email"
              @blur="validateEmail(email)"
              type="email"
              name="email"
              class="form-control"
            >
            <label
              :class="{ hasvalue: email }"
              for="email"
            >
              {{ 'Email Address' | titlecase }}
            </label>
            <p
              v-if="errors.email && !email"
              class="error-inline"
            >
              Email is required
            </p>
            <p
              v-if="errors.email && !validEmail(email)"
              class="error-inline"
            >
              Email invalid
            </p>
          </div>

          <div
            :class="{ error: errors.cellPhone }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="cellPhone"
              v-mask="'(###) ###-####'"
              @blur="validateCellPhone(cellPhone)"
              type="text"
              name="cellPhone"
              class="form-control"
            >
            <label
              :class="{ hasvalue: cellPhone }"
              for="cellPhone"
            >
              {{ 'Cell Phone' | titlecase }}
            </label>
            <p
              v-if="errors.cellPhone && !cellPhone"
              class="error-inline"
            >
              Cell phone is required
            </p>
            <p
              v-if="errors.cellPhone && cellPhone && !validPhone(cellPhone)"
              class="error-inline"
            >
              Please enter a valid phone number
            </p>
          </div>

          <div
            :class="{ error: errors.ssn }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="ssn"
              v-mask="'###-##-####'"
              @blur="validateSsn(ssn)"
              type="text"
              name="ssn"
              class="form-control"
            >
            <label
              :class="{ hasvalue: ssn }"
              for="ssn"
            >
              {{ 'Social Security Number' | titlecase }}
            </label>
            <p
              v-if="errors.ssn"
              class="error-inline"
            >
              Invalid SSN
            </p>
          </div>

          <div
            :class="{ error: errors.dob }"
            class="form-group col-12 col-lg-6"
          >
            <v-date-picker
              v-model="dob"
              :model-config="modelConfig"
              :max-date="new Date()"
              color="green"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  v-on="inputEvents"
                  :value="inputValue"
                  @popoverDidHide="validateDob(dob)"
                  class="form-control"
                >
              </template>
            </v-date-picker>
            <label
              :class="{ hasvalue: dob }"
              for="dob"
            >
              {{ 'DOB (mm/dd/yyyy)' }}
            </label>
            <p
              v-if="errors.dob && this.$moment(dob).isValid()"
              class="error-inline"
            >
              DOB cannot be in the future
            </p>
            <p
              v-if="errors.dob && !this.$moment(dob).isValid()"
              class="error-inline"
            >
              DOB is invalid
            </p>
          </div>

          <div class="form-group col-12 col-lg-6">
            <input
              v-model="yearsOfSchool"
              v-mask="'##'"
              type="text"
              name="yearsOfSchool"
              class="form-control"
            >
            <label
              :class="{ hasvalue: yearsOfSchool }"
              for="yearsOfSchool"
            >
              {{ 'Total Years in School' | titlecase }}
              <img id="yearsOfSchool-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
              <b-tooltip target="yearsOfSchool-tooltip" triggers="hover">
                For example enter "16" years if you completed a four-year degree.
              </b-tooltip>
            </label>
          </div>

          <div v-if="maritalStatusOptions && maritalStatusOptions.length > 0" class="form-group col-12 col-lg-6">
            <select
              v-model="maritalStatus"
              name="maritalStatus"
              class="custom-select has-info"
            >
              <option
                value="null"
                disabled
                hidden
              />
              <option
                v-for="(option, index) in maritalStatusOptions"
                :key="index"
                :value="option"
              >
                {{ option.name | titlecase }}
              </option>
            </select>
            <label
              :class="{ hasvalue: maritalStatus }"
              for="maritalStatus"
            >
              {{ 'Marital Status' }}
            </label>
          </div>
        </div>

        <div class="justify-content-start align-items-start d-flex">
          <h3 class="mr-3">
            {{ 'Present Address' | titlecase }}
          </h3>
          <div class="custom-control custom-checkbox">
            <input
              id="copyPropertyAddressPrimary"
              v-model="copyPropertyAddress.primary"
              @change="doCopyPropertyAddressPrimary()"
              type="checkbox"
              class="custom-control-input"
            >
            <label
              class="custom-control-label text-primary small"
              for="copyPropertyAddressPrimary"
            >
              {{ 'Same as property address' }}
            </label>
          </div>
        </div>

        <div class="row">
          <div
            :class="{ error: errors.address }"
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="address"
              @blur="validateAddress(address)"
              :disabled="copyPropertyAddress.primary"
              type="text"
              name="address"
              class="form-control"
            >
            <label
              :class="{ hasvalue: address }"
              for="address"
            >
              {{ 'Present Address' }}
            </label>
            <p
              v-if="errors.address"
              class="error-inline"
            >
              Present address is required
            </p>
          </div>
          <div
            :class="{ error: errors.zip }"
            class="form-group col-12 col-lg-3"
          >
            <input
              v-model="zip"
              v-mask="'#####'"
              @blur="validateZip(zip)"
              :disabled="copyPropertyAddress.primary"
              type="text"
              name="zip"
              class="form-control"
            >
            <label
              :class="{ hasvalue: zip }"
              for="zip"
            >
              {{ 'Zip Code' }}
            </label>
            <p
              v-if="errors.zip"
              class="error-inline"
            >
              Zip code is required
            </p>
          </div>
          <div class="form-group col-12 col-lg-3">
            <input
              v-model="timeAtCurrentAddress"
              v-mask="'##'"
              type="text"
              name="timeAtCurrentAddress"
              class="form-control"
            >
            <label
              :class="{ hasvalue: timeAtCurrentAddress }"
              for="timeAtCurrentAddress"
            >
              {{ 'Years at Address' }}
            </label>
          </div>
          <div
            :class="{ error: errors.mailingAddress }"
            class="form-group col-12 col-lg-9"
          >
            <input
              v-model="mailingAddress"
              @blur="validateMailingAddress(mailingAddress)"
              type="text"
              name="mailingAddress"
              class="form-control"
            >
            <label
              :class="{ hasvalue: mailingAddress }"
              for="mailingAddress"
            >
              {{ 'Mailing Address (if different from present address)' }}
            </label>
            <p
              v-if="errors.mailingAddress"
              class="error-inline"
            >
              Mailing address is required
            </p>
          </div>
          <div class="form-group col-12 col-lg-3">
            <input
              v-model="mailingZip"
              @blur="validateMailingZip(mailingZip)"
              v-mask="'#####'"
              type="text"
              name="mailingZip"
              class="form-control"
            >
            <label
              :class="{ hasvalue: mailingZip }"
              for="mailingZip"
            >
              {{ 'Zip Code' }}
            </label>
            <p
              v-if="errors.mailingZip"
              class="error-inline"
            >
              Mailing zip code is required
            </p>
          </div>
        </div>

        <h3>{{ 'Employer' | titlecase }}</h3>
        <div class="row">
          <div
            :class="{ error: errors.employerName }"
            class="form-group col-12 col-lg-12"
          >
            <input
              v-model="employerName"
              @blur="validateEmployerName(employerName)"
              type="text"
              name="employerName"
              class="form-control"
            >
            <label
              :class="{ hasvalue: employerName }"
              for="employerName"
            >
              {{ 'Employer Name' | titlecase }}
            </label>
            <p
              v-if="errors.employerName"
              class="error-inline"
            >
              Employer name is required
            </p>
          </div>
          <div class="form-group col-12 col-lg-4">
            <select
              id="input-select--selfEmployed"
              v-model="selfEmployed"
              name="selfEmployed"
              class="custom-select has-info"
            >
              <option
                value="null"
                disabled
                hidden
              />
              <option
                value="1"
              >
                Yes
              </option>
              <option
                value="0"
              >
                No
              </option>
            </select>
            <label
              :class="{ hasvalue: selfEmployed }"
              for="selfEmployed"
            >
              {{ 'Self Employed' | titlecase }}
            </label>
          </div>
          <div class="form-group col-12 col-lg-4">
            <input
              v-model="employedHowLong"
              v-mask="'##'"
              type="text"
              name="employedHowLong"
              class="form-control"
            >
            <label
              :class="{ hasvalue: employedHowLong }"
              for="employedHowLong"
            >
              {{ 'Years at this job' | titlecase }}
            </label>
          </div>
          <div class="form-group col-12 col-lg-4">
            <input
              v-model="yearsLineOfWork"
              v-mask="'##'"
              type="text"
              name="yearsLineOfWork"
              class="form-control"
            >
            <label
              :class="{ hasvalue: yearsLineOfWork }"
              for="yearsLineOfWork"
            >
              {{ 'Years in line of work' | titlecase }}
            </label>
          </div>
          <div class="form-group col-12 col-lg-4">
            <input
              v-model="jobTitle"
              type="text"
              name="jobTitle"
              class="form-control"
            >
            <label
              :class="{ hasvalue: jobTitle }"
              for="jobTitle"
            >
              {{ 'Position / Job Title' | titlecase }}
            </label>
          </div>
          <div
            :class="{ error: errors.businessPhone }"
            class="form-group col-12 col-lg-4"
          >
            <input
              v-model="businessPhone"
              v-mask="'(###) ###-####'"
              @blur="validateBusinessPhone(businessPhone)"
              type="text"
              name="businessPhone"
              class="form-control"
            >
            <label
              :class="{ hasvalue: businessPhone }"
              for="businessPhone"
            >
              {{ 'Business Phone' | titlecase }}
            </label>
            <p
              v-if="errors.businessPhone && businessPhone && !validPhone(businessPhone)"
              class="error-inline"
            >
              Please enter a valid phone number
            </p>
          </div>
          <div class="form-group col-12 col-lg-4">
            <input
              v-model="grossIncome"
              v-currency="{distractionFree: false}"
              type="text"
              name="grossIncome"
              class="form-control"
            >
            <label
              :class="{ hasvalue: grossIncome }"
              for="grossIncome"
            >
              {{ 'Monthly Base Income *' | titlecase }}
            </label>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <p class="small">
              * Self employed Borrowers <span v-if="hasCoBorrower">and Co-Borrowers </span>may  be required to provide additional documentation such as tax returns and financial statements.
            </p>
          </div>
        </div>

        <h3>{{ 'Housing Expenses' | titlecase }}</h3>
        <div class="row">
          <div
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="firstMortgage"
              v-currency="{distractionFree: false}"
              type="text"
              name="firstMortgage"
              class="form-control"
            >
            <label
              :class="{ hasvalue: firstMortgage }"
              for="firstMortgage"
            >
              {{ 'Monthly Principal and Interest' | titlecase }}
            </label>
          </div>
          <div
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="realEstateTaxes"
              v-currency="{distractionFree: false}"
              type="text"
              name="realEstateTaxes"
              class="form-control"
            >
            <label
              :class="{ hasvalue: realEstateTaxes }"
              for="realEstateTaxes"
            >
              {{ 'Monthly Taxes' | titlecase }}
            </label>
          </div>
          <div
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="hazardInsurance"
              v-currency="{distractionFree: false}"
              type="text"
              name="hazardInsurance"
              class="form-control"
            >
            <label
              :class="{ hasvalue: hazardInsurance }"
              for="hazardInsurance"
            >
              {{ 'Monthly Insurance' | titlecase }}
            </label>
          </div>
          <div
            class="form-group col-12 col-lg-6"
          >
            <input
              v-model="hoaDues"
              v-currency="{distractionFree: false}"
              type="text"
              name="hoaDues"
              class="form-control"
            >
            <label
              :class="{ hasvalue: hoaDues }"
              for="hoaDues"
            >
              {{ 'Monthly HOA Dues' | titlecase }}
            </label>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Co-Borrower Information
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <div class="custom-control custom-checkbox">
              <input
                id="hasCoBorrower"
                v-model="hasCoBorrower"
                type="checkbox"
                class="custom-control-input"
              >
              <label
                class="custom-control-label"
                for="hasCoBorrower"
              >
                Include Co-Borrower?
              </label>
            </div>
          </div>
        </div>

        <div v-if="hasCoBorrower">
          <div class="row">
            <div
              :class="{ error: errors.coBorrowerFirstName }"
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerFirstName"
                @blur="validateCoBorrowerFirstName(coBorrowerFirstName)"
                type="text"
                name="coBorrowerFirstName"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerFirstName }"
                for="coBorrowerFirstName"
              >
                {{ 'First Name' | titlecase }}
              </label>
              <p
                v-if="errors.coBorrowerFirstName"
                class="error-inline"
              >
                First name is required
              </p>
            </div>
            <div
              :class="{ error: errors.coBorrowerLastName }"
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerLastName"
                @blur="validateCoBorrowerLastName(coBorrowerLastName)"
                type="text"
                name="coBorrowerLastName"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerLastName }"
                for="coBorrowerLastName"
              >
                {{ 'Last Name' | titlecase }}
              </label>
              <p
                v-if="errors.coBorrowerLastName"
                class="error-inline"
              >
                Last name is required
              </p>
            </div>
            <div
              :class="{ error: errors.coBorrowerEmail }"
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerEmail"
                @blur="validateCoBorrowerEmail(coBorrowerEmail)"
                type="email"
                name="coBorrowerEmail"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerEmail }"
                for="coBorrowerEmail"
              >
                {{ 'Email Address' | titlecase }}
              </label>
              <p
                v-if="errors.coBorrowerEmail && !coBorrowerEmail"
                class="error-inline"
              >
                Email is required
              </p>
              <p
                v-if="errors.coBorrowerEmail && !validEmail(coBorrowerEmail)"
                class="error-inline"
              >
                Email invalid
              </p>
            </div>
            <div
              :class="{ error: errors.coBorrowerCellPhone }"
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerCellPhone"
                v-mask="'(###) ###-####'"
                @blur="validateCoBorrowerCellPhone(coBorrowerCellPhone)"
                type="text"
                name="coBorrowerCellPhone"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerCellPhone }"
                for="coBorrowerCellPhone"
              >
                {{ 'Cell Phone' | titlecase }}
              </label>
              <p
                v-if="errors.coBorrowerCellPhone && !coBorrowerCellPhone"
                class="error-inline"
              >
                Cell phone is required
              </p>
              <p
                v-if="errors.coBorrowerCellPhone && coBorrowerCellPhone && !validPhone(coBorrowerCellPhone)"
                class="error-inline"
              >
                Please enter a valid phone number
              </p>
            </div>
            <div
              :class="{ error: errors.coBorrowerSsn }"
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerSsn"
                v-mask="'###-##-####'"
                @blur="validateCoBorrowerSsn(coBorrowerSsn)"
                type="text"
                name="coBorrowerSsn"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerSsn }"
                for="coBorrowerSsn"
              >
                {{ 'Social Security Number' | titlecase }}
              </label>
              <p
                v-if="errors.coBorrowerSsn"
                class="error-inline"
              >
                Invalid SSN
              </p>
            </div>
            <div
              :class="{ error: errors.coBorrowerDob }"
              class="form-group col-12 col-lg-6"
            >
              <v-date-picker
                v-model="coBorrowerDob"
                :model-config="modelConfig"
                :max-date="new Date()"
                color="green"
              >
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    v-on="inputEvents"
                    :value="inputValue"
                    @popoverDidHide="validateDob(coBorrowerDob)"
                    class="form-control"
                  >
                </template>
              </v-date-picker>
              <label
                :class="{ hasvalue: coBorrowerDob }"
                for="coBorrowerDob"
              >
                {{ 'DOB (mm/dd/yyyy)' }}
              </label>
              <p
                v-if="errors.coBorrowerDob && this.$moment(coBorrowerDob).isValid()"
                class="error-inline"
              >
                DOB cannot be in the future
              </p>
              <p
                v-if="errors.coBorrowerDob && !this.$moment(coBorrowerDob).isValid()"
                class="error-inline"
              >
                DOB is invalid
              </p>
            </div>
            <div class="form-group col-12 col-lg-6">
              <input
                v-model="coBorrowerYearsOfSchool"
                v-mask="'##'"
                type="text"
                name="coBorrowerYearsOfSchool"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerYearsOfSchool }"
                for="coBorrowerYearsOfSchool"
              >
                {{ 'Years School' | titlecase }}
              </label>
            </div>
            <div class="form-group col-12 col-lg-6">
              <select
                v-model="coBorrowerMaritalStatus"
                name="coBorrowerMaritalStatus"
                class="custom-select has-info"
              >
                <option
                  value="null"
                  disabled
                  hidden
                />
                <option
                  v-for="(option, index) in maritalStatusOptions"
                  :key="index"
                  :value="option"
                >
                  {{ option.name | titlecase }}
                </option>
              </select>
              <label
                :class="{ hasvalue: coBorrowerMaritalStatus }"
                for="coBorrowerMaritalStatus"
              >
                {{ 'Marital Status' }}
              </label>
            </div>
          </div>
          <div class="justify-content-start align-items-start d-flex">
            <h3 class="mr-3">
              {{ 'Present Address' | titlecase }}
            </h3>
            <div class="custom-control custom-checkbox">
              <input
                id="copyPropertyAddressCoBorrower"
                v-model="copyPropertyAddress.coBorrower"
                @change="doCopyPropertyAddressCoBorrower()"
                type="checkbox"
                class="custom-control-input"
              >
              <label
                class="custom-control-label text-primary small"
                for="copyPropertyAddressCoBorrower"
              >
                {{ 'Same as property address' }}
              </label>
            </div>
          </div>
          <div class="row">
            <div
              :class="{ error: errors.coBorrowerAddress }"
              class="form-group col-12 col-lg-8"
            >
              <input
                v-model="coBorrowerAddress"
                @blur="validateCoBorrowerAddress(coBorrowerAddress)"
                :disabled="copyPropertyAddress.coBorrower"
                type="text"
                name="coBorrowerAddress"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerAddress }"
                for="coBorrowerAddress"
              >
                {{ 'Present Address' }}
              </label>
              <p
                v-if="errors.coBorrowerAddress"
                class="error-inline"
              >
                Address is required
              </p>
            </div>
            <div
              :class="{ error: errors.coBorrowerZip }"
              class="form-group col-12 col-lg-4"
            >
              <input
                v-model="coBorrowerZip"
                v-mask="'#####'"
                @blur="validateCoBorrowerZip(coBorrowerZip)"
                :disabled="copyPropertyAddress.coBorrower"
                type="text"
                name="coBorrowerZip"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerZip }"
                for="coBorrowerZip"
              >
                {{ 'Present Zip Code' }}
              </label>
              <p
                v-if="errors.coBorrowerZip"
                class="error-inline"
              >
                Zip code is required
              </p>
            </div>
          </div>

          <h3>{{ 'Employer' | titlecase }}</h3>
          <div class="row">
            <div
              :class="{ error: errors.coBorrowerEmployerName }"
              class="form-group col-12 col-lg-12"
            >
              <input
                v-model="coBorrowerEmployerName"
                @blur="validateCoBorrowerEmployerName(coBorrowerEmployerName)"
                type="text"
                name="coBorrowerEmployerName"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerEmployerName }"
                for="coBorrowerEmployerName"
              >
                {{ 'Employer Name' | titlecase }}
              </label>
              <p
                v-if="errors.coBorrowerEmployerName"
                class="error-inline"
              >
                Employer name is required
              </p>
            </div>
            <div class="form-group col-12 col-lg-4">
              <select
                id="input-select--coBorrowerSelfEmployed"
                v-model="coBorrowerSelfEmployed"
                name="coBorrowerSelfEmployed"
                class="custom-select has-info"
              >
                <option
                  value="null"
                  disabled
                  hidden
                />
                <option
                  value="1"
                >
                  Yes
                </option>
                <option
                  value="0"
                >
                  No
                </option>
              </select>
              <label
                :class="{ hasvalue: coBorrowerSelfEmployed }"
                for="coBorrowerSelfEmployed"
              >
                {{ 'Self Employed' | titlecase }}
              </label>
            </div>
            <div class="form-group col-12 col-lg-4">
              <input
                v-model="coBorrowerEmployedHowLong"
                v-mask="'##'"
                type="text"
                name="coBorrowerEmployedHowLong"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerEmployedHowLong }"
                for="coBorrowerEmployedHowLong"
              >
                {{ 'Years at this job' | titlecase }}
              </label>
            </div>
            <div class="form-group col-12 col-lg-4">
              <input
                v-model="coBorrowerYearsLineOfWork"
                v-mask="'##'"
                type="text"
                name="coBorrowerYearsLineOfWork"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerYearsLineOfWork }"
                for="coBorrowerYearsLineOfWork"
              >
                {{ 'Years in line of work' | titlecase }}
              </label>
            </div>
            <div class="form-group col-12 col-lg-4">
              <input
                v-model="coBorrowerJobTitle"
                type="text"
                name="coBorrowerJobTitle"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerJobTitle }"
                for="coBorrowerJobTitle"
              >
                {{ 'Position / Job Title' | titlecase }}
              </label>
            </div>
            <div
              :class="{ error: errors.coBorrowerBusinessPhone }"
              class="form-group col-12 col-lg-4"
            >
              <input
                v-model="coBorrowerBusinessPhone"
                v-mask="'(###) ###-####'"
                @blur="validateCoBorrowerBusinessPhone(coBorrowerBusinessPhone)"
                type="text"
                name="coBorrowerBusinessPhone"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerBusinessPhone }"
                for="coBorrowerBusinessPhone"
              >
                {{ 'Business Phone' | titlecase }}
              </label>
              <p
                v-if="errors.coBorrowerBusinessPhone && coBorrowerBusinessPhone && !validPhone(coBorrowerBusinessPhone)"
                class="error-inline"
              >
                Please enter a valid phone number
              </p>
            </div>
            <div class="form-group col-12 col-lg-4">
              <input
                v-model="coBorrowerGrossIncome"
                v-currency="{distractionFree: false}"
                type="text"
                name="coBorrowerGrossIncome"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerGrossIncome }"
                for="coBorrowerGrossIncome"
              >
                {{ 'Monthly Base Income *' | titlecase }}
              </label>
            </div>
          </div>

          <h3>{{ 'Housing Expenses' | titlecase }}</h3>
          <div class="row">
            <div
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerFirstMortgage"
                v-currency="{distractionFree: false}"
                type="text"
                name="coBorrowerFirstMortgage"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerFirstMortgage }"
                for="coBorrowerFirstMortgage"
              >
                {{ 'Monthly Principal and Interest' | titlecase }}
              </label>
            </div>
            <div
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerRealEstateTaxes"
                v-currency="{distractionFree: false}"
                type="text"
                name="coBorrowerRealEstateTaxes"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerRealEstateTaxes }"
                for="coBorrowerRealEstateTaxes"
              >
                {{ 'Monthly Taxes' | titlecase }}
              </label>
            </div>
            <div
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerHazardInsurance"
                v-currency="{distractionFree: false}"
                type="text"
                name="coBorrowerHazardInsurance"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerHazardInsurance }"
                for="coBorrowerHazardInsurance"
              >
                {{ 'Monthly Insurance' | titlecase }}
              </label>
            </div>
            <div
              class="form-group col-12 col-lg-6"
            >
              <input
                v-model="coBorrowerHoaDues"
                v-currency="{distractionFree: false}"
                type="text"
                name="coBorrowerHoaDues"
                class="form-control"
              >
              <label
                :class="{ hasvalue: coBorrowerHoaDues }"
                for="coBorrowerHoaDues"
              >
                {{ 'Monthly HOA Dues' | titlecase }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          {{ 'Additional Real Estate Assets' | titlecase }}
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <div class="custom-control custom-checkbox">
              <input
                id="assetsAndLiabilities"
                v-model="assetsAndLiabilities"
                type="checkbox"
                class="custom-control-input"
              >
              <label
                class="custom-control-label"
                for="assetsAndLiabilities"
              >
                Include additional real estate and liabilities
              </label>
            </div>
          </div>
        </div>

        <div v-if="assetsAndLiabilities">
          {{ realEstate }}
          <div
            v-for="(asset, index) in realEstate"
            :key="index"
            class="assets-fields-wrapper"
          >
            <h3>
              Property {{ index + 1 }}
            </h3>
            <div class="row">
              <div
                class="form-group col-12 col-lg-8"
              >
                <input
                  v-model="asset.address"
                  :name="'asset_' + index + '_address'"
                  type="text"
                  class="form-control"
                >
                <label
                  :class="{ hasvalue: asset.address }"
                  :for="'asset_' + index + '_address'"
                >
                  {{ 'Property Address' | titlecase }}
                </label>
              </div>
              <div
                class="form-group col-12 col-lg-4"
              >
                <input
                  v-model="asset.zip"
                  v-mask="'#####'"
                  :name="'asset_' + index + '_zip'"
                  type="text"
                  class="form-control"
                >
                <label
                  :class="{ hasvalue: asset.zip }"
                  :for="'asset_' + index + '_zip'"
                >
                  {{ 'Property Zip Code' | titlecase }}
                </label>
              </div>
              <div class="form-group col-12 col-lg-6">
                <select
                  :name="'asset_' + index + '_propertyType'"
                  v-model="asset.propertyType"
                  class="custom-select"
                >
                  <option
                    value="null"
                    disabled
                    hidden
                  />
                  <option
                    v-for="(option, propertyTypeIndex) in propertyTypeOptions"
                    :key="propertyTypeIndex"
                    :value="option"
                  >
                    {{ option.name | titlecase }}
                  </option>
                </select>
                <label
                  :class="{ hasvalue: asset.propertyType }"
                  :for="'asset_' + index + '_propertyType'"
                >
                  {{ 'Property Type' | titlecase }}
                </label>
              </div>
              <div class="form-group col-12 col-lg-6">
                <input
                  v-model="asset.presentMarketValue"
                  v-currency="{distractionFree: false}"
                  :name="'asset_' + index + '_presentMarketValue'"
                  type="text"
                  class="form-control"
                >
                <label
                  :class="{ hasvalue: asset.presentMarketValue }"
                  :for="'asset_' + index + '_presentMarketValue'"
                >
                  {{ 'Present Market Value' | titlecase }}
                </label>
              </div>
              <div class="form-group col-12 col-lg-6">
                <input
                  v-model="asset.totalLiens"
                  v-currency="{distractionFree: false}"
                  :name="'asset_' + index + '_totalLiens'"
                  type="text"
                  class="form-control"
                >
                <label
                  :class="{ hasvalue: asset.totalLiens }"
                  :for="'asset_' + index + '_totalLiens'"
                >
                  {{ 'Amount of Mortgages & Liens' | titlecase }}
                </label>
              </div>
              <div class="form-group col-12 col-lg-6">
                <input
                  v-model="asset.grossRentalIncome"
                  v-currency="{distractionFree: false}"
                  :name="'asset_' + index + '_grossRentalIncome'"
                  type="text"
                  class="form-control"
                >
                <label
                  :class="{ hasvalue: asset.grossRentalIncome }"
                  :for="'asset_' + index + '_grossRentalIncome'"
                >
                  {{ 'Gross Rental Income' | titlecase }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12">
          <button
            type="submit"
            name="submit"
            class="btn btn--submit btn-primary form--apply__submit mt-4"
          >
            {{ submitText | titlecase }}
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-5">
          <p class="form--apply__footer">
            Your information is private, and will be submitted over secure connections.
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import {
  authenticate,
  // getCreditRating,
  // getLoanPurpose,
  // getMaritalStatus,
  // getPropertyType,
  // getPropertyUse,
  // getState,
  applicationCreate
} from '~/services/api'

export default {
  props: {
    loader: Boolean,
    submitText: {
      type: String,
      default: 'Submit'
    }
  },
  data () {
    return {
      assetsAndLiabilities: false,
      copyPropertyAddress: {
        primary: false,
        coBorrower: false
      },
      error: {
        message: null,
        status: null,
        subject: null,
        showDetails: false
      },
      errors: [],
      // errors: {
      //   address: false,
      //   applicationCreate: false,
      //   assetsAndLiabilities: false,
      //   businessPhone: false,
      //   cellPhone: false,
      //   coBorrowerAddress: false,
      //   coBorrowerBusinessPhone: false,
      //   coBorrowerCellPhone: false,
      //   coBorrowerDob: false,
      //   coBorrowerEmail: false,
      //   coBorrowerEmployerName: false,
      //   coBorrowerFirstName: false,
      //   coBorrowerLastName: false,
      //   coBorrowerMailingAddress: false,
      //   coBorrowerSsn: false,
      //   dob: false,
      //   email: false,
      //   employerName: false,
      //   firstName: false,
      //   lastName: false,
      //   mailingAddress: false,
      //   loanAmount: false,
      //   propertyAddress: false,
      //   propertyZip: false,
      //   realEstate: false,
      //   result: false,
      //   ssn: false
      // },
      hasErrors: false,
      hasCoBorrower: false,
      step: 0,
      modelConfig: {
        type: 'string',
        mask: 'DD/MM/YYYY' // Uses 'iso' if missing
      }
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      applicationData: state => state.application.data,
      leadData: state => state.lead,
      loanProduct: state => state.application.loanProduct,
      maritalStatusOptions: state => state.form.options.maritalStatusOptions,
      productId: state => state.application.loanProduct.productId,
      propertyTypeOptions: state => state.form.options.propertyTypeOptions,
      propertyUseOptions: state => state.form.options.propertyUseOptions,
      searchResults: state => state.searchResultsReduced,
      searchResultDetails: state => state.searchResultDetails
    }),
    address: {
      get () {
        return this.$store.state.application.data.address
      },
      set (value) {
        this.$store.commit('updateAddress', value)
      }
    },
    businessPhone: {
      get () {
        return this.$store.state.application.data.businessPhone
      },
      set (value) {
        this.$store.commit('updateBusinessPhone', value)
      }
    },
    cellPhone: {
      get () {
        return this.$store.state.application.data.cellPhone
      },
      set (value) {
        this.$store.commit('updateCellPhone', value)
      }
    },
    coBorrower: {
      get () {
        return this.$store.state.application.data.coBorrower
      },
      set (value) {
        this.$store.commit('updateCoBorrower', value)
      }
    },
    coBorrowerAddress: {
      get () {
        return this.$store.state.application.data.coBorrowerAddress
      },
      set (value) {
        this.$store.commit('updateCoBorrowerAddress', value)
      }
    },
    coBorrowerBusinessPhone: {
      get () {
        return this.$store.state.application.data.coBorrowerBusinessPhone
      },
      set (value) {
        this.$store.commit('updateCoBorrowerBusinessPhone', value)
      }
    },
    coBorrowerCellPhone: {
      get () {
        return this.$store.state.application.data.coBorrowerCellPhone
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCellPhone', value)
      }
    },
    coBorrowerCity: {
      get () {
        return this.$store.state.application.data.coBorrowerCity
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCity', value)
      }
    },
    coBorrowerCurrentHazardInsurance: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentHazardInsurance
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentHazardInsurance', value)
      }
    },
    coBorrowerCurrentHoaFees: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentHoaFees
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentHoaFees', value)
      }
    },
    coBorrowerCurrentMortgagePayment: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentMortgagePayment
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentMortgagePayment', value)
      }
    },
    coBorrowerCurrentPropertyTaxes: {
      get () {
        return this.$store.state.application.data.coBorrowerCurrentPropertyTaxes
      },
      set (value) {
        this.$store.commit('updateCoBorrowerCurrentPropertyTaxes', value)
      }
    },
    coBorrowerDob: {
      get () {
        return this.$store.state.application.data.coBorrowerDob
      },
      set (value) {
        this.$store.commit('updateCoBorrowerDob', value)
      }
    },
    coBorrowerEmail: {
      get () {
        return this.$store.state.application.data.coBorrowerEmail
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmail', value)
      }
    },
    coBorrowerEmployedHowLong: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployedHowLong
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployedHowLong', value)
      }
    },
    coBorrowerEmployerCity: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerCity
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerCity', value)
      }
    },
    coBorrowerEmployerName: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerName
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerName', value)
      }
    },
    coBorrowerEmployerState: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerState
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerState', value)
      }
    },
    coBorrowerFax: {
      get () {
        return this.$store.state.application.data.coBorrowerFax
      },
      set (value) {
        this.$store.commit('updateCoBorrowerFax', value)
      }
    },
    coBorrowerFirstName: {
      get () {
        return this.$store.state.application.data.coBorrowerFirstName
      },
      set (value) {
        this.$store.commit('updateCoBorrowerFirstName', value)
      }
    },
    coBorrowerGrossIncome: {
      get () {
        return this.$store.state.application.data.coBorrowerGrossIncome
      },
      set (value) {
        this.$store.commit('updateCoBorrowerGrossIncome', value)
      }
    },
    // coBorrowerHoaDues: {
    //   get () {
    //     return this.$store.state.application.data.coBorrowerHoaDues
    //   },
    //   set (value) {
    //     this.$store.commit('updateCoBorrowerHoaDues', value)
    //   }
    // },
    coBorrowerHomePhone: {
      get () {
        return this.$store.state.application.data.coBorrowerHomePhone
      },
      set (value) {
        this.$store.commit('updateCoBorrowerHomePhone', value)
      }
    },
    coBorrowerJobTitle: {
      get () {
        return this.$store.state.application.data.coBorrowerJobTitle
      },
      set (value) {
        this.$store.commit('updateCoBorrowerJobTitle', value)
      }
    },
    coBorrowerLastName: {
      get () {
        return this.$store.state.application.data.coBorrowerLastName
      },
      set (value) {
        this.$store.commit('updateCoBorrowerLastName', value)
      }
    },
    coBorrowerMaritalStatus: {
      get () {
        return this.$store.state.application.data.coBorrowerMaritalStatus
      },
      set (value) {
        this.$store.commit('updateCoBorrowerMaritalStatus', value)
      }
    },
    coBorrowerSelfEmployed: {
      get () {
        return this.$store.state.application.data.coBorrowerSelfEmployed
      },
      set (value) {
        this.$store.commit('updateCoBorrowerSelfEmployed', value)
      }
    },
    coBorrowerSsn: {
      get () {
        return this.$store.state.application.data.coBorrowerSsn
      },
      set (value) {
        this.$store.commit('updateCoBorrowerSsn', value)
      }
    },
    coBorrowerState: {
      get () {
        return this.$store.state.application.data.coBorrowerState
      },
      set (value) {
        this.$store.commit('updateCoBorrowerState', value)
      }
    },
    coBorrowerTimeAtCurrentAddress: {
      get () {
        return this.$store.state.application.data.coBorrowerTimeAtCurrentAddress
      },
      set (value) {
        this.$store.commit('updateCoBorrowerTimeAtCurrentAddress', value)
      }
    },
    coBorrowerYearsLineOfWork: {
      get () {
        return this.$store.state.application.data.coBorrowerYearsLineOfWork
      },
      set (value) {
        this.$store.commit('updateCoBorrowerYearsLineOfWork', value)
      }
    },
    coBorrowerYearsOfSchool: {
      get () {
        return this.$store.state.application.data.coBorrowerYearsOfSchool
      },
      set (value) {
        this.$store.commit('updateCoBorrowerYearsOfSchool', value)
      }
    },
    coBorrowerZip: {
      get () {
        return this.$store.state.application.data.coBorrowerZip
      },
      set (value) {
        this.$store.commit('updateCoBorrowerZip', value)
      }
    },
    county: {
      get () {
        return this.$store.state.application.data.county
      },
      set (value) {
        this.$store.commit('updateCounty', value)
      }
    },
    creditRating: {
      get () {
        return this.$store.state.application.data.creditRating
      },
      set (value) {
        this.$store.commit('updateCreditRating', value)
      }
    },
    currentAddress: {
      get () {
        return this.$store.state.application.data.currentAddress
      },
      set (value) {
        this.$store.commit('updateCurrentAddress', value)
      }
    },
    currentCity: {
      get () {
        return this.$store.state.application.data.currentCity
      },
      set (value) {
        this.$store.commit('updateCurrentCity', value)
      }
    },
    currentHazardInsurance: {
      get () {
        return this.$store.state.application.data.currentHazardInsurance
      },
      set (value) {
        this.$store.commit('updateCurrentHazardInsurance', value)
      }
    },
    currentHoaFees: {
      get () {
        return this.$store.state.application.data.currentHoaFees
      },
      set (value) {
        this.$store.commit('updateCurrentHoaFees', value)
      }
    },
    currentMortgagePayment: {
      get () {
        return this.$store.state.application.data.currentMortgagePayment
      },
      set (value) {
        this.$store.commit('updateCurrentMortgagePayment', value)
      }
    },
    currentPropertyTaxes: {
      get () {
        return this.$store.state.application.data.currentPropertyTaxes
      },
      set (value) {
        this.$store.commit('updateCurrentPropertyTaxes', value)
      }
    },
    currentState: {
      get () {
        return this.$store.state.application.data.currentState
      },
      set (value) {
        this.$store.commit('updateCurrentState', value)
      }
    },
    currentZip: {
      get () {
        return this.$store.state.application.data.currentZip
      },
      set (value) {
        this.$store.commit('updateCurrentZip', value)
      }
    },
    dob: {
      get () {
        return this.$store.state.application.data.dob
      },
      set (value) {
        this.$store.commit('updateDob', value)
      }
    },
    donationAmount: {
      get () {
        return this.$store.state.application.data.donationAmount
      },
      set (value) {
        this.$store.commit('updateDonationAmount', value)
      }
    },
    email: {
      get () {
        return this.$store.state.application.data.email
      },
      set (value) {
        this.$store.commit('updateEmail', value)
      }
    },
    employedHowLong: {
      get () {
        return this.$store.state.application.data.employedHowLong
      },
      set (value) {
        this.$store.commit('updateEmployedHowLong', value)
      }
    },
    employerCity: {
      get () {
        return this.$store.state.application.data.employerCity
      },
      set (value) {
        this.$store.commit('updateEmployerCity', value)
      }
    },
    employerName: {
      get () {
        return this.$store.state.application.data.employerName
      },
      set (value) {
        this.$store.commit('updateEmployerName', value)
      }
    },
    employerState: {
      get () {
        return this.$store.state.application.data.employerState
      },
      set (value) {
        this.$store.commit('updateEmployerState', value)
      }
    },
    fax: {
      get () {
        return this.$store.state.application.data.fax
      },
      set (value) {
        this.$store.commit('updateFax', value)
      }
    },
    firstMortgage: {
      get () {
        return this.$store.state.application.data.expenses[0].firstMortgage
      },
      set (value) {
        this.$store.commit('updateExpensesPresentFirstMortgage', value)
      }
    },
    firstName: {
      get () {
        return this.$store.state.application.data.firstName
      },
      set (value) {
        this.$store.commit('updateFirstName', value)
      }
    },
    grossIncome: {
      get () {
        return this.$store.state.application.data.grossIncome
      },
      set (value) {
        this.$store.commit('updateGrossIncome', value)
      }
    },
    coBorrowerFirstMortgage: {
      get () {
        return this.$store.state.application.data.coBorrowerExpenses[0].firstMortgage
      },
      set (value) {
        this.$store.commit('updateCoBorrowerExpensesPresentFirstMortgage', value)
      }
    },
    coBorrowerHazardInsurance: {
      get () {
        return this.$store.state.application.data.coBorrowerExpenses[0].hazardInsurance
      },
      set (value) {
        this.$store.commit('updateCoBorrowerExpensesPresentHazardInsurance', value)
      }
    },
    coBorrowerHoaDues: {
      get () {
        return this.$store.state.application.data.coBorrowerExpenses[0].hoaDues
      },
      set (value) {
        this.$store.commit('updateCoBorrowerExpensesPresentHoaDues', value)
      }
    },
    coBorrowerRealEstateTaxes: {
      get () {
        return this.$store.state.application.data.coBorrowerExpenses[0].realEstateTaxes
      },
      set (value) {
        this.$store.commit('updateCoBorrowerExpensesPresentRealEstateTaxes', value)
      }
    },
    hazardInsurance: {
      get () {
        return this.$store.state.application.data.expenses[0].hazardInsurance
      },
      set (value) {
        this.$store.commit('updateExpensesPresentHazardInsurance', value)
      }
    },
    hoaDues: {
      get () {
        return this.$store.state.application.data.expenses[0].hoaDues
      },
      set (value) {
        this.$store.commit('updateExpensesPresentHoaDues', value)
      }
    },
    homePhone: {
      get () {
        return this.$store.state.application.data.homePhone
      },
      set (value) {
        this.$store.commit('updateHomePhone', value)
      }
    },
    jobTitle: {
      get () {
        return this.$store.state.application.data.jobTitle
      },
      set (value) {
        this.$store.commit('updateJobTitle', value)
      }
    },
    keepingLoc: {
      get () {
        return this.$store.state.application.data.keepingLoc
      },
      set (value) {
        this.$store.commit('updateKeepingLoc', value)
      }
    },
    lastName: {
      get () {
        return this.$store.state.application.data.lastName
      },
      set (value) {
        this.$store.commit('updateLastName', value)
      }
    },
    loanAmount: {
      get () {
        return this.$store.state.application.data.loanAmount
      },
      set (value) {
        this.$store.commit('updateLoanAmount', value)
      }
    },
    loanCashOutAmount: {
      get () {
        return this.$store.state.application.data.loanCashOutAmount
      },
      set (value) {
        this.$store.commit('updateLoanCashOutAmount', value)
      }
    },
    loanDocType: {
      get () {
        return this.$store.state.application.data.loanDocType
      },
      set (value) {
        this.$store.commit('updateLoanDocType', value)
      }
    },
    loanImpounds: {
      get () {
        return this.$store.state.application.data.loanImpounds
      },
      set (value) {
        this.$store.commit('updateLoanImpounds', value)
      }
    },
    loanInterestOnly: {
      get () {
        return this.$store.state.application.data.loanInterestOnly
      },
      set (value) {
        this.$store.commit('updateLoanInterestOnly', value)
      }
    },
    loanPurpose: {
      get () {
        return this.$store.state.application.data.loanPurpose
      },
      set (value) {
        this.$store.commit('updateLoanPurpose', value)
      }
    },
    loanRefinanceType: {
      get () {
        return this.$store.state.application.data.loanRefinanceType
      },
      set (value) {
        this.$store.commit('updateLoanRefinanceType', value)
      }
    },
    loc: {
      get () {
        return this.$store.state.application.data.loc
      },
      set (value) {
        this.$store.commit('updateLoc', value)
      }
    },
    locAfterFirst: {
      get () {
        return this.$store.state.application.data.locAfterFirst
      },
      set (value) {
        this.$store.commit('updatelocAfterFirst', value)
      }
    },
    locAmount: {
      get () {
        return this.$store.state.application.data.locAmount
      },
      set (value) {
        this.$store.commit('updateLocAmount', value)
      }
    },
    mailingAddress: {
      get () {
        return this.$store.state.application.data.mailingAddress
      },
      set (value) {
        this.$store.commit('updateMailingAddress', value)
      }
    },
    mailingZip: {
      get () {
        return this.$store.state.application.data.mailingZip
      },
      set (value) {
        this.$store.commit('updateMailingZip', value)
      }
    },
    maritalStatus: {
      get () {
        return this.$store.state.application.data.maritalStatus
      },
      set (value) {
        this.$store.commit('updateMaritalStatus', value)
      }
    },
    promotionCode: {
      get () {
        return this.$store.state.application.data.promotionCode
      },
      set (value) {
        this.$store.commit('updatePromotionCode', value)
      }
    },
    propertyAddress: {
      get () {
        return this.$store.state.application.data.propertyAddress
      },
      set (value) {
        this.$store.commit('updatePropertyAddress', value)
      }
    },
    propertyCity: {
      get () {
        return this.$store.state.application.data.propertyCity
      },
      set (value) {
        this.$store.commit('updatePropertyCity', value)
      }
    },
    propertyNumberOfUnits: {
      get () {
        return this.$store.state.application.data.propertyNumberOfUnits
      },
      set (value) {
        this.$store.commit('updatePropertyNumberOfUnits', value)
      }
    },
    propertyPurchasePrice: {
      get () {
        return this.$store.state.application.data.propertyPurchasePrice
      },
      set (value) {
        this.$store.commit('updatePropertyPurchasePrice', value)
      }
    },
    propertyType: {
      get () {
        return this.$store.state.application.data.propertyType
      },
      set (value) {
        this.$store.commit('updatePropertyType', value)
      }
    },
    propertyUse: {
      get () {
        return this.$store.state.application.data.propertyUse
      },
      set (value) {
        this.$store.commit('updatePropertyUse', value)
      }
    },
    propertyValue: {
      get () {
        return this.$store.state.application.data.propertyValue
      },
      set (value) {
        this.$store.commit('updatePropertyValue', value)
      }
    },
    propertyYearAcquired: {
      get () {
        return this.$store.state.application.data.propertyYearAcquired
      },
      set (value) {
        this.$store.commit('updatePropertyYearAcquired', value)
      }
    },
    propertyZip: {
      get () {
        return this.$store.state.application.data.propertyZip
      },
      set (value) {
        this.$store.commit('updatePropertyZip', value)
      }
    },
    realEstate: {
      get () {
        return this.$store.state.application.data.realEstate
      },
      set (value) {
        this.$store.commit('updateRealEstate', value)
      }
    },
    realEstateTaxes: {
      get () {
        return this.$store.state.application.data.expenses[0].realEstateTaxes
      },
      set (value) {
        this.$store.commit('updateExpensesPresentRealEstateTaxes', value)
      }
    },
    result: {
      get () {
        return this.$store.state.application.data.result
      },
      set (value) {
        this.$store.commit('updateResult', value)
      }
    },
    selfEmployed: {
      get () {
        return this.$store.state.application.data.selfEmployed
      },
      set (value) {
        this.$store.commit('updateSelfEmployed', value)
      }
    },
    ssn: {
      get () {
        return this.$store.state.application.data.ssn
      },
      set (value) {
        this.$store.commit('updateSsn', value)
      }
    },
    state: {
      get () {
        return this.$store.state.application.data.state
      },
      set (value) {
        this.$store.commit('updateState', value)
      }
    },
    timeAtCurrentAddress: {
      get () {
        return this.$store.state.application.data.timeAtCurrentAddress
      },
      set (value) {
        this.$store.commit('updateTimeAtCurrentAddress', value)
      }
    },
    yearsLineOfWork: {
      get () {
        return this.$store.state.application.data.yearsLineOfWork
      },
      set (value) {
        this.$store.commit('updateYearsLineOfWork', value)
      }
    },
    yearsOfSchool: {
      get () {
        return this.$store.state.application.data.yearsOfSchool
      },
      set (value) {
        this.$store.commit('updateYearsOfSchool', value)
      }
    },
    zip: {
      get () {
        return this.$store.state.application.data.zip
      },
      set (value) {
        this.$store.commit('updateZip', value)
      }
    },
    // Application Payload
    applicationPayload () {
      // The Application Payload object
      const payload = {
        applicationId: this.leadData.id,
        borrowers: [],
        donationAmount: 0.00,
        loan: {
          amount: this.$parseCurrency(this.applicationData.loanAmount),
          cashOutAmount: this.$parseCurrency(this.applicationData.loanCashOutAmount),
          interestRate: this.loanProduct.rate,
          keepingLoc: this.applicationData.keepingLoc ? 1 : 0,
          // loanDocType: 'Full Doc',
          // loanImpounds: 1,
          loanInterestOnly: this.applicationData.loanInterestOnly ? 1 : 0,
          loanPurpose: this.applicationData.loanPurpose?.name,
          loanRefinanceType: this.applicationData.loanRefinanceType, // this.getLoanRefinanceType(),
          loc: this.applicationData.loc ? 1 : 0,
          locAfterFirst: this.applicationData.locAfterFirst ? 1 : 0,
          locAmount: this.$parseCurrency(this.applicationData.locAmount)
        },
        productId: this.productId,
        promotionCode: this.applicationData.promotionCode,
        property: {
          numberUnits: Number(this.applicationData.propertyNumberOfUnits),
          address: this.applicationData.propertyAddress,
          purchasePrice: this.$parseCurrency(this.applicationData.propertyValue),
          propertyType: this.applicationData.propertyType?.name,
          propertyUse: this.applicationData.propertyUse?.name,
          value: this.$parseCurrency(this.applicationData.propertyValue),
          yearAcquired: Number(this.applicationData.propertyYearAcquired),
          zip: this.applicationData.propertyZip
        },
        // realEstate: [], // Moved this to conditional below
        result: JSON.stringify({
          searchResultDetails: this.searchResultDetails
        })
      }
      // Primary Borrower information
      const primaryBorrower = {
        address: this.applicationData.address, // Required if `zip`
        borrowerType: 'Primary', // Required
        businessPhone: this.applicationData.businessPhone,
        cellPhone: this.applicationData.cellPhone,
        creditRating: this.applicationData.creditRating?.name,
        dob: this.applicationData.dob ? this.$moment(this.applicationData.dob).format('YYYY-MM-DD') : null,
        email: this.applicationData.email, // Required

        fax: this.applicationData.fax,
        firstName: this.applicationData.firstName, // Required
        grossIncome: this.$parseCurrency(this.applicationData.grossIncome),
        // homePhone: this.applicationData.homePhone, // Required
        lastName: this.applicationData.lastName, // Required
        mailingAddress: this.applicationData.mailingAddress, // Required if `mailingZip`
        mailingZip: this.applicationData.mailingZip,
        maritalStatus: this.applicationData?.maritalStatus?.name,
        ssn: this.applicationData.ssn,
        // status: 'Own',
        yearsAtAddress: Number(this.applicationData.timeAtCurrentAddress),
        yearsLineOfWork: Number(this.applicationData.yearsLineOfWork),
        yearsOfSchool: Number(this.applicationData.yearsOfSchool),
        zip: this.applicationData.zip
      }
      if (this.applicationData.employerName || this.applicationData.jobTitle || this.applicationData.selfEmployed || this.applicationData.employedHowLong) {
        primaryBorrower.employer = {
          employerName: this.applicationData.employerName, // Required if `employer: {}`
          jobTitle: this.applicationData.jobTitle,
          selfEmployed: Number(this.applicationData.selfEmployed),
          yearsAtJob: Number(this.applicationData.employedHowLong)
          // zip: this.applicationData.employerZip // Required if `employer: {}`
        }
      }
      primaryBorrower.expenses = [{
        expenseType: 'Present',
        firstMortgage: this.$parseCurrency(this.applicationData.expenses[0].firstMortgage) || 0,
        hazardInsurance: this.$parseCurrency(this.applicationData.expenses[0].hazardInsurance) || 0,
        hoaDues: this.$parseCurrency(this.applicationData.expenses[0].hoaDues) || 0,
        realEstateTaxes: this.$parseCurrency(this.applicationData.expenses[0].realEstateTaxes) || 0
      }]
      payload.borrowers.push(primaryBorrower)
      // Co-Borrower information
      if (this.hasCoBorrower) { // if COBORROWER
        const coBorrower = {
          address: this.applicationData.coBorrowerAddress,
          borrowerType: 'Co Borrower',
          businessPhone: this.applicationData.coBorrowerBusinessPhone,
          cellPhone: this.applicationData.coBorrowerCellPhone,
          dob: this.applicationData.coBorrowerDob ? this.$moment(this.applicationData.coBorrowerDob).format('YYYY-MM-DD') : null,
          email: this.applicationData.coBorrowerEmail,

          fax: this.applicationData.coBorrowerFax,
          firstName: this.applicationData.coBorrowerFirstName,
          grossIncome: this.$parseCurrency(this.applicationData.coBorrowerGrossIncome),
          // homePhone: this.applicationData.coBorrowerHomePhone,
          lastName: this.applicationData.coBorrowerLastName,
          maritalStatus: this.applicationData?.coBorrowerMaritalStatus?.name,
          ssn: this.applicationData.coBorrowerSsn,
          // status: 'Own',
          yearsAtAddress: Number(this.applicationData.coBorrowerTimeAtCurrentAddress),
          yearsLineOfWork: Number(this.applicationData.coBorrowerYearsLineOfWork),
          yearsOfSchool: Number(this.applicationData.coBorrowerYearsOfSchool),
          zip: this.applicationData.coBorrowerZip
        }
        if (this.applicationData.coBorrowerEmployerName || this.applicationData.coBorrowerJobTitle || this.applicationData.coBorrowerSelfEmployed || this.applicationData.coBorrowerEmployedHowLong) {
          coBorrower.employer = {
            employerName: this.applicationData.coBorrowerEmployerName,
            jobTitle: this.applicationData.coBorrowerJobTitle,
            selfEmployed: Number(this.applicationData.coBorrowerSelfEmployed),
            yearsAtJob: Number(this.applicationData.coBorrowerEmployedHowLong)
            // zip: this.applicationData.coBorrowerEmployerZip
          }
        }
        coBorrower.expenses = [{
          expenseType: 'Present',
          firstMortgage: this.$parseCurrency(this.applicationData.coBorrowerExpenses[0].firstMortgage) || 0,
          hazardInsurance: this.$parseCurrency(this.applicationData.coBorrowerExpenses[0].hazardInsurance) || 0,
          hoaDues: this.$parseCurrency(this.applicationData.coBorrowerExpenses[0].hoaDues) || 0,
          realEstateTaxes: this.$parseCurrency(this.applicationData.coBorrowerExpenses[0].realEstateTaxes) || 0
        }]
        payload.borrowers.push(coBorrower)
      }
      // Assets and Liabilities
      if (this.assetsAndLiabilities) {
        payload.realEstate = []
        this.realEstate.forEach((asset) => {
          payload.realEstate.push({
            address: asset.address,
            propertyStatus: null, // 'Sold',
            propertyType: asset.propertyType?.name,
            presentMarketValue: this.$parseCurrency(asset.presentMarketValue),
            totalLeins: this.$parseCurrency(asset.totalLiens),
            grossRentalIncome: this.$parseCurrency(asset.grossRentalIncome),
            mortgagePayments: null,
            taxesAndInsurance: null,
            netRentalIncome: null,
            zip: asset.zip
          })
        })
      }
      // RETURN
      return payload
    }
  },
  watch: {
    propertyAddress (value) {
      this.propertyAddress = value
      this.validateRequired(value, 'propertyAddress', 'Property Address')
    },
    propertyZip (value) {
      this.propertyZip = value
      this.validatePropertyZip(value)
    },
    // Borrower Information
    firstName (value) {
      this.firstName = value
      this.validateFirstName(value)
    },
    lastName (value) {
      this.lastName = value
      this.validateLastName(value)
    },
    email (value) {
      this.email = value
      this.validateEmail(value)
    },
    cellPhone (value) {
      this.cellPhone = value
      this.validateCellPhone(value)
    },
    businessPhone (value) {
      this.businessPhone = value
      this.validateBusinessPhone(value)
    },
    address (value) {
      this.address = value
      this.validateAddress(value)
    },
    zip (value) {
      this.zip = value
      this.validateZip(value)
    },
    mailingAddress (value) {
      this.mailingAddress = value
      this.validateMailingAddress(value)
    },
    mailingZip (value) {
      this.mailingZip = value
      this.validateMailingZip(value)
    },
    employerName (value) {
      this.employerName = value
      this.validateEmployerName(value)
    },
    ssn (value) {
      this.ssn = value
      this.validateSsn(value)
    },
    // Co-Borrower Information
    coBorrowerFirstName (value) {
      this.coBorrowerFirstName = value
      this.validateCoBorrowerFirstName(value)
    },
    coBorrowerLastName (value) {
      this.coBorrowerLastName = value
      this.validateCoBorrowerLastName(value)
    },
    coBorrowerEmail (value) {
      this.coBorrowerEmail = value
      this.validateCoBorrowerEmail(value)
    },
    coBorrowerCellPhone (value) {
      this.coBorrowerCellPhone = value
      this.validateCoBorrowerCellPhone(value)
    },
    coBorrowerBusinessPhone (value) {
      this.coBorrowerBusinessPhone = value
      this.validateCoBorrowerBusinessPhone(value)
    },
    coBorrowerAddress (value) {
      this.coBorrowerAddress = value
      this.validateCoBorrowerAddress(value)
    },
    coBorrowerZip (value) {
      this.coBorrowerZip = value
      this.validateCoBorrowerZip(value)
    },
    coBorrowerEmployerName (value) {
      this.coBorrowerEmployerName = value
      this.validateCoBorrowerEmployerName(value)
    },
    coBorrowerSsn (value) {
      this.coBorrowerSsn = value
      this.validateCoBorrowerSsn(value)
    },
    // Dates
    dob (value) {
      this.dob = value
      this.validateDob(value)
    },
    coBorrowerDob (value) {
      this.coBorrowerDob = value
      this.validateDob(value)
    },
    // Assets and liabilities
    assetsAndLiabilities (value) {
      this.assetsAndLiabilities = value
    },
    realEstate (value) {
      this.realEstate = value
      this.validateRealEstate(value)
    }
  },
  async fetch () {
    if (!this.auth?.expirationDate || this.$moment(this.auth.expirationDate).isBefore(this.$moment())) {
      this.$store.commit('setAuth', await authenticate())
    }
    // if (!this.loanPurposeOptions || !this.loanPurposeOptions.length) {
    //   this.$store.commit('updateLoanPurposeOptions', await getLoanPurpose(this.auth))
    // }
    // if (!this.stateOptions || !this.stateOptions.length) {
    //   this.$store.commit('updateStateOptions', await getState(this.auth))
    // }
    // if (!this.propertyTypeOptions || !this.propertyTypeOptions.length) {
    //   this.$store.commit('updatePropertyTypeOptions', await getPropertyType(this.auth))
    // }
    // if (!this.propertyUseOptions || !this.propertyUseOptions.length) {
    //   this.$store.commit('updatePropertyUseOptions', await getPropertyUse(this.auth))
    // }
    // if (!this.creditRatingOptions || !this.creditRatingOptions.length) {
    //   this.$store.commit('updateCreditRatingOptions', await getCreditRating(this.auth))
    // }
    // if (!this.maritalStatusOptions || !this.maritalStatusOptions.length) {
    //   this.$store.commit('updateMaritalStatusOptions', await getMaritalStatus(this.auth))
    // }
  },
  methods: {
    doCopyPropertyAddressPrimary () {
      if (this.copyPropertyAddress.primary) {
        this.address = this.propertyAddress
        this.zip = this.propertyZip
      }
      if (!this.copyPropertyAddress.primary) {
        this.address = null
        this.zip = null
      }
    },
    doCopyPropertyAddressCoBorrower () {
      if (this.copyPropertyAddress.coBorrower) {
        this.coBorrowerAddress = this.propertyAddress
        this.coBorrowerZip = this.propertyZip
      }
      if (!this.copyPropertyAddress.coBorrower) {
        this.coBorrowerAddress = null
        this.coBorrowerZip = null
      }
    },
    formHasErrors () {
      // (re)Set defaults
      let hasErrors = false
      this.error.applicationCreate = false
      this.error.message = null
      this.error.status = null
      this.error.subject = null
      this.error.showDetails = false
      // Check validity
      if (!this.loanPurpose) {
        hasErrors = true
        console.log('Form Errors: loanPurpose', '\n')
      }
      this.validatePropertyAddress(this.applicationData.propertyAddress)
      this.validatePropertyZip(this.applicationData.propertyZip)
      this.validateFirstName(this.applicationData.firstName)
      this.validateLastName(this.applicationData.lastName)
      this.validateEmail(this.applicationData.email)
      this.validateCellPhone(this.applicationData.cellPhone)
      this.validateAddress(this.applicationData.address)
      this.validateZip(this.applicationData.zip)
      this.validateMailingAddress(this.applicationData.mailingAddress)
      this.validateMailingZip(this.applicationData.mailingZip)
      this.validateDob(this.applicationData.dob)
      this.validateCellPhone(this.applicationData.cellPhone)
      this.validateBusinessPhone(this.applicationData.businessPhone)
      this.validateEmployerName(this.applicationData.employerName)
      this.validateSsn(this.applicationData.ssn)
      // Validate CoBorrower
      this.validateCoBorrowerFirstName(this.applicationData.coBorrowerFirstName)
      this.validateCoBorrowerLastName(this.applicationData.coBorrowerLastName)
      this.validateCoBorrowerEmail(this.applicationData.coBorrowerEmail)
      this.validateCoBorrowerCellPhone(this.applicationData.coBorrowerCellPhone)
      this.validateCoBorrowerAddress(this.applicationData.coBorrowerAddress)
      this.validateCoBorrowerZip(this.applicationData.coBorrowerZip)
      this.validateCoBorrowerEmployerName(this.applicationData.coBorrowerEmployerName)
      this.validateDob(this.applicationData.coBorrowerDob)
      this.validateCoBorrowerBusinessPhone(this.applicationData.coBorrowerBusinessPhone)
      this.validateCoBorrowerSsn(this.applicationData.coBorrowerSsn)
      // Validate assets and liabilities
      this.validateRealEstate(this.applicationData.realEstate)
      if (!hasErrors) {
        hasErrors = Object.keys(this.errors).some(k => this.errors[k])
        if (hasErrors) {
          console.log('Form Error Obj: ', '\n', this.errors)
          this.hasErrors = true
        } else {
          this.hasErrors = false
        }
      }
      return hasErrors
    },
    async handleSubmit () {
      this.$emit('applicationSubmitStart')
      // Error checking
      const hasErrors = this.formHasErrors()
      // If no errors
      if (!hasErrors) {
        // console.log('Application Payload:\n', this.applicationPayload)
        const data = await authenticate() // eslint-disable-line no-unused-vars
          .then((auth) => {
            return applicationCreate(auth, this.applicationPayload)
              .then((res) => {
                this.$emit('applicationSubmitSuccess', res)
                return res
              })
              .catch((err) => {
                this.$emit('applicationSubmitError')
                // console.log('There was an error POSTing the ApplicationPayload data\n', err)
                /* throw err */
                this.error.applicationCreate = true
                this.error.status = err.response?.status || false
                this.error.message = err.response?.data?.description || err
                this.error.subject = err.response?.data?.subject || null
              })
          })
          .catch((err) => {
            this.$emit('applicationSubmitError')
            /* throw err */ alert(err.response.data.subject + '\n\n' + err.response.data.description)
          })
        this.$store.commit('setApplicationResults', data)
      } else {
        this.scrollToTop()
      }
      this.$emit('applicationSubmitEnd')
    },
    scrollToTop () {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
      document.body.focus()
    },
    // Regex Tests
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validPhone (phone) {
      const re = /^(\([0-9]{3}\))\s([0-9]{3})-([0-9]{4})$/
      return re.test(phone)
    },
    validSsn (ssn) {
      const re = /^([0-9]{3})-([0-9]{2})-([0-9]{4})$/
      return re.test(ssn)
    },
    validZip (zip) {
      const re = /^([0-9]{5})$/
      return re.test(zip)
    },
    // Return error values
    hasError (fieldId) {
      const error = this.errors.find((obj) => { return obj.field === fieldId })
      if (error) {
        return true
      }
      return false
    },
    getError (fieldId) {
      const error = this.errors.find((obj) => { return obj.field === fieldId })
      return error || false
    },
    getErrorMessage (fieldId) {
      const error = this.getError(fieldId)
      if (error) {
        return error.errorMessage
      }
      return null
    },
    setError (fieldId, fieldName, errorMessage, errorType = null) {
      this.unsetError(fieldId)
      fieldName = fieldName || 'This field'
      const field = fieldId
      const error = { field, errorMessage, errorType }
      this.errors.push(error)
    },
    unsetError (fieldId) {
      const filteredErrors = this.errors.filter(function (er) { return er.field !== fieldId })
      this.errors = filteredErrors
    },
    // Validation Methods
    validateRequired (fieldValue, fieldId, fieldName) {
      if (fieldValue) {
        this.unsetError(fieldId)
        return true
      } else {
        const errorMessage = fieldName + ' is required'
        this.setError(fieldId, fieldName, errorMessage, 'required')
        return false
      }
    },
    // Validation Methods Field Specific
    validatePropertyAddress (value) {
      const exists = this.validateRequired(value, 'propertyAddress', 'Property Address')
      return exists
    },
    validatePropertyZip (value) {
      const fieldId = 'propertyZip'
      const fieldName = 'Zip Code'
      const exists = this.validateRequired(value, fieldId, fieldName)
      if (exists) {
        if (!this.validZip(value)) {
          const field = fieldId
          const errorMessage = fieldName + ' is not valid'
          const error = { field, errorMessage }
          this.errors.push(error)
          return false
        }
        return true
      }
      return false
    },
    validateFirstName (value) {
      const exists = this.validateRequired(value, 'firstName', 'First Name')
      return exists
    },
    validateLastName (value) {
      const exists = this.validateRequired(value, 'lastName', 'Last Name')
      return exists
    },
    validateEmail (value) {
      const fieldId = 'email'
      const fieldName = 'Email'
      const exists = this.validateRequired(value, fieldId, fieldName)
      if (exists) {
        if (!this.validEmail(value)) {
          const field = fieldId
          const errorMessage = fieldName + ' is not valid'
          const error = { field, errorMessage }
          this.errors.push(error)
          return false
        }
        return true
      }
      return false
    },
    validateAddress (value) {
      const exists = this.validateRequired(value, 'address', 'Address')
      return exists
    },
    validateZip (value) {
      const fieldId = 'zip'
      const fieldName = 'Zip Code'
      const exists = this.validateRequired(value, fieldId, fieldName)
      if (exists) {
        if (!this.validZip(value)) {
          const field = fieldId
          const errorMessage = fieldName + ' is not valid'
          const error = { field, errorMessage }
          this.errors.push(error)
          return false
        }
        return true
      }
      return false
    },
    validateMailingAddress (value) {
      if (this.mailingZip) {
        const exists = this.validateRequired(value, 'mailingAddress', 'Mailing Address')
        return exists
      }
      return true
    },
    validateMailingZip (value) {
      const fieldId = 'mailingZip'
      const fieldName = 'Zip Code'
      if (this.mailingAddress) {
        const exists = this.validateRequired(value, fieldId, fieldName)
        return exists
      }
      if (value && !this.validZip(value)) {
        const field = fieldId
        const errorMessage = fieldName + ' is not valid'
        const error = { field, errorMessage }
        this.errors.push(error)
        return false
      }
      return true
    },
    validateEmployerName (value) {
      if (
        this.applicationData.employerName ||
        this.applicationData.jobTitle ||
        this.applicationData.selfEmployed ||
        this.applicationData.employedHowLong
      ) {
        if (value) {
          this.errors.employerName = false
        } else {
          this.errors.employerName = true
        }
      } else {
        this.errors.employerName = false
      }
    },
    validateCoBorrowerFirstName (value) {
      if (this.hasCoBorrower) {
        if (value) {
          this.errors.coBorrowerFirstName = false
        } else {
          this.errors.coBorrowerFirstName = true
        }
      } else {
        this.errors.coBorrowerFirstName = false
      }
    },
    validateCoBorrowerLastName (value) {
      if (this.hasCoBorrower) {
        if (value) {
          this.errors.coBorrowerLastName = false
        } else {
          this.errors.coBorrowerLastName = true
        }
      } else {
        this.errors.coBorrowerLastName = false
      }
    },
    validateCoBorrowerEmail (value) {
      if (this.hasCoBorrower && !this.validEmail(value)) {
        this.errors.coBorrowerEmail = true
      }
      if (!this.hasCoBorrower || this.validEmail(value)) {
        this.errors.coBorrowerEmail = false
      }
    },
    validateCoBorrowerAddress (value) {
      if (this.hasCoBorrower) {
        if (value) {
          this.errors.coBorrowerAddress = false
        } else {
          this.errors.coBorrowerAddress = true
        }
      } else {
        this.errors.coBorrowerAddress = false
      }
    },
    validateCoBorrowerZip (value) {
      if (this.hasCoBorrower) {
        if (this.validZip(value)) {
          this.errors.coBorrowerZip = false
        } else {
          this.errors.coBorrowerZip = true
        }
      } else {
        this.errors.coBorrowerZip = false
      }
    },
    validateCoBorrowerEmployerName (value) {
      if (this.hasCoBorrower) {
        if (
          this.applicationData.coBorrowerEmployerName ||
          this.applicationData.coBorrowerJobTitle ||
          this.applicationData.coBorrowerSelfEmployed ||
          this.applicationData.coBorrowerEmployedHowLong
        ) {
          if (value) {
            this.errors.coBorrowerEmployerName = false
          } else {
            this.errors.coBorrowerEmployerName = true
          }
        } else {
          this.errors.coBorrowerEmployerName = false
        }
      } else {
        this.errors.coBorrowerEmployerName = false
      }
    },
    validateDob (value) {
      if (value && (this.$moment(value).isAfter(this.$moment()) || !this.$moment(value).isValid())) {
        this.errors.dob = true
      } else {
        this.errors.dob = false
      }
    },
    // validateCoBorrowerDob (value) {
    //   if (value && (this.$moment(value).isAfter(this.$moment()) || !this.$moment(value).isValid())) {
    //     this.errors.dob = true
    //   } else {
    //     this.errors.dob = false
    //   }
    // },
    validateCellPhone (value) {
      if (!value) {
        this.errors.cellPhone = true
      }
      if (value && !this.validPhone(value)) {
        this.errors.cellPhone = true
      }
      if (value && this.validPhone(value)) {
        this.errors.cellPhone = false
      }
    },
    validateBusinessPhone (value) {
      if (!value) {
        this.errors.businessPhone = false
      }
      if (value && !this.validPhone(value)) {
        this.errors.businessPhone = true
      }
      if (value && this.validPhone(value)) {
        this.errors.businessPhone = false
      }
    },
    validateCoBorrowerCellPhone (value) {
      if (!this.hasCoBorrower || (value && this.validPhone(value))) {
        this.errors.coBorrowerCellPhone = false
      }
      if (this.hasCoBorrower && !value) {
        this.errors.coBorrowerCellPhone = true
      }
      if (value && !this.validPhone(value)) {
        this.errors.coBorrowerCellPhone = true
      }
    },
    validateCoBorrowerBusinessPhone (value) {
      if (!value) {
        this.errors.coBorrowerBusinessPhone = false
      }
      if (value && !this.validPhone(value)) {
        this.errors.coBorrowerBusinessPhone = true
      }
      if (value && this.validPhone(value)) {
        this.errors.coBorrowerBusinessPhone = false
      }
    },
    validateSsn (value) {
      if (value && !this.validSsn(value)) {
        this.errors.ssn = true
      }
      if (!value || (value && this.validSsn(value))) {
        this.errors.ssn = false
      }
    },
    validateCoBorrowerSsn (value) {
      if (value && !this.validSsn(value)) {
        this.errors.coBorrowerSsn = true
      }
      if (!value || (value && this.validSsn(value))) {
        this.errors.coBorrowerSsn = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.form--apply {
  &__header {
    color: $primary;
    font-size: 21px;
    font-weight: bold;
    line-height: 32px;
  }
  &__footer {
    color: $input-placeholder-color;
    font-size: #{$font-size-sm * 0.75};
    font-style: italic;
    line-height: 1.333333333333333;
    @include media-breakpoint-down('sm') {
      padding: 0 #{$spacer * 2};
      text-align: center;
    }
  }
  .section {
    margin-bottom: 4rem;
  }
  h3 {
    margin-bottom: 1em;
  }
}
</style>
