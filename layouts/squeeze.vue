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

.wrapper--squeeze {
  background-color: $light;
  display: flex;
  flex-direction: row;
  .page-content {
    padding-top: 67px;
  }
}
</style>
