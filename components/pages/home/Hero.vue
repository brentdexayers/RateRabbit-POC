<template>
  <section class="hero">
    <div class="container">
      <h3 class="subtitle hero__subtitle">
        Home Loans &amp; Direct Lender. Billions Funded.
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
    <GoToNextSection />
  </section>
</template>

<script>
import GoToNextSection from '~/components/GoToNextSection.vue'

export default {
  components: {
    GoToNextSection
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

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
    font-size: 64px;
    font-weight: bold;
    letter-spacing: 0.82px;
    margin-bottom: 60px;
  }
  &__subtitle {
    color: $white;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.82px;
    text-transform: uppercase;
  }
  &__cta {
    display: inline-flex;
    flex: 1 1 auto;
    flex-direction: column;
    &__button {
      align-items: center;
      justify-content: center;
      background: rgba(27,102,39,0.65);
      border-radius: 45.5px;
      color: #ffffff;
      display: inline-flex;
      flex: 0 1 auto;
      font-size: 44px;
      height: 80px;
      padding-left: 73px;
      padding-right: 73px;
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
      font-size: 18px;
      line-height: 22px;
      opacity: 0.90;
      margin-top: 14px;
    }
  }
}
</style>
