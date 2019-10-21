<template>
  <div class="page-content page--apply">
    <p class="page--apply__intro">
      Please take a moment to provide the information below and a Loan Consultant will contact you to help you get your best rate quote. <i>Required fields *</i>
    </p>
    <code>
      {{ termIndex }}
      {{ rateIndex }}
      {{ results[termIndex].rates[rateIndex] }}
    </code>
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
  computed: {
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

.page--apply {
  margin: auto;
  max-width: #{$spacer * 26.25};
  padding-bottom: #{$spacer * 10};
  &__intro {
    margin-bottom: 55px;
  }
}
</style>
