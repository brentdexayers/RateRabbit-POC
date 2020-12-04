<template>
  <div class="page-content page--apply">
    <div v-if="!applicationSubmitted">
      <div v-if="!Object.keys(loanProduct).length">
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
      <div v-else>
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
        <LeadForm
          v-if="show.leadForm.form"
          @leadCreateStart="handleLeadStart"
          @leadCreateSuccess="handleLeadSuccess"
          @leadCreateError="handleLeadError"
          @leadCreateEnd="handleLeadEnd"
          v-bind:loader="show.leadForm.loader"
          submit-text="Begin Application"
        />
        <ApplicationForm
          v-if="show.applicationForm.form"
          @applicationSubmitStart="handleApplicationStart"
          @applicationSubmitSuccess="handleApplicationSuccess"
          @applicationSubmitEnd="handleApplicationEnd"
          @applicationSubmitError="handleApplicationError"
        />
      </div>
    </div>

    <div v-if="applicationSubmitted">
      <h3>Your application was submitted successfully.</h3>
      <p>We have received your application and appreciate you trusting Rate Rabbit Home Loans. One of our loan consultants will be contacting you shortly. If you should have any questions, please feel free to call us at <a tel="+1-888-395-0395">(888) 395-0395</a>.</p>
      <p>***Please note, due to Covid-19 and the unprecedented low rates, it may take a bit longer to contact you. We appreciate your patience and look forward to working with you***</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import LeadForm from '~/components/forms/LeadForm.vue'
import ApplicationForm from '~/components/forms/ApplicationForm.vue'

export default {
  layout: 'default',
  components: {
    ApplicationForm,
    LeadForm
  },
  data () {
    return {
      // title: 'Apply For a Loan',
      applicationError: false,
      show: {
        applicationForm: {
          error: false,
          form: false,
          loader: false
        },
        leadForm: {
          error: false,
          form: false,
          loader: false
        }
      }
    }
  },
  computed: {
    ...mapState({
      applicationData: state => state.application.data,
      leadData: state => state.lead,
      loanProduct: state => state.application.loanProduct,
      searchResults: state => state.searchResultsReduced
    }),
    applicationSubmitted: {
      get () {
        return this.$store.state.application.submitted
      },
      set (value) {
        this.$store.commit('setApplicationSubmitted', value)
      }
    },
    title () {
      return this.applicationSubmitted ? 'Thank You!' : 'Apply For a Loan'
    }
  },
  mounted () {
    if (!this.leadData || (typeof this.leadData === 'object' && !Object.keys(this.leadData).length)) {
      this.showLeadForm()
    } else if (!this.applicationSubmitted) {
      this.showApplicationForm()
    }
  },
  methods: {
    // FORM HANDLERS
    handleLeadStart () {
      this.showLeadLoader()
    },
    handleLeadSuccess () {
      this.hideLeadForm()
      this.showApplicationForm()
    },
    handleLeadError () {
      // [TO DO] show an error of some sort?
    },
    handleLeadEnd () {
      this.hideLeadLoader()
      window.scrollTo(0, 0)
      document.body.focus()
    },
    handleApplicationStart () {
      this.showApplicationLoader()
    },
    handleApplicationEnd () {
      this.hideApplicationLoader()
    },
    handleApplicationSuccess (result) {
      // console.log('Application Submit Success\n', result)
      this.applicationSubmitted = true
      this.show.applicationForm.error = false
      window.scrollTo(0, 0)
      document.body.focus()
    },
    handleApplicationError () {
      // this.applicationSubmitted = true
      this.show.applicationForm.error = true
    },
    // FORM HELPERS
    hideLeadForm () {
      this.show.leadForm.form = false
    },
    hideLeadLoader () {
      this.show.leadForm.loader = false
    },
    showLeadForm () {
      this.hideLeadLoader()
      this.show.leadForm.form = true
    },
    showLeadLoader () {
      this.show.leadForm.loader = true
    },
    hideApplicationForm () {
      this.show.applicationForm.form = false
    },
    hideApplicationLoader () {
      this.show.applicationForm.loader = false
    },
    showApplicationForm () {
      this.hideApplicationLoader()
      this.show.applicationForm.form = true
    },
    showApplicationLoader () {
      this.show.applicationForm.loader = true
    },
    // PAGE HELPERS
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
