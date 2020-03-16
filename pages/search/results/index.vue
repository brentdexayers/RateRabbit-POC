<template>
  <div class="page-content">
    <!-- <Loader v-if="loading" /> -->
    <div class="search-results">
      <p>
        Your One Fee Guarantee includes all of the following fees: origination, appraisal, lender fees, credit report, processing fee, underwriting fee
      </p>
      <LoanProducts v-if="loanProducts" />
    </div>
    <!-- <Details  /> -->
  </div>
</template>

<script>
// import Details from '~/components/search/Details.vue'
import LoanProducts from '~/components/search/LoanProducts.vue'

export default {
  layout: 'default',
  components: {
    // Loader,
    LoanProducts
    // Details
  },
  data () {
    return {
      title: 'Your One Fee, Real Time Guaranteed Rates'
    }
  },
  computed: {
    auth () {
      return this.$store.state.auth
    },
    loanProducts () {
      return this.$store.state.loanProducts
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('AUTHENTICATE')
    await store.dispatch('LOAN_SEARCH')
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
