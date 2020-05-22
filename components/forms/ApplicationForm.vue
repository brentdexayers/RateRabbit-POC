<template>
  <div>
    <form
      id="application-form"
      @submit.prevent="handleSubmit"
      action="/apply"
      method="POST"
      class="form form--apply"
    >
      <!-- <h3 class="form--apply__header">
        Start the loan application process
      </h3> -->
      <div v-if="formErrors.length">
        <p class="text-danger">
          Please fix the following errors:
        </p>
        <ul class="text-danger">
          <li v-for="(error, index) in formErrors" :key="index">
            {{ error.error }}
          </li>
        </ul>
      </div>

      <div id="property_information" class="section">
        <h2 class="form--section_header">
          Property Information
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-9">
            <label
              :class="{ hasvalue: propertyAddress }"
              for="propertyAddress"
            >
              {{ 'Property Address (street, city, state)' }}
            </label>
            <input
              v-model="propertyAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyAddress"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-3">
            <label
              :class="{ hasvalue: propertyZip }"
              for="propertyZip"
            >
              {{ 'Zip Code' | titlecase }}
            </label>
            <input
              v-model="propertyZip"
              v-mask="'#####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyZip"
              class="form-control"
            >
          </div>
        </div>
        <div v-if="loanPurpose && (loanPurpose.name === 'Refinance' || loanPurpose.name === 'Refinance Cash Out')" class="row">
          <!-- <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: propertyNumberOfUnits }"
              for="propertyNumberOfUnits"
            >
              {{ 'Number of Units' | titlecase }}
            </label>
            <input
              v-model="propertyNumberOfUnits"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyNumberOfUnits"
              class="form-control"
            >
          </div> -->
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: propertyYearAcquired }"
              for="propertyYearAcquired"
            >
              {{ 'Year Acquired' | titlecase }}
            </label>
            <input
              v-model="propertyYearAcquired"
              v-mask="'####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyYearAcquired"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: propertyPurchasePrice }"
              for="propertyPurchasePrice"
            >
              {{ 'Original Cost' | titlecase }}
            </label>
            <input
              v-model="propertyPurchasePrice"
              v-currency="{distractionFree: false}"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="propertyPurchasePrice"
              class="form-control"
            >
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Borrower Information
        </h2>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: firstName }"
              for="firstName"
            >
              {{ 'First Name' | titlecase }}
            </label>
            <input
              v-model="firstName"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="firstName"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: lastName }"
              for="lastName"
            >
              {{ 'Last Name' | titlecase }}
            </label>
            <input
              v-model="lastName"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="lastName"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: email }"
              for="email"
            >
              {{ 'Email Address' | titlecase }}
            </label>
            <input
              v-model="email"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="email"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: homePhone }"
              for="homePhone"
            >
              {{ 'Home Phone' | titlecase }}
            </label>
            <input
              v-model="homePhone"
              v-mask="'(###) ###-####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="homePhone"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: ssn }"
              for="ssn"
            >
              {{ 'Social Security Number' | titlecase }}
            </label>
            <input
              v-model="ssn"
              v-mask="'###-##-####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="ssn"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: dob }"
              for="dob"
            >
              {{ 'DOB (mm/dd/yyyy)' }}
            </label>
            <input
              v-model="dob"
              v-mask="'##/##/####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="dob"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: yearsOfSchool }"
              for="yearsOfSchool"
            >
              {{ 'Years School' | titlecase }}
            </label>
            <input
              v-model="yearsOfSchool"
              v-mask="'##'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="yearsOfSchool"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: maritalStatus }"
              for="maritalStatus"
            >
              {{ 'Marital Status' }}
            </label>
            <select
              id="input-select--taxes"
              v-model="maritalStatus"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
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
          </div>
          <div class="form-group col-12 col-lg-9">
            <label
              :class="{ hasvalue: address }"
              for="address"
            >
              {{ 'Present Address' }}
            </label>
            <input
              v-model="address"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="address"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-3">
            <label
              :class="{ hasvalue: zip }"
              for="zip"
            >
              {{ 'Zip Code' }}
            </label>
            <input
              v-model="zip"
              v-mask="'#####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="zip"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-12">
            <label
              :class="{ hasvalue: timeAtCurrentAddress }"
              for="timeAtCurrentAddress"
            >
              {{ 'Years at Current Address' }}
            </label>
            <input
              v-model="timeAtCurrentAddress"
              v-mask="'##'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="timeAtCurrentAddress"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-9">
            <label
              :class="{ hasvalue: mailingAddress }"
              for="mailingAddress"
            >
              {{ 'Mailing Address (if different from present address)' }}
            </label>
            <input
              v-model="mailingAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="mailingAddress"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-3">
            <label
              :class="{ hasvalue: mailingZip }"
              for="mailingZip"
            >
              {{ 'Zip Code' }}
            </label>
            <input
              v-model="mailingZip"
              v-mask="'#####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="mailingZip"
              class="form-control"
            >
          </div>
        </div>

        <h3>Employer</h3>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <label
              :class="{ hasvalue: employerName }"
              for="employerName"
            >
              {{ 'Employer Name' | titlecase }}
            </label>
            <input
              v-model="employerName"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="employerName"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-8">
            <label
              :class="{ hasvalue: employerAddress }"
              for="employerAddress"
            >
              {{ 'Employer Address' | titlecase }}
            </label>
            <input
              v-model="employerAddress"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="employerAddress"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: employerZip }"
              for="employerZip"
            >
              {{ 'Employer Zip Code' | titlecase }}
            </label>
            <input
              v-model="employerZip"
              v-mask="'#####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="employerZip"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: selfEmployed }"
              for="selfEmployed"
            >
              {{ 'Self Employed' | titlecase }}
            </label>
            <select
              id="input-select--selfEmployed"
              v-model="selfEmployed"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
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
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: employedHowLong }"
              for="employedHowLong"
            >
              {{ 'Years at this job' | titlecase }}
            </label>
            <input
              v-model="employedHowLong"
              v-mask="'##'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="employedHowLong"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: yearsLineOfWork }"
              for="yearsLineOfWork"
            >
              {{ 'Years in line of work' | titlecase }}
            </label>
            <input
              v-model="yearsLineOfWork"
              v-mask="'##'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="yearsLineOfWork"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-8">
            <label
              :class="{ hasvalue: jobTitle }"
              for="jobTitle"
            >
              {{ 'Position / Job Title' | titlecase }}
            </label>
            <input
              v-model="jobTitle"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="jobTitle"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-4">
            <label
              :class="{ hasvalue: businessPhone }"
              for="businessPhone"
            >
              {{ 'Business Phone' | titlecase }}
            </label>
            <input
              v-model="businessPhone"
              v-mask="'(###) ###-####'"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="businessPhone"
              class="form-control"
            >
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
                id="coBorrower"
                v-model="coBorrower"
                type="checkbox"
                class="custom-control-input"
              >
              <label
                class="custom-control-label"
                for="coBorrower"
              >
                Include Co-Borrower?
              </label>
            </div>
          </div>
        </div>

        <div v-if="coBorrower">
          <div class="row">
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerFirstName }"
                for="coBorrowerFirstName"
              >
                {{ 'First Name' | titlecase }}
              </label>
              <input
                v-model="coBorrowerFirstName"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerFirstName"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerLastName }"
                for="coBorrowerLastName"
              >
                {{ 'Last Name' | titlecase }}
              </label>
              <input
                v-model="coBorrowerLastName"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerLastName"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerEmail }"
                for="coBorrowerEmail"
              >
                {{ 'Email Address' | titlecase }}
              </label>
              <input
                v-model="coBorrowerEmail"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerEmail"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerHomePhone }"
                for="coBorrowerHomePhone"
              >
                {{ 'Home Phone' | titlecase }}
              </label>
              <input
                v-model="coBorrowerHomePhone"
                v-mask="'(###) ###-####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerHomePhone"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerSsn }"
                for="coBorrowerSsn"
              >
                {{ 'Social Security Number' | titlecase }}
              </label>
              <input
                v-model="coBorrowerSsn"
                v-mask="'###-##-####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerSsn"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerDob }"
                for="coBorrowerDob"
              >
                {{ 'DOB (mm/dd/yyyy)' }}
              </label>
              <input
                v-model="coBorrowerDob"
                v-mask="'##/##/####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerDob"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerYearsOfSchool }"
                for="coBorrowerYearsOfSchool"
              >
                {{ 'Years School' | titlecase }}
              </label>
              <input
                v-model="coBorrowerYearsOfSchool"
                v-mask="'##'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerYearsOfSchool"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerMaritalStatus }"
                for="coBorrowerMaritalStatus"
              >
                {{ 'Marital Status' }}
              </label>
              <select
                id="input-select--taxes"
                v-model="coBorrowerMaritalStatus"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
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
            </div>
            <div class="form-group col-12 col-lg-8">
              <label
                :class="{ hasvalue: coBorrowerAddress }"
                for="coBorrowerAddress"
              >
                {{ 'Present Address' }}
              </label>
              <input
                v-model="coBorrowerAddress"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerAddress"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: coBorrowerZip }"
                for="coBorrowerZip"
              >
                {{ 'Present Zip Code' }}
              </label>
              <input
                v-model="coBorrowerZip"
                v-mask="'#####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerZip"
                class="form-control"
              >
            </div>
          </div>

          <h3>Employer</h3>
          <div class="row">
            <div class="form-group col-12 col-lg-12">
              <label
                :class="{ hasvalue: coBorrowerEmployerName }"
                for="coBorrowerEmployerName"
              >
                {{ 'Employer Name' | titlecase }}
              </label>
              <input
                v-model="coBorrowerEmployerName"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerEmployerName"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-8">
              <label
                :class="{ hasvalue: coBorrowerEmployerAddress }"
                for="coBorrowerEmployerAddress"
              >
                {{ 'Employer Address' | titlecase }}
              </label>
              <input
                v-model="coBorrowerEmployerAddress"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerEmployerAddress"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: coBorrowerEmployerZip }"
                for="coBorrowerEmployerZip"
              >
                {{ 'Employer Zip Code' | titlecase }}
              </label>
              <input
                v-model="coBorrowerEmployerZip"
                v-mask="'#####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerEmployerZip"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: coBorrowerSelfEmployed }"
                for="coBorrowerSelfEmployed"
              >
                {{ 'Self Employed' | titlecase }}
              </label>
              <select
                id="input-select--coBorrowerSelfEmployed"
                v-model="coBorrowerSelfEmployed"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
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
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: coBorrowerEmployedHowLong }"
                for="coBorrowerEmployedHowLong"
              >
                {{ 'Years at this job' | titlecase }}
              </label>
              <input
                v-model="coBorrowerEmployedHowLong"
                v-mask="'##'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerEmployedHowLong"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: coBorrowerYearsLineOfWork }"
                for="coBorrowerYearsLineOfWork"
              >
                {{ 'Years in line of work' | titlecase }}
              </label>
              <input
                v-model="coBorrowerYearsLineOfWork"
                v-mask="'##'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerYearsLineOfWork"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-8">
              <label
                :class="{ hasvalue: coBorrowerJobTitle }"
                for="coBorrowerJobTitle"
              >
                {{ 'Position / Job Title' | titlecase }}
              </label>
              <input
                v-model="coBorrowerJobTitle"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerJobTitle"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: coBorrowerBusinessPhone }"
                for="coBorrowerBusinessPhone"
              >
                {{ 'Business Phone' | titlecase }}
              </label>
              <input
                v-model="coBorrowerBusinessPhone"
                v-mask="'(###) ###-####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerBusinessPhone"
                class="form-control"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Monthly Income and Housing Expenses
        </h2>
        <h3 v-if="coBorrower">
          Borrower
        </h3>
        <div class="row">
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: grossIncome }"
              for="grossIncome"
            >
              {{ 'Base Income *' | titlecase }}
            </label>
            <input
              v-model="grossIncome"
              v-currency="{distractionFree: false}"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="grossIncome"
              class="form-control"
            >
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              :class="{ hasvalue: hoaDues }"
              for="hoaDues"
            >
              {{ 'Homeowner Association Dues' | titlecase }}
            </label>
            <input
              v-model="hoaDues"
              v-currency="{distractionFree: false}"
              @focus="focusClassAdd($event)"
              @blur="focusClassRemove($event)"
              type="text"
              name="hoaDues"
              class="form-control"
            >
          </div>
        </div>
        <div v-if="coBorrower">
          <h3>
            Co-Borrower
          </h3>
          <div class="row">
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerGrossIncome }"
                for="coBorrowerGrossIncome"
              >
                {{ 'Base Income *' | titlecase }}
              </label>
              <input
                v-model="coBorrowerGrossIncome"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerGrossIncome"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: coBorrowerHoaDues }"
                for="coBorrowerHoaDues"
              >
                {{ 'Homeowner Association Dues' | titlecase }}
              </label>
              <input
                v-model="coBorrowerHoaDues"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="coBorrowerHoaDues"
                class="form-control"
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-lg-12">
            <p class="small">
              * Self employed Borrowers <span v-if="coBorrower">and Co-Borrowers </span>may  be required to provide additional documentation such as tax returns and financial statements.
            </p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="form--section_header">
          Assets and Liabilities
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
                Include real estate assets and liabilities?
              </label>
            </div>
          </div>
        </div>

        <div v-if="assetsAndLiabilities">
          <h3>
            Property 1
          </h3>
          <div class="row">
            <div class="form-group col-12 col-lg-8">
              <label
                :class="{ hasvalue: realEstate_0_address }"
                for="realEstate_0_address"
              >
                {{ 'Property Address' | titlecase }}
              </label>
              <input
                v-model="realEstate_0_address"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_0_address"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: realEstate_0_zip }"
                for="realEstate_0_zip"
              >
                {{ 'Property Zip Code' | titlecase }}
              </label>
              <input
                v-model="realEstate_0_zip"
                v-mask="'#####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_0_zip"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_0_propertyType }"
                for="realEstate_0_propertyType"
              >
                {{ 'Property Type' | titlecase }}
              </label>
              <select
                v-model="realEstate_0_propertyType"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                name="realEstate_0_propertyType"
                class="custom-select"
              >
                <option
                  value="null"
                  disabled
                  hidden
                />
                <option
                  v-for="(option, index) in propertyTypeOptions"
                  :key="index"
                  :value="option"
                >
                  {{ option.name | titlecase }}
                </option>
              </select>
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_0_presentMarketValue }"
                for="realEstate_0_presentMarketValue"
              >
                {{ 'Present Market Value' | titlecase }}
              </label>
              <input
                v-model="realEstate_0_presentMarketValue"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_0_presentMarketValue"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_0_totalLiens }"
                for="realEstate_0_totalLiens"
              >
                {{ 'Amount of Mortgages & Liens' | titlecase }}
              </label>
              <input
                v-model="realEstate_0_totalLiens"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_0_totalLiens"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_0_grossRentalIncome }"
                for="realEstate_0_grossRentalIncome"
              >
                {{ 'Gross Rental Income' | titlecase }}
              </label>
              <input
                v-model="realEstate_0_grossRentalIncome"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_0_grossRentalIncome"
                class="form-control"
              >
            </div>
          </div>
          <h3>
            Property 2
          </h3>
          <div class="row">
            <div class="form-group col-12 col-lg-8">
              <label
                :class="{ hasvalue: realEstate_1_address }"
                for="realEstate_1_address"
              >
                {{ 'Property Address' | titlecase }}
              </label>
              <input
                v-model="realEstate_1_address"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_1_address"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: realEstate_1_zip }"
                for="realEstate_1_zip"
              >
                {{ 'Property Zip Code' | titlecase }}
              </label>
              <input
                v-model="realEstate_1_zip"
                v-mask="'#####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_1_zip"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_1_propertyType }"
                for="realEstate_1_propertyType"
              >
                {{ 'Property Type' | titlecase }}
              </label>
              <select
                v-model="realEstate_1_propertyType"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                name="realEstate_1_propertyType"
                class="custom-select"
              >
                <option
                  value="null"
                  disabled
                  hidden
                />
                <option
                  v-for="(option, index) in propertyTypeOptions"
                  :key="index"
                  :value="option"
                >
                  {{ option.name | titlecase }}
                </option>
              </select>
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_1_presentMarketValue }"
                for="realEstate_1_presentMarketValue"
              >
                {{ 'Present Market Value' | titlecase }}
              </label>
              <input
                v-model="realEstate_1_presentMarketValue"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_1_presentMarketValue"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_1_totalLiens }"
                for="realEstate_1_totalLiens"
              >
                {{ 'Amount of Mortgages & Liens' | titlecase }}
              </label>
              <input
                v-model="realEstate_1_totalLiens"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_1_totalLiens"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_1_grossRentalIncome }"
                for="realEstate_1_grossRentalIncome"
              >
                {{ 'Gross Rental Income' | titlecase }}
              </label>
              <input
                v-model="realEstate_1_grossRentalIncome"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_1_grossRentalIncome"
                class="form-control"
              >
            </div>
          </div>
          <h3>
            Property 3
          </h3>
          <div class="row">
            <div class="form-group col-12 col-lg-8">
              <label
                :class="{ hasvalue: realEstate_2_address }"
                for="realEstate_2_address"
              >
                {{ 'Property Address' | titlecase }}
              </label>
              <input
                v-model="realEstate_2_address"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_2_address"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-4">
              <label
                :class="{ hasvalue: realEstate_2_zip }"
                for="realEstate_2_zip"
              >
                {{ 'Property Zip Code' | titlecase }}
              </label>
              <input
                v-model="realEstate_2_zip"
                v-mask="'#####'"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_2_zip"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_2_propertyType }"
                for="realEstate_2_propertyType"
              >
                {{ 'Property Type' | titlecase }}
              </label>
              <select
                v-model="realEstate_2_propertyType"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                name="realEstate_2_propertyType"
                class="custom-select"
              >
                <option
                  value="null"
                  disabled
                  hidden
                />
                <option
                  v-for="(option, index) in propertyTypeOptions"
                  :key="index"
                  :value="option"
                >
                  {{ option.name | titlecase }}
                </option>
              </select>
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_2_presentMarketValue }"
                for="realEstate_2_presentMarketValue"
              >
                {{ 'Present Market Value' | titlecase }}
              </label>
              <input
                v-model="realEstate_2_presentMarketValue"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_2_presentMarketValue"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_2_totalLiens }"
                for="realEstate_2_totalLiens"
              >
                {{ 'Amount of Mortgages & Liens' | titlecase }}
              </label>
              <input
                v-model="realEstate_2_totalLiens"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_2_totalLiens"
                class="form-control"
              >
            </div>
            <div class="form-group col-12 col-lg-6">
              <label
                :class="{ hasvalue: realEstate_2_grossRentalIncome }"
                for="realEstate_2_grossRentalIncome"
              >
                {{ 'Gross Rental Income' | titlecase }}
              </label>
              <input
                v-model="realEstate_2_grossRentalIncome"
                v-currency="{distractionFree: false}"
                @focus="focusClassAdd($event)"
                @blur="focusClassRemove($event)"
                type="text"
                name="realEstate_2_grossRentalIncome"
                class="form-control"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12">
          <button
            type="submit"
            name="submit"
            class="btn btn-primary form--apply__submit mt-4"
          >
            {{ 'Submit' | titlecase }}
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
  applicationCreate,
  getCreditRating,
  getLoanPurpose,
  getMaritalStatus,
  getPropertyType,
  getPropertyUse,
  getState
} from '~/services/api'

export default {
  data () {
    return {
      assetsAndLiabilities: false,
      formErrors: [],
      step: 0
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      applicationData: state => state.application.data,
      loanProduct: state => state.application.loanProduct,
      maritalStatusOptions: state => state.form.options.maritalStatusOptions,
      propertyTypeOptions: state => state.form.options.propertyTypeOptions,
      propertyUseOptions: state => state.form.options.propertyUseOptions,
      searchResults: state => state.search.results
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
    coBorrowerEmployerAddress: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerAddress
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerAddress', value)
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
    coBorrowerEmployerZip: {
      get () {
        return this.$store.state.application.data.coBorrowerEmployerZip
      },
      set (value) {
        this.$store.commit('updateCoBorrowerEmployerZip', value)
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
    coBorrowerHoaDues: {
      get () {
        return this.$store.state.application.data.coBorrowerHoaDues
      },
      set (value) {
        this.$store.commit('updateCoBorrowerHoaDues', value)
      }
    },
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
    employerAddress: {
      get () {
        return this.$store.state.application.data.employerAddress
      },
      set (value) {
        this.$store.commit('updateEmployerAddress', value)
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
    employerZip: {
      get () {
        return this.$store.state.application.data.employerZip
      },
      set (value) {
        this.$store.commit('updateEmployerZip', value)
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
    hoaDues: {
      get () {
        return this.$store.state.application.data.hoaDues
      },
      set (value) {
        this.$store.commit('updateHoaDues', value)
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
    productId: {
      get () {
        return this.$store.state.application.data.productId
      },
      set (value) {
        this.$store.commit('updateProductId', value)
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
    // Real Estate properties - would be nice to move this to a dynamic array, but for now...
    realEstate_0_address: {
      get () {
        return this.$store.state.application.data.realEstate[0].address
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_address', value)
      }
    },
    realEstate_0_grossRentalIncome: {
      get () {
        return this.$store.state.application.data.realEstate[0].grossRentalIncome
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_grossRentalIncome', value)
      }
    },
    realEstate_0_presentMarketValue: {
      get () {
        return this.$store.state.application.data.realEstate[0].presentMarketValue
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_presentMarketValue', value)
      }
    },
    realEstate_0_propertyType: {
      get () {
        return this.$store.state.application.data.realEstate[0].propertyType
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_propertyType', value)
      }
    },
    realEstate_0_totalLiens: {
      get () {
        return this.$store.state.application.data.realEstate[0].totalLiens
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_totalLiens', value)
      }
    },
    realEstate_0_zip: {
      get () {
        return this.$store.state.application.data.realEstate[0].zip
      },
      set (value) {
        this.$store.commit('updateRealEstate_0_zip', value)
      }
    },
    realEstate_1_address: {
      get () {
        return this.$store.state.application.data.realEstate[1].address
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_address', value)
      }
    },
    realEstate_1_grossRentalIncome: {
      get () {
        return this.$store.state.application.data.realEstate[1].grossRentalIncome
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_grossRentalIncome', value)
      }
    },
    realEstate_1_presentMarketValue: {
      get () {
        return this.$store.state.application.data.realEstate[1].presentMarketValue
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_presentMarketValue', value)
      }
    },
    realEstate_1_propertyType: {
      get () {
        return this.$store.state.application.data.realEstate[1].propertyType
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_propertyType', value)
      }
    },
    realEstate_1_totalLiens: {
      get () {
        return this.$store.state.application.data.realEstate[1].totalLiens
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_totalLiens', value)
      }
    },
    realEstate_1_zip: {
      get () {
        return this.$store.state.application.data.realEstate[1].zip
      },
      set (value) {
        this.$store.commit('updateRealEstate_1_zip', value)
      }
    },
    realEstate_2_address: {
      get () {
        return this.$store.state.application.data.realEstate[2].address
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_address', value)
      }
    },
    realEstate_2_grossRentalIncome: {
      get () {
        return this.$store.state.application.data.realEstate[2].grossRentalIncome
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_grossRentalIncome', value)
      }
    },
    realEstate_2_presentMarketValue: {
      get () {
        return this.$store.state.application.data.realEstate[2].presentMarketValue
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_presentMarketValue', value)
      }
    },
    realEstate_2_propertyType: {
      get () {
        return this.$store.state.application.data.realEstate[2].propertyType
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_propertyType', value)
      }
    },
    realEstate_2_totalLiens: {
      get () {
        return this.$store.state.application.data.realEstate[2].totalLiens
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_totalLiens', value)
      }
    },
    realEstate_2_zip: {
      get () {
        return this.$store.state.application.data.realEstate[2].zip
      },
      set (value) {
        this.$store.commit('updateRealEstate_2_zip', value)
      }
    }
  },
  async fetch () {
    if (!this.auth?.expirationDate || this.$moment(this.auth.expirationDate).isBefore(this.$moment())) {
      this.$store.commit('setAuth', await authenticate())
    }
    if (!this.loanPurposeOptions.length) {
      this.$store.commit('updateLoanPurposeOptions', await getLoanPurpose(this.auth))
    }
    if (!this.stateOptions.length) {
      this.$store.commit('updateStateOptions', await getState(this.auth))
    }
    if (!this.propertyTypeOptions.length) {
      this.$store.commit('updatePropertyTypeOptions', await getPropertyType(this.auth))
    }
    if (!this.propertyUseOptions.length) {
      this.$store.commit('updatePropertyUseOptions', await getPropertyUse(this.auth))
    }
    if (!this.creditRatingOptions.length) {
      this.$store.commit('updateCreditRatingOptions', await getCreditRating(this.auth))
    }
    if (!this.maritalStatusOptions.length) {
      this.$store.commit('updateMaritalStatusOptions', await getMaritalStatus(this.auth))
    }
  },

  methods: {
    focusClassAdd (event) {
      const self = event.target
      self.previousElementSibling.classList.add('focused')
    },
    focusClassRemove (event) {
      const self = event.target
      self.previousElementSibling.classList.remove('focused')
    },
    formValidate () {
      this.$emit('applicationValidateStart')
      this.formErrors = []
      if (!this.$store.state.application.data.firstName) {
        this.formErrors.push({ field: 'firstName', error: 'First Name is required' })
      }
      if (!this.$store.state.application.data.lastName) {
        this.formErrors.push({ field: 'lastName', error: 'Last Name is required' })
      }
      if (!this.$store.state.application.data.homePhone) {
        this.formErrors.push({ field: 'homePhone', error: 'Phone is required' })
      }
      if (!this.$store.state.application.data.email) {
        this.formErrors.push({ field: 'email', error: 'Email is required' })
      }
      if (this.formErrors.length) {
        this.$emit('applicationHasErrors', this.formErrors)
        return false
      }
      this.$emit('applicationValid')
      return true
    },
    async handleSubmit () {
      this.$emit('applicationSubmitStart')
      const valid = this.formValidate()
      if (valid) {
        const applicationPayload = {
          borrowers: [],
          coBorrower: this.applicationData.coBorrower,
          donationAmount: 0.00,
          loan: {
            amount: this.$parseCurrency(this.applicationData.loanAmount),
            cashOutAmount: this.$parseCurrency(this.applicationData.loanCashOutAmount),
            loanDocType: 'Full Doc',
            loanImpounds: 1,
            loanInterestOnly: this.applicationData.loanInterestOnly,
            loanPurpose: this.applicationData.loanPurpose.name,
            loanRefinanceType: 'No Cash Out'
          },
          productId: this.loanProduct.productId,
          promotionCode: this.applicationData.promotionCode,
          property: {
            numberUnits: this.applicationData.propertyNumberOfUnits,
            address: this.applicationData.propertyAddress,
            purchasePrice: this.$parseCurrency(this.applicationData.propertyValue),
            propertyType: this.applicationData.propertyType.name,
            propertyUse: this.applicationData.propertyUse.name,
            value: this.$parseCurrency(this.applicationData.propertyValue),
            yearAcquired: 2017,
            zip: this.applicationData.propertyZip
          },
          realEstate: [],
          result: this.searchResults
        }
        const primaryBorrower = {
          address: this.applicationData.address,
          borrowerType: 'Primary',
          businessPhone: this.applicationData.businessPhone,
          cellPhone: this.applicationData.cellPhone,
          creditRating: this.applicationData.creditRating.name,
          dob: this.$moment(this.applicationData.dob).format('YYYY-MM-DD'),
          email: this.applicationData.email,
          employer: {
            address: this.applicationData.employerAddress,
            employerName: this.applicationData.employerName,
            jobTitle: this.applicationData.jobTitle,
            selfEmployed: !!this.applicationData.selfEmployed,
            yearsAtJob: this.applicationData.employedHowLong,
            zip: this.applicationData.employerZip
          },
          // expense: [],
          fax: this.applicationData.fax,
          firstName: this.applicationData.firstName,
          grossIncome: this.$parseCurrency(this.applicationData.grossIncome),
          homePhone: this.applicationData.homePhone,
          lastName: this.applicationData.lastName,
          mailingAddress: this.applicationData.mailingAddress,
          mailingZip: this.applicationData.mailingZip,
          maritalStatus: this.applicationData.maritalStatus.value,
          ssn: this.applicationData.ssn,
          status: 'Own',
          yearsAtAddress: this.applicationData.timeAtCurrentAddress,
          yearsLineOfWork: this.applicationData.yearsLineOfWork,
          yearsOfSchool: this.applicationData.yearsOfSchool,
          zip: this.applicationData.zip
        }
        if (this.applicationData.hoaDues) {
          primaryBorrower.expense = [{
            expenseType: 'Present',
            hoaDues: this.applicationData.hoaDues
          }]
        }
        applicationPayload.borrowers.push(primaryBorrower)
        if (applicationPayload.coBorrower) { // if COBORROWER
          const coBorrower = {
            address: this.applicationData.coBorrowerAddress,
            borrowerType: 'Coborrower',
            businessPhone: this.applicationData.coBorrowerBusinessPhone,
            cellPhone: this.applicationData.coBorrowerCellPhone,
            email: this.applicationData.coBorrowerEmail,
            employer: {
              address: this.applicationData.coBorrowerEmployerAddress,
              employerName: this.applicationData.coBorrowerEmployerName,
              jobTitle: this.applicationData.coBorrowerJobTitle,
              selfEmployed: !!this.applicationData.coBorrowerSelfEmployed,
              yearsAtJob: this.applicationData.coBorrowerEmployedHowLong,
              zip: this.applicationData.coBorrowerEmployerZip
            },
            // expense: [],
            fax: this.applicationData.coBorrowerFax,
            firstName: this.applicationData.coBorrowerFirstName,
            grossIncome: this.$parseCurrency(this.applicationData.coBorrowerGrossIncome),
            homePhone: this.applicationData.coBorrowerHomePhone,
            lastName: this.applicationData.coBorrowerLastName,
            maritalStatus: this.applicationData.coBorrowerMaritalStatus.value,
            ssn: this.applicationData.coBorrowerSsn,
            status: 'Own',
            yearsAtAddress: this.applicationData.coBorrowerTimeAtCurrentAddress,
            yearsLineOfWork: this.applicationData.coBorrowerYearsLineOfWork,
            yearsOfSchool: this.applicationData.coBorrowerYearsOfSchool,
            zip: this.applicationData.coBorrowerZip
          }
          if (this.applicationData.coBorrowerHoaDues) {
            coBorrower.expense = [{
              expenseType: 'Present',
              hoaDues: this.applicationData.coBorrowerHoaDues
            }]
          }
          applicationPayload.borrowers.push(coBorrower)
        }
        if (this.applicationData.realEstate_0_propertyType) {
          applicationPayload.realEstate.push({
            address: null,
            propertyStatus: null, // 'Sold',
            propertyType: this.applicationData.realEstate_0_propertyType,
            presentMarketValue: this.$parseCurrency(this.applicationData.realEstate_0_presentMarketValue),
            totalLeans: this.$parseCurrency(this.applicationData.realEstate_0_totalLiens),
            grossRentalIncome: this.$parseCurrency(this.applicationData.realEstate_0_grossRentalIncome),
            mortgagePayments: null,
            taxesAndInsurance: null,
            netRentalIncome: null,
            zip: null
          })
        }
        if (this.applicationData.realEstate_1_propertyType) {
          applicationPayload.realEstate.push({
            address: null,
            propertyStatus: null, // 'Sold',
            propertyType: this.applicationData.realEstate_1_propertyType,
            presentMarketValue: this.$parseCurrency(this.applicationData.realEstate_1_presentMarketValue),
            totalLeans: this.$parseCurrency(this.applicationData.realEstate_1_totalLiens),
            grossRentalIncome: this.$parseCurrency(this.applicationData.realEstate_1_grossRentalIncome),
            mortgagePayments: null,
            taxesAndInsurance: null,
            netRentalIncome: null,
            zip: null
          })
        }
        if (this.applicationData.realEstate_2_propertyType) {
          applicationPayload.realEstate.push({
            address: null,
            propertyStatus: null, // 'Sold',
            propertyType: this.applicationData.realEstate_2_propertyType,
            presentMarketValue: this.$parseCurrency(this.applicationData.realEstate_2_presentMarketValue),
            totalLeans: this.$parseCurrency(this.applicationData.realEstate_2_totalLiens),
            grossRentalIncome: this.$parseCurrency(this.applicationData.realEstate_2_grossRentalIncome),
            mortgagePayments: null,
            taxesAndInsurance: null,
            netRentalIncome: null,
            zip: null
          })
        }
        const data = await authenticate() // eslint-disable-line no-unused-vars
          .then((auth) => {
            return applicationCreate(auth, applicationPayload)
              .then((res) => {
                this.$emit('applicationSubmitSuccess', res)
                return res
              })
              .catch((err) => {
                this.$emit('applicationSubmitError')
                throw err
              })
          })
          .catch((err) => {
            this.$emit('applicationSubmitError')
            throw err
          })
        this.$store.commit('setApplicationResults', data)
      }
      this.$emit('applicationSubmitEnd')
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
  &__submit {
    @include media-breakpoint-down('sm') {
      font-size: $font-size-lg;
      margin-top: #{$spacer * 1.625};
      padding-bottom: #{$spacer * 0.6875};
      padding-top: #{$spacer * 0.6875};
      width: 100%;
    }
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
