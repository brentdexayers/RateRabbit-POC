<template>
  <div class="page-content">
    <div class="search-results">
      <div v-if="Object.keys(searchResults).length">
        <p class="small">
          Your One Fee Guarantee includes all of the following fees: origination, appraisal, lender fees, credit report, processing fee, underwriting fee
        </p>
        <LoanProducts
          @showDetails="showDetails"
          @apply="apply"
        />
      </div>
      <div v-else>
        <p>
          Your search has not returned any results. Please update your search and try again.
        </p>
        <button
          @click="startNewSearch"
          class="btn btn-primary"
        >
          {{ 'Try a New Search' | titlecase }}
        </button>
      </div>
    </div>
    <Details
      v-if="detailedLoanProduct"
      :loanProduct="detailedLoanProduct"
      @hideDetails="hideDetails"
      @apply="apply"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Details from '~/components/search/Details.vue'
import LoanProducts from '~/components/search/LoanProducts.vue'

export default {
  layout: 'default',
  components: {
    LoanProducts,
    Details
  },
  data () {
    return {
      detailedLoanProduct: null,
      title: 'Your One Fee, Real Time Guaranteed Rates'
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      searchResults: state => state.searchResultsReduced
    })
  },
  methods: {
    apply () {
      this.$store.commit('setLayoutSidebar', 'results')
      this.$router.push({
        path: '/apply/'
      })
    },
    hideDetails () {
      this.detailedLoanProduct = null
    },
    scrollToTop () {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
      document.body.focus()
    },
    showDetails (payload) {
      this.detailedLoanProduct = payload
    },
    startNewSearch () {
      this.$emit('startNewSearch')
      this.updateSidebar('default')
      this.$router.push({
        path: '/search'
      })
      this.scrollToTop()
    },
    updateSidebar (payload) {
      this.$store.commit('setLayoutSidebar', payload)
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
