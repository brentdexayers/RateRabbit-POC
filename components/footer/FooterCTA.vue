<template>
  <div class="site-footer__cta">
    <nuxt-link to="#" class="btn btn-sm btn-outline-primary">
      Request an Appointment
    </nuxt-link>
    <p>
      or Call <PhoneLink class="site-footer__cta__phone" />
    </p>
  </div>
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

.site-footer__cta {
  color: $white;
  text-align: center;
  @include media-breakpoint-down('xs') {
    margin: auto;
  }
  .btn {
    margin-bottom: 13px;
  }
  &__phone {
    color: $white;
  }
}
</style>
