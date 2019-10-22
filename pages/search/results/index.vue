<template>
  <div class="page-content">
    <Loader v-if="!results" />
    <Results v-if="results" />
    <Details v-if="showDetails" />
  </div>
</template>

<script>
import Loader from '~/components/search/Loader.vue'
import Results from '~/components/search/Results.vue'
import Details from '~/components/search/Details.vue'

export default {
  layout: 'default',
  components: {
    Loader,
    Results,
    Details
  },
  data () {
    return {
      title: 'Your One Fee, Real Time Guaranteed Rates'
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.validateRoute()
    })
  },

  computed: {
    results () {
      return this.$store.state.searchresults.results
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
    await store.dispatch('searchresults/GET_RESULTS')
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
