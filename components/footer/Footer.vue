<template>
  <section class="site-footer">
    <div class="container">
      <FooterMenus />
      <Colophon />
    </div>
  </section>
</template>

<script>
import FooterMenus from '~/components/footer/FooterMenus.vue'
import Colophon from '~/components/footer/Colophon.vue'

export default {
  components: {
    FooterMenus,
    Colophon
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.site-footer {
  background: $dark;
  color: $white;
  padding-bottom: 276px;
  padding-top: 120px;
  @include media-breakpoint-down('sm') {
    padding-top: #{$spacer * 4};
  }
  hr {
    color: transparent;
    height: 0;
    width: 100%;
    border-top: 1px solid rgba($white, 0.20);
    margin-bottom: 36px;
  }
}
</style>
