<template>
  <section class="hero">
    <div class="container">
      <h3 class="subtitle hero__subtitle">
        Home Loans &amp; Direct Lender.
        <br class="d-block d-md-none">
        Billions Funded.
        <br class="d-block">
        A Mortgage Company You Can Trust.
      </h3>
      <h1 class="title hero__title">
        Fast Easy Mortgage Rates in 10 Seconds or Less
      </h1>
      <div class="hero__cta">
        <nuxt-link to="/search" class="hero__cta__button">
          <span class="hero__cta__button__text">
            Search Live Rates
          </span>
        </nuxt-link>
        <p class="hero__cta__disclaimer">
          No Personal Information Required
        </p>
      </div>
    </div>
    <GoToNextSection classes="d-none d-md-block" />
  </section>
</template>

<script>
import GoToNextSection from '~/components/globals/GoToNextSection.vue'

export default {
  components: {
    GoToNextSection
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.hero {
  align-items: center;
  background: $green;
  background: -moz-linear-gradient(45deg,  rgba($green,1) 0%, rgba($light-green,1) 100%);
  background: -webkit-linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
  background: linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#009646', endColorstr='#9ecd33',GradientType=1 );
  background-image: url(~assets/images/home-hero-bg.jpg);
  background-position: center center;
  background-size: cover;
  color: #ffffff;
  min-height: 100vh;
  min-height: calc(100vh - 110px);
  padding-bottom: 80px;
  padding-top: 80px;
  text-align: center;
  &__title {
    color: $white;
    font-size: #{$font-size-base * 3.047619047619048}; // ~64px
    font-weight: bold;
    letter-spacing: 0.82px;
    margin-bottom: 60px;
    @include media-breakpoint-down('sm') {
      // font-size: #{$font-size-base * 2.09523}; // ~44px
      font-size: #{$font-size-base * 2}; // ~42px
      line-height: 1.2;
    }
  }
  &__subtitle {
    color: $white;
    font-size: #{$font-size-sm * 0.7777777777777778}; // ~14px
    font-weight: bold;
    letter-spacing: 0.82px;
    text-transform: uppercase;
  }
  &__cta {
    display: inline-flex;
    flex: 1 1 auto;
    flex-direction: column;
    @include media-breakpoint-down('sm') {
      width: 100%;
    }
    &__button {
      align-items: center;
      justify-content: center;
      background: rgba(27,102,39,0.65);
      border-radius: 45.5px;
      color: #ffffff;
      display: inline-flex;
      flex: 0 1 auto;
      font-family: $font-family-condensed;
      font-size: #{$font-size-base * 2.09523}; // ~44px
      height: 80px;
      padding-left: 73px;
      padding-right: 73px;
      white-space: nowrap;
      @include media-breakpoint-down('sm') {
        font-size: #{$font-size-base * 1.523809523809524}; // ~34px
      }
      &:hover {
        text-decoration: none;
        color: #ffffff;
      }
      &__text {
        &::after {
          background: url("~assets/icons/icon-arrow-forward.png");
          content: "";
          display: inline-block;
          height: 24px;
          margin-left: 10px;
          max-width: 100%;
          width: 23px;
        }
      }
    }
    &__disclaimer {
      font-style: italic;
      font-size: #{$font-size-base * 0.8571428571428571}; // ~18px
      line-height: 22px;
      opacity: 0.90;
      margin-top: 14px;
      @include media-breakpoint-down('sm') {
        font-size: #{$font-size-base * 0.6666666666666667}; // ~14px
      }
    }
  }
}
</style>
