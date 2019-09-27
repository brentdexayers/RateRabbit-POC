<template>
  <aside class="sidebar sidebar--search-form">
    <Form />
  </aside>
</template>

<script>
import Form from '~/components/forms/SearchForm.vue'

export default {
  components: {
    Form
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.sidebar--search-form {
  display: inline-flex;
  flex: 1 0 33.333333%;
  flex: 1 0 #{$spacer * 24.375};
  flex-basis: #{$spacer * 24.375};
  flex-direction: column;
  margin-bottom: 2.5625rem;
  max-width: #{$spacer * 24.375};
  padding-top: #{$spacer * 2.5};
  form {
    background-color: $white;
    border: 1px solid #DEDEDE;
    width: 100%;
    padding: 15px 22px 40px;
    .form-group {
      margin-bottom: 0;
    }
    label,
    .label {
      bottom: -0.5em;
      color: $primary;
      font-size: #{$font-size-sm * 0.8125};
      font-weight: $font-weight-normal;
      margin-left: $input-padding-x;
      margin-bottom: 0;
      position: relative;
      &.form--search-rates__form-group--program-options__label,
      &.label-list {
        bottom: inherit;
        color: $body-color;
        font-size: $font-size-sm;
        font-weight: $font-weight-bold;
        line-height: 1.75;
        margin-left: 0;
      }
      &.custom-control-label {
        bottom: inherit;
        color: $body-color;
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        line-height: 1.75;
        margin-left: 0;
      }
    }
    input,
    select,
    textarea {
      border-radius: 0;
      border-bottom: 1px solid #{$gray-500};
      border-left: none;
      border-right: none;
      border-top: none;
      font-weight: $font-weight-semibold;
    }
    [type="submit"] {
      margin-bottom: 30px;
      margin-top: 40px;
      width: 100%;
    }
    option[disabled][hidden] {
      display: none;
    }
    .form--search-rates__spacer {
      margin-bottom: 30px;
    }
  }
  @include media-breakpoint-down('sm') {
    display: none;
  }
  .form--search-rates{
    &__ltv {
      margin-top: $spacer;
    }
  }
}
</style>
