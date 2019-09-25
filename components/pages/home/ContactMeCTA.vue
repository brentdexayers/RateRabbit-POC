<template>
  <section class="section--contact-cta">
    <div class="container section--contact-cta__container">
      <div class="row section--contact-cta__row">
        <div class="col-12 col-md-8">
          <h2 class="section--contact-cta__title">
            Have a Loan Officer Contact Me
          </h2>
          <p class="section--contact-cta__body">
            Rate Rabbit is committed to providing its customers with the best mortgage rates and the lowest closing fee, combining all applicable closing & lender costs into one low, guaranteed fee.
          </p>
        </div>
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

.section--contact-cta {
  background-color: $white;
  padding-bottom: 164px;
  padding-top: 150px;
  &__row {
    align-items: center;
    justify-content: space-between;
  }
  &__button {
    margin-bottom: #{$spacer * 1.25};
  }
}
</style>
