<template>
  <div class="page-content">
    <Loader v-if="loading" />
    <div class="search-results">
      <p>
        Your One Fee Guarantee includes all of the following fees: origination, appraisal, lender fees, credit report, processing fee, underwriting fee
      </p>
      <LoanProducts v-if="LoanProducts" />
    </div>
    <Details v-if="showDetails" />
  </div>
</template>

<script>
import Loader from '~/components/search/Loader.vue'
import LoanProducts from '~/components/search/LoanProductsLoop.vue'
import Details from '~/components/search/Details.vue'

export default {
  layout: 'default',
  components: {
    Loader,
    LoanProducts,
    Details
  },
  data () {
    return {
      title: 'Your One Fee, Real Time Guaranteed Rates'
    }
  },
  watchQuery: ['fetchResults'],
  middleware ({ store, redirect }) {
    // if the search form has not been completed appropriately
    if (
      store.state.searchform.errors.length > 0 || // we have form errors
      store.state.searchform.datetimes.length <= 0 // the search form has never been submitted
    ) {
      return redirect('/search')
    }
  },
  computed: {
    LoanProducts () {
      return this.$store.state.searchresults.loanProducts
    },
    loading () {
      return this.$store.state.searchresults.loading
    },
    showDetails () {
      return this.$store.state.searchresults.showDetails
    },
    termIndex () {
      return this.$store.state.application.termIndex
    },
    rateIndex () {
      return this.$store.state.application.rateIndex
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('searchresults/GET_LOAN_PRODUCTS')
  },
  methods: {
    validateRoute () {
      let route = true
      if (this.results.length > 0) {
        route = '/search'
      }
      return route
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Live rates search results' }
      ]
    }
  }
}
</script>

<style>
</style>
