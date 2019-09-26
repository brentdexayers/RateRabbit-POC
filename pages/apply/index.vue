<template>
  <div class="page-content page--apply">
    <p class="page--apply__intro">
      Please take a moment to provide the information below and a Loan Consultant will contact you to help you get your best rate quote. <i>Required fields *</i>
    </p>
    <Form />
  </div>
</template>

<script>
import Form from '~/components/forms/SearchForm.vue'

export default {
  layout: 'squeeze',
  components: {
    Form
  },
  data () {
    return {
      title: 'Apply For a Loan'
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
