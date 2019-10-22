<template>
  <div class="page-content page--apply">
    <h3>
      {{ results[termIndex].term }}
    </h3>
    <table class="table table-striped page--apply__table">
      <tbody>
        <tr>
          <td>
            {{ 'One Free Guarantee' | titlecase }}
          </td>
          <td>
            {{ results[termIndex].rates[rateIndex].oneFeeGuarantee | currency }}
          </td>
        </tr>
        <tr>
          <td>
            {{ 'Loan Amount' | titlecase }}
          </td>
          <td>
            {{ input.fields.loanAmount.value }}
          </td>
        </tr>
        <tr>
          <td>
            {{ 'Interest Rate' | titlecase }}
          </td>
          <td>
            {{ results[termIndex].rates[rateIndex].rate | percent }}
          </td>
        </tr>
        <tr>
          <td>
            {{ 'APR' | capitalize }}
          </td>
          <td>
            {{ results[termIndex].rates[rateIndex].apr | percent }}
          </td>
        </tr>
        <tr>
          <td>
            {{ 'Monthly Payment' | titlecase }}
          </td>
          <td>
            {{ results[termIndex].rates[rateIndex].monthlyPayment | currency }}
          </td>
        </tr>
      </tbody>
    </table>
    <Form />
  </div>
</template>

<script>
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
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.validateRoute()
      console.log(vm.validateRoute())
      return true
    })
  },
  computed: {
    input () {
      return this.$store.state.searchform
    },
    results () {
      return this.$store.state.searchresults.results[0]
    },
    termIndex () {
      return this.$store.state.application.termIndex
    },
    rateIndex () {
      return this.$store.state.application.rateIndex
    }
  },
  methods: {
    validateRoute () {
      let route = true
      if (this.input.errors.length > 0 || this.results.length === 0) {
        route = '/search'
      } else if (this.results.length > 0 && (!this.termIndex || !this.rateIndex)) {
        route = '/search/results'
      }
      return route
    }
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
