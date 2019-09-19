<template>
  <article class="page-content article--search">
    <div>
      <h1 class="title">
        <strong>Search Live Rates</strong> and Lock Your Rate In
      </h1>
      <Form cta="Search Live Rates" />
    </div>
  </article>
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

.article--search {
  margin: 0 auto;
  padding-bottom: 326px;

  .title {
    color: $gray-600;
    font-size: 21px;
    font-weight: $font-weight-normal;
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
