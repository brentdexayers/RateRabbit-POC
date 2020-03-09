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
      }
    }
    input, select {
      height: $input-height-lg;
      padding-top: $spacer;
      transition: $transition-base;
      // &#promotioncode {
      //   padding-top: $input-padding-y;
      // }
    }
    label {
      &:not(.custom-control-label) {
        color: $gray-600;
        font-size: $input-font-size;
        margin-bottom: 0;
        margin-left: calc(#{$input-padding-x} + #{$input-border-width});
        // margin-top: -0.75em;
        pointer-events: none;
        position: absolute;
        top: 1em;
        transition: $transition-base;
      }
      img {
        pointer-events: initial;
      }
      &.focused,
      &.hasvalue {
        color: $primary;
        font-size: #{$font-size-sm * 0.8125};
        top: 0.25em;
        + input,
        + select {
          padding-top: $spacer;
        }
      }
      &.form--search-rates__form-group--program-options__label,
      &.custom-control-label {
        color: $body-color;
        margin-left: 0;
        pointer-events: inherit;
        position: relative;
      }
      &.form--search-rates__form-group--program-options__label {
        margin-bottom: #{$spacer * 2};
      }
    }
  }
}
</style>
