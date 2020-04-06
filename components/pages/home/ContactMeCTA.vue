<template>
  <section class="section--contact-cta">
    <div class="container section--contact-cta__container">
      <div class="row section--contact-cta__row">
        <div class="col-12 col-md-8">
          <h2 class="section--contact-cta__title">
            Have a Loan Officer Contact Me
          </h2>
          <p class="section--contact-cta__body">
            Rate Rabbit is committed to providing its customers with the lowest mortgage rates and the lowest closing fee, combining all applicable closing & lender costs into ONE low, guaranteed fee. Or choose our NO cost loan option.
          </p>
        </div>
        <div class="vertical-col-spacer" />
        <div class="col-auto text-center">
          <nuxt-link to="connect" class="btn btn-lg btn-primary section--contact-cta__button">
            Connect Today
          </nuxt-link>
          <p class="text-primary section--contact-cta__phone">
            or Call <PhoneLink />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PhoneLink from '~/components/globals/PhoneLink.vue'

export default {
  components: {
    PhoneLink
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.section--contact-cta {
  background-color: $white;
  padding-bottom: #{$spacer * 10.25}; // 164px;
  padding-top: #{$spacer * 9.375}; // 150px;
  @include media-breakpoint-down('sm') {
    padding-bottom: #{$spacer * 8}; // 128px;
    padding-top: #{$spacer * 8}; // 128px;
  }
  &__row {
    align-items: center;
    justify-content: space-between;
  }
  &__button {
    margin-bottom: #{$spacer * 1.25};
  }
  &__phone {
    margin-bottom: 0;
  }
}
</style>
