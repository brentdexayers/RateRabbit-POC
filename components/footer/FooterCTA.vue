<template>
  <div class="site-footer__cta">
    <nuxt-link to="#" class="btn btn-sm btn-outline-primary">
      Request an Appointment
    </nuxt-link>
    <p>
      or Call <Phone />
    </p>
  </div>
</template>

<script>
import Phone from '~/components/Phone.vue'

export default {
  components: {
    Phone
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.site-footer__cta {
  color: #ffffff;
  text-align: center;
  @include media-breakpoint-down('xs') {
    margin: auto;
  }
  .btn {
    margin-bottom: 13px;
  }
  .phone {
    color: $white;
  }
}
</style>
