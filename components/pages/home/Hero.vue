<template>
  <section class="hero">
    <div class="container">
      <h3 class="subtitle hero__subtitle">
        Home Loans &amp; Direct Lender. Billions Funded.
      </h3>
      <h1 class="title hero__title">
        Fast Easy Mortgage Rates in 10 Seconds or Less
      </h1>
      <CTAButton cta="Search Live Rates" />
    </div>
    <GoToNextSection />
  </section>
</template>

<script>
import GoToNextSection from '~/components/GoToNextSection.vue'
import CTAButton from '~/components/CTAButton.vue'

export default {
  components: {
    GoToNextSection,
    CTAButton
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
    font-size: 64px;
    font-weight: bold;
    letter-spacing: 0.82px;
    margin-bottom: 60px;
  }
  &__subtitle {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.82px;
    text-transform: uppercase;
  }
}
</style>
