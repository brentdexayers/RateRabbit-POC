<template>
  <div class="page-content page--apply">
    <div v-if="!applicationSubmitted">
      <div v-if="Object.keys(searchResults).length > 0">
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
        </div>
        <Form
          @applicationSubmitStart="handleSubmitStart"
          @applicationSubmitSuccess="handleSubmitSuccess"
          @applicationSubmitEnd="handleSubmitEnd"
        />
      </div>
      <div v-else>
        <p>
          Please begin by searching Loan Products.
        </p>
        <button
          @click="startNewSearch"
          class="btn btn-primary"
        >
          {{ 'Search Live Rates' | titlecase }}
        </button>
      </div>
    </div>
    <div v-else>
      <h3>Thank you! Your application was submitted successfully.</h3>
      <p>We have received your application and appreciate you trusting Rate Rabbit Home Loans. One of our loan consultants will be contacting you shortly. If you should have any questions, please feel free to call us at <a tel="+1-888-395-0395">(888) 395-0395</a>.</p>
      <p>***Please note, due to Covid-19 and the unprecedented low rates, it may take a bit longer to contact you. We appreciate your patience and look forward to working with you***</p>
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
      title: 'Apply For a Loan',
      applicationSubmitted: false,
      applicationError: false
    }
  },
  computed: {
    ...mapState({
      applicationData: state => state.application.data,
      loanProduct: state => state.application.loanProduct,
      searchResults: state => state.searchResultsReduced
    })
  },
  methods: {
    handleSubmitStart () {
      // console.log('TODO: Application Submit Start')
    },
    handleSubmitEnd () {
      // console.log('TODO: Application Submit End')
    },
    handleSubmitSuccess (result) {
      // console.log('Application Submit Success\n', result)
      this.applicationSubmitted = true
      this.applicationError = false
      window.scrollTo(0, 0)
      document.body.focus()
    },
    handleSubmitError () {
      this.applicationSubmitted = true
      this.applicationError = true
    },
    scrollToTop () {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
      document.body.focus()
    },
    startNewSearch () {
      this.$emit('startNewSearch')
      // this.updateSidebar('default')
      this.$router.push({
        path: '/search'
      })
      this.scrollToTop()
    }
  },
  head () {
    return {
      title: this.title,
      titleTemplate: '%s',
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
  }
}
</style>
