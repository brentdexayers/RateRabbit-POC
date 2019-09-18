<template>
  <div class="site-footer__colophon">
    <h4>
      Real Rates. Real Time.
    </h4>
    <hr>
    <ul class="nav site-footer__colophon__nav">
      <li>
        <nuxt-link to="#">
          Security Privacy
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="#">
          Help Guides
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="#">
          Connect with a Loan Consultant
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="#">
          Testimonials
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="#">
          About Us
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="#">
          Promo Codes
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="#">
          Licensing
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="#">
          Contact Us
        </nuxt-link>
      </li>
    </ul>
    <p class="colophon">
      &copy;2019 Rate Rabbit - all rights reserved.
    </p>
  </div>
</template>

<script>
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

.site-footer__colophon {
  color: #ffffff;
  text-align: left;
  h4 {
    font-size: 21px;
    font-style: italic;
    font-weight: normal;
    line-height: 28px;
    margin-bottom: 36px;
  }
  hr {
    color: transparent;
    height: 0;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.20);
    margin-bottom: 36px;
  }
  &__nav {
    justify-content: space-between;
    li, a {
      color: #ffffff;
      font-size: 14px;
      line-height: 32px;
      font-weight: normal;
      &:hover {
        color: $green;
        text-decoration: none;
      }
    }
  }
  .colophon {
    color: #ffffff;
    font-size: 14px;
    line-height: 32px;
    font-weight: normal;
  }
}
</style>
