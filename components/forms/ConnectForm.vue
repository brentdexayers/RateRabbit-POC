<template>
  <form class="form form-lg form--connect">
    <p class="form--connect__header">
      Your Information
    </p>
    <div class="row">
      <div class="form-group col-12 col-md-6">
        <input
          type="text"
          class="form-control form-control-lg"
          name="firstName"
          placeholder="First Name"
        >
      </div>
      <div class="form-group col-12 col-md-6">
        <input
          type="text"
          class="form-control form-control-lg"
          name="lastName"
          placeholder="Last Name"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12 col-md-6">
        <input
          type="text"
          class="form-control form-control-lg"
          name="phone"
          placeholder="Primary Phone Number"
        >
      </div>
      <div class="form-group col-12 col-md-6">
        <input
          type="text"
          class="form-control form-control-lg"
          name="email"
          placeholder="Email Address"
        >
      </div>
    </div>
    <div class="form-group w-100 form-connect__spacer" />
    <div class="row">
      <div class="form-group col-12 col-md-6">
        <select
          type="text"
          class="form-control form-control-lg custom-select custom-select-lg"
          name="loanPurpose"
          placeholder="Loan Purpose"
        >
          <option value="Option1">
            Option 1
          </option>
        </select>
      </div>
      <div class="form-group col-12 col-md-6">
        <input
          v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
          type="text"
          class="form-control form-control-lg"
          name="estimatedHomeValue"
          placeholder="Estimated Home Value/Purchase Amt"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12 col-md-6">
        <input
          v-currency="{currency: 'USD', locale: 'en', distractionFree: false}"
          type="text"
          class="form-control form-control-lg"
          name="desiredLoan"
          placeholder="Desired Loan Amount"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <button
          type="submit"
          name="submit"
          class="btn btn-sm btn-primary form--connect__submit"
        >
          Submit
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-5">
        <p class="form--connect__footer">
          Your information is private, and will be submitted over secure connections.
        </p>
      </div>
    </div>
  </form>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.form--connect {
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
}
</style>
