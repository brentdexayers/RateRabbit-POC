<template>
  <section class="hero">
    <div class="container">
      <h3 class="subtitle hero__eyebrow">
        Fast, Easy Mortgage Rates in 10 Seconds or Less
      </h3>
      <h1 class="title hero__title">
        A Mortgage Company You Can Trust
      </h1>
      <h2 class="title hero__subtitle">
        Search Rates Now & Choose Your 1 Fee Guarantee
      </h2>
      <div class="hero__cta">
        <nuxt-link to="/search" class="hero__cta__button">
          <span class="hero__cta__button__text">
            Search Live Rates
          </span>
          <span class="hero__cta__button__subtext">
            No Personal Info Needed
          </span>
        </nuxt-link>
        <p class="hero__cta__disclaimer">
          Rate Rabbit is committed to providing the lowest mortgage rates and a choice of either a NO cost loan or 1 fixed closing fee.
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
    font-weight: normal;
    letter-spacing: 0.82px;
    margin-bottom: .1em;
    @include media-breakpoint-down('sm') {
      // font-size: #{$font-size-base * 2.09523}; // ~44px
      font-size: #{$font-size-base * 2}; // ~42px
      line-height: 1.2;
    }
  }
  &__subtitle {
    color: $white;
    font-size: #{$font-size-base * 1.5}; // ~64px
    font-weight: normal;
    letter-spacing: 0.82px;
    margin-bottom: 2.5em;
    @include media-breakpoint-down('sm') {
      // font-size: #{$font-size-base * 2.09523}; // ~44px
      font-size: #{$font-size-base}; // ~42px
      line-height: 1.2;
    }
  }
  &__eyebrow {
    color: $white;
    // font-size: #{$font-size-sm * 0.7777777777777778}; // ~14px
    font-size: #{$font-size-base}; // ~21px
    font-weight: 300;
    letter-spacing: 0.82px;
    text-transform: uppercase;
    margin-bottom: 2.5em;
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
      border-radius: 50px;
      color: #ffffff;
      display: inline-flex;
      flex: 0 1 auto;
      flex-direction: column;
      font-family: $font-family-base;
      font-size: #{$font-size-base * 2.09523}; // ~44px
      margin: auto;
      margin-bottom: 1em;
      padding-bottom: 10px;
      padding-left: 73px;
      padding-right: 73px;
      padding-top: 10px;
      // white-space: nowrap;
      @include media-breakpoint-down('sm') {
        font-size: #{$font-size-base * 1.523809523809524}; // ~34px
        padding-left: 1em;
        padding-right: 1em;
      }
      &:hover {
        text-decoration: none;
        color: #ffffff;
      }
      &__text {
        line-height: 1;
      }
      &__subtext {
        font-size: .4em;
        letter-spacing: .175em;
        text-transform: uppercase;
      }
    }
    &__disclaimer {
      font-style: italic;
      font-size: #{$font-size-base * 0.8571428571428571}; // ~18px
      line-height: 22px;
      margin-top: 14px;
      max-width: 34rem;
      opacity: 0.90;
      @include media-breakpoint-down('sm') {
        font-size: #{$font-size-base * 0.6666666666666667}; // ~14px
      }
    }
  }
}
</style>
