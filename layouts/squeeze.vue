<template>
  <div class="layout--squeeze">
    <div :class="{ blur: loader }">
      <Header />
      <div class="wrapper wrapper--squeeze layout--squeeze__wrapper">
        <div class="container-fluid layout--squeeze__container">
          <div class="row">
            <Sidebar />
            <div class="col">
              <nuxt />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    <transition name="fade">
      <Loader v-if="loader" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Footer from '~/components/footer/Footer.vue'
import Header from '~/components/header/Header.vue'
import Loader from '~/components/search/Loader.vue'
import Sidebar from '~/components/sidebars/SqueezeSidebar.vue'

export default {
  components: {
    Footer,
    Header,
    Loader,
    Sidebar
  },
  computed: {
    ...mapState({
      loader: state => state.loader,
      sidebar: state => state.layout.sidebar
    })
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
