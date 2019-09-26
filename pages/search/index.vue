<template>
  <div class="page-content page--search">
    <div>
      <h1 class="title">
        <strong>Search Live Rates</strong>
        <br class="d-block d-md-none">
        and Lock Your Rate In
      </h1>
      <Form cta="Search Live Rates" />
    </div>
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
      title: 'Search Rates'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Search Rates' }
      ]
    }
  }

}
</script>

<style lang="scss">
@import '~bootstrap/scss/functions.scss';
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';
@import '~bootstrap/scss/grid.scss';

.page--search {
  margin: 0 auto;
  max-width: #{$spacer * 26.25}; // ~420px
  padding-bottom: #{$spacer * 10};
  .title {
    color: $gray-600;
    font-size: $font-size-base;
    font-weight: $font-weight-normal;
    line-height: 1.428571428571429;
    margin-bottom: 22px;
  }
  .form--search-rates {
    &__ltv {
      margin-top: 0;
    }
    &__spacer {
      margin-bottom: 38px;
    }
    &__col {
      &--county,
      &--interest,
      &--state,
      &--taxes {
        @extend .col-lg-6 !optional;
      }
      &--submit {
        margin-top: 35px;
      }
    }
  }
}
</style>
