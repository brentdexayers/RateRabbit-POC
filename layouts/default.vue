<template>
  <div class="layout--default">
    <Header />
    <div class="wrapper wrapper--banner layout--default__wrapper layout--default__wrapper--banner">
      <div class="container layout--default__container">
        <h1 class="page-title">
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="wrapper wrapper--content layout--default__wrapper layout--default__wrapper--content">
      <div class="container layout--default__container">
        <Sidebar />
        <div class="container container--page-content layout--default__container__container">
          <nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Sidebar from '~/components/sidebars/SearchSidebar.vue'
import Footer from '~/components/footer/Footer.vue'

export default {
  components: {
    Header,
    Sidebar,
    Footer
  },
  data () {
    return {
      title: 'RateRabbit'
    }
  },
  head () {
    const self = this
    if (process.browser) {
      this.title = document.title
    }
    return {
      changed ({ title }) {
        self.title = title
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

.layout--default {
  &__wrapper--banner {
    align-items: center;
    background: linear-gradient(74.78deg, $green 0%, $light-green 100%);
    display: flex;
    min-height: 110px;
    padding-bottom: 27px;
    padding-top: 27px;
    .page-title {
      color: $white;
      font-size: 30px;
      font-weight: bold;
      line-height: 56px;
      margin-bottom: 0;
      margin-left: 33.333333%;
      margin-left: calc(33.333333% + #{$grid-gutter-width});
      margin-left: calc(353px + #{$grid-gutter-width});
    }
  }
  &__wrapper--content {
    background-color: $light;
    padding-bottom: 132px;
    padding-top: 40px;
    > .container {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
