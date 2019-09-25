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
        <nuxt-link to="/about/help">
          Help Guides
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/connect">
          Connect with a Loan Consultant
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/testimonials">
          Testimonials
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">
          About Us
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/promos">
          Promo Codes
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/licensing">
          Licensing
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/connect">
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
@import '~bootstrap/scss/mixins.scss';

.site-footer__colophon {
  color: $white;
  text-align: left;
  @include media-breakpoint-down('xs') {
    text-align: center;
  }
  h4 {
    color: $white;
    font-size: 21px;
    font-style: italic;
    font-weight: normal;
    line-height: 28px;
    margin-bottom: 36px;
    @include media-breakpoint-down('sm') {
      display: none;
    }
  }
  &__nav {
    justify-content: space-between;
    margin-left: -.5rem;
    margin-right: -.5rem;
    @include media-breakpoint-down('sm') {
      justify-content: center;
    }
    li {
      margin-left: .5rem;
      margin-right: .5rem;
      @include media-breakpoint-down('sm') {
        flex: 0 1 auto;
      }
      a {
        color: $white;
        font-size: 14px;
        line-height: 32px;
        font-weight: normal;
      }
      &:hover {
        a {
          color: $green;
          text-decoration: none;
        }
      }
    }
    // @media screen and (max-width: 925px) {
    //   &::after {
    //     content: "";
    //     flex: auto;
    //   }
    // }
  }
  .colophon {
    color: $white;
    font-size: 14px;
    line-height: 32px;
    font-weight: normal;
    @include media-breakpoint-down('sm') {
      margin-top: #{$spacer * 2.25};
    }
  }
}
</style>
