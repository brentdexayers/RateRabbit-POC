<template>
  <div class="page-content page--apply">
    <div>
      <h3>
        {{ loanProduct.amortizationTerm }}-Year {{ loanProduct.amortizationType }}
      </h3>
      <table class="table table-striped page--apply__table">
        <tbody>
          <tr>
            <td>
              {{ 'One Free Guarantee' | titlecase }}
            </td>
            <td>
              {{ loanProduct.fee | currency }}
            </td>
          </tr>
          <tr>
            <td>
              {{ 'Loan Amount' | titlecase }}
            </td>
            <td>
              {{ this.$parseCurrency(applicationData.loanAmount) | currency }}
            </td>
          </tr>
          <tr v-if="applicationData.cashAmount">
            <td>
              {{ 'Cash Amount' | titlecase }}
            </td>
            <td>
              {{ applicationData.cashAmount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ 'Interest Rate' | titlecase }}
            </td>
            <td>
              {{ loanProduct.rate / 100 | percent }}
            </td>
          </tr>
          <tr>
            <td>
              {{ 'APR' | capitalize }}
            </td>
            <td>
              {{ loanProduct.apr / 100 | percent }}
            </td>
          </tr>
          <tr>
            <td>
              {{ 'Monthly Payment' | titlecase }}
            </td>
            <td>
              {{ loanProduct.totalPayment | currency }}
            </td>
          </tr>
        </tbody>
      </table>
      <Form />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Form from '~/components/forms/ApplicationForm.vue'

export default {
  layout: 'default',
  components: {
    Form
  },
  data () {
    return {
      title: 'Apply For a Loan'
    }
  },
  computed: {
    ...mapState({
      loanProduct: state => state.application.loanProduct,
      applicationData: state => state.application.data
    })
  },
  methods: {
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Apply for a loan' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.page--apply {
  margin: 0 auto;
  padding-bottom: #{$spacer * 10};
  &__table {
    margin-bottom: #{$spacer * 5};
    td + td {
      text-align: right;
    }
  }
  .form--apply {
    &--submit {
      margin-top: 35px;
    }
    input, select {
      height: $input-height-lg;
      padding-top: $spacer;
      transition: $transition-base;
    }
    label {
      &:not(.custom-control-label) {
        color: $gray-600;
        font-size: $input-font-size;
        margin-bottom: 0;
        margin-left: calc(#{$input-padding-x} + #{$input-border-width});
        // margin-top: -0.75em;
        pointer-events: none;
        position: absolute;
        top: 1em;
        transition: $transition-base;
      }
      img {
        pointer-events: initial;
      }
      &.focused,
      &.hasvalue {
        color: $primary;
        font-size: #{$font-size-sm * 0.8125};
        top: 0.25em;
        + input,
        + select {
          padding-top: $spacer;
        }
      }
      &.custom-control-label {
        color: $body-color;
        margin-left: 0;
        pointer-events: inherit;
        position: relative;
      }
    }
  }
}
</style>
