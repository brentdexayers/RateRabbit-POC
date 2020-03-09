<template>
  <div
    :class="classes"
    class="site-footer__cta"
  >
    <hr>
    <nuxt-link to="/connect" class="btn btn-sm btn-outline-primary">
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
  },
  props: {
    classes: {
      type: String,
      default: ''
    }
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
  hr {
    display: none;
    @include media-breakpoint-down('sm') {
      display: block;
      margin-bottom: #{$spacer * 4.875} !important;
    }
  }
  .btn {
    margin-bottom: 13px;
  }
  p {
    margin-bottom: 0;
  }
  &__phone {
    color: $white;
    &:hover {
      color: $primary;
    }
  }
}
</style>
