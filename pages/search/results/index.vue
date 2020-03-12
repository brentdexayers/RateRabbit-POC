<template>
  <div class="page-content">
    <!-- <Loader v-if="loading" /> -->
    <div class="search-results">
      <p>
        Your One Fee Guarantee includes all of the following fees: origination, appraisal, lender fees, credit report, processing fee, underwriting fee
      </p>
      <!-- <LoanProducts v-if="LoanProducts" /> -->
      <div style="max-width: 600px; white-space: pre; overflow: hidden;">
        <code>
          {{ loanProducts }}
        </code>
      </div>
    </div>
    <!-- <Details v-if="showDetails" /> -->
  </div>
</template>

<script>
export default {
  layout: 'default',
  components: {
    // Loader,
    // LoanProducts,
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
