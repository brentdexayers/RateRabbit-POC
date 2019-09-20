<template>
  <article class="page-content">
    <p>
      Your One Fee Guarantee includes all of the following fees: origination, appraisal, lender fees, credit report, processing fee, underwriting fee
    </p>
    <SearchResults />
  </article>
</template>

<script>
import SearchResults from '~/components/SearchResults.vue'

export default {
  layout: 'default',
  components: {
    SearchResults
  },
  data () {
    return {
      title: 'Your One Fee, Real Time Guaranteed Rates'
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
