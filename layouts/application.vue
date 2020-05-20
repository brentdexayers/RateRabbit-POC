<template>
  <div class="layout--default">
    <Header />
    <div class="layout--default__banner" />
    <div class="wrapper wrapper--content layout--default__wrapper">
      <div class="container layout--default__container">
        <div class="row">
          <div class="col-auto layout--default__aside">
            <Sidebar />
          </div>
          <div class="col layout--default__content">
            <div class="layout--default__content__title">
              <h1 class="page-title">
                {{ title }}
              </h1>
            </div>
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import Header from '~/components/header/Header.vue'
import Sidebar from '~/components/sidebars/SearchSidebar.vue'
import Footer from '~/components/footer/Footer.vue'
import BackToTop from '~/components/globals/BackToTop.vue'

export default {
  components: {
    Header,
    Sidebar,
    Footer,
    BackToTop
  },
  data () {
    return {
      title: 'RateRabbit'
    }
  },
  async fetch ({ store, params }) {
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
@import '~bootstrap/scss/mixins.scss';

.layout--default {
  background-color: $light;
  &__banner {
    align-items: center;
    background: linear-gradient(74.78deg, $green 0%, $light-green 100%);
    height: #{$spacer * 6.875};
    position: absolute;
    width: 100%;
    @include media-breakpoint-down('sm') {
      height: 6px;
      position: fixed;
      z-index: 1;
    }
  }
  &__wrapper {
    background-color: transparent;
    padding-bottom: 132px;
    // padding-top: 40px;
    position: relative;
    // z-index: 1001;
  }
  &__container {
    display: flex;
    flex-direction: row;
    @include media-breakpoint-down('sm') {
      flex-direction: column;
    }
  }
  &__content__title {
    align-items: center;
    display: flex;
    font-weight: bold;
    height: #{$spacer * 6.875};
    margin-bottom: #{$spacer * 2};
    @include media-breakpoint-down('sm') {
      height: auto;
      margin-bottom: 0;
      padding-top: #{$spacer * 2.75};
    }
    .page-title {
      color: $white;
      line-height: #{$line-height-base * 0.8666666666666667};
      margin-bottom: 0;
      @include media-breakpoint-down('sm') {
        color: $primary;
        margin-bottom: 2em;
      }
    }
  }
  &__aside {
    @include media-breakpoint-down('sm') {
      display: none;
    }
  }
}
</style>
