<template>
  <section id="site-footer">
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
#site-footer {
  background: #2D3033;
  color: #ffffff;
  padding-bottom: 276px;
  padding-top: 120px;
}
</style>
