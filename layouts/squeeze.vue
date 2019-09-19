<template>
  <div class="layout--squeeze">
    <Header />
    <div class="wrapper wrapper--squeeze layout--squeeze__wrapper">
      <Sidebar />
      <div class="container container--page-content layout--squeeze__container">
        <nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Sidebar from '~/components/sidebars/Squeeze.vue'
import Footer from '~/components/footer/Footer.vue'

export default {
  components: {
    Header,
    Sidebar,
    Footer
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.layout--squeeze {
  &__wrapper {
    background-color: $light;
    display: flex;
    flex-direction: row;
    .page-content {
      padding-top: 67px;
    }
    @include media-breakpoint-down('sm') {
      flex-direction: column;
    }
  }
  &__container {
    // margin-right: $grid-gutter-width;
    max-width: calc(420px + #{$grid-gutter-width * 2}) !important;
    // @include media-breakpoint-down('md') {
    //   margin-right: auto;
    // }
  }
}
</style>
