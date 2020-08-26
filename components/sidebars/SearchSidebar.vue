<template>
  <aside
    class="sidebar col-0 col-md-5 col-lg-4 sidebar--search-form"
  >
    <Form
      :sidebar="true"
      :hideExtraFields="true"
      :invertedSubmit="true"
    />
  </aside>
</template>

<script>
import Form from '~/components/forms/SearchForm.vue'

export default {
  components: {
    Form
  },
  data () {
    return {}
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
