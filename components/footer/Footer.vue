<template>
  <div>
    <section
      v-if="$nuxt.$route.name === 'search-results'"
      class="connect-footer"
    >
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-7">
            <h2>Have a Loan Officer Contact Me</h2>
            <p>Rate Rabbit is committed to providing its customers with the best mortgage rates and the lowest closing fee, combining all applicable closing &amp; lender costs into one low, guaranteed fee.</p>
          </div>
          <div class="col-auto text-center">
            <p class="connect-buttons">
              <a href="/connect" class="btn btn-primary text-white mb-4 py-2">Connect Today</a>
              <br>
              <span class="text-primary">or Call <a href="tel:+18883950395">(888) 395-0395</a></span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="site-footer">
      <div class="container">
        <FooterMenus />
        <Colophon />
      </div>
    </section>
  </div>
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

.connect-footer {
  background-color: $white;
  padding-bottom: 5rem;
  padding-top: 5rem;
  .connect-buttons a {
    text-decoration: none;
  }
}
.site-footer {
  background-color: $dark;
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
