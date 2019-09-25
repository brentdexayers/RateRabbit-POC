<template>
  <div class="layout--squeeze">
    <Header />
    <div class="wrapper wrapper--squeeze layout--squeeze__wrapper">
      <div class="container-fluid layout--squeeze__container">
        <div class="row">
          <Sidebar class="col-0 col-md-6 col-lg-5" />
          <div class="col">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/header/Header.vue'
import Sidebar from '~/components/sidebars/SqueezeSidebar.vue'
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
    .page-content {
      padding-top: #{$spacer * 4.125};
    }
  }
}
</style>
