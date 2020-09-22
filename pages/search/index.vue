<template>
  <div class="page-content page--search">
    <div v-if="show.search">
      <h1 class="title">
        <strong>Search live rates,</strong>
        <br class="d-block d-md-none">
        no personal information needed
      </h1>
      <Form />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Form from '~/components/forms/SearchForm.vue'

export default {
  layout: 'squeeze',
  components: {
    Form
  },
  data () {
    return {
      title: 'Search Rates',
      show: {
        search: true,
        results: false,
        details: false
      }
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      searchResults: state => state.searchResultsReduced
    })
  },
  head () {
    return {
      title: this.title,
      titleTemplate: '%s',
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
  max-width: #{$spacer * 28}; // ~448px
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
      &--interest,
      &--state,
      &--taxes,
      &--zip {
        @extend .col-lg-6 !optional;
      }
      &--submit {
        margin-top: 35px;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
