<template>
  <div class="layout--default">
    <div
      :class="{ blur: loader }"
    >
      <Header />
      <div class="layout--default__banner" />
      <div class="wrapper wrapper--content layout--default__wrapper">
        <div class="container layout--default__container">
          <div class="row">
            <SidebarResults v-if="sidebar === 'results'" />
            <SidebarSearch v-else />
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
    <transition name="fade">
      <Loader v-if="loader" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BackToTop from '~/components/globals/BackToTop.vue'
import Footer from '~/components/footer/Footer.vue'
import Header from '~/components/header/Header.vue'
import Loader from '~/components/search/Loader.vue'
import SidebarResults from '~/components/sidebars/StaticSidebar.vue'
import SidebarSearch from '~/components/sidebars/SearchSidebar.vue'

export default {
  components: {
    BackToTop,
    Footer,
    Header,
    Loader,
    SidebarResults,
    SidebarSearch
  },
  data () {
    return {
      title: 'RateRabbit'
    }
  },
  computed: {
    ...mapState({
      loader: state => state.loader,
      sidebar: state => state.layout.sidebar
    })
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
