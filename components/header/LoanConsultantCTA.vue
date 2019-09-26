<template>
  <a :href="phone.number.tollFree | phonelink" class="loan-consultant-cta">
    <div class="loan-consultant-cta__icon">
      <img src="~assets/icons/icon-call.png" alt="Call Now" class="icon">
    </div>
    <div class="loan-consultant-cta__text">
      <div class="loan-consultant-cta__text__title">
        Loan Consultant
      </div>
      <PhoneLink class="loan-consultant-cta__text__phone" />
    </div>
  </a>
</template>

<script>
import PhoneLink from '~/components/globals/PhoneLink.vue'
import phone from '~/mixins/phoneNumber.js'

export default {
  components: {
    PhoneLink
  },
  data () {
    return {
      phone
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.loan-consultant-cta {
  align-items: center;
  display: flex;
  flex-direction: row;
  &__icon {
    display: flex;
    flex: 1 1 auto;
    padding-right: #{$spacer * .75};
    @include media-breakpoint-down('md') {
      padding-right: 0;
    }
    img {
      height: 30px;
      max-width: 100%;
      width: auto;
    }
  }
  &__text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    @include media-breakpoint-down('md') {
      display: none;
    }
    &__title {
      color: #009646;
      font-weight: bold;
      font-size: 11px;
      letter-spacing: 0.82px;
      text-align: left;
      text-transform: uppercase;
    }
    &__phone {
      text-align: left;
      color: #2D3033;
      font-size: 21px;
      white-space: nowrap;
    }
  }
  &:hover {
    text-decoration: none;
  }
}
</style>
