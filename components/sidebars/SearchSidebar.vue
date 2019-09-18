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

.sidebar--search-form {
  display: inline-flex;
  flex: 1 0 33.333333%;
  flex: 1 0 353px;
  flex-basis: 353px;
  flex-direction: column;
  margin-top: -106px;
  form {
    background-color: $white;
    border: 1px solid #DEDEDE;
    width: 100%;
    padding: 15px 22px 40px;
    .form-group {
      margin-bottom: 0;
    }
    label {
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      &.custom-control-label {
        font-weight: normal;
      }
    }
    input:not([type="submit"]), select {
      border-radius: 0;
      border-bottom: 1px solid #{$gray-500};
      border-left: none;
      border-right: none;
      border-top: none;
    }
    input[type="submit"] {
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
}
</style>
