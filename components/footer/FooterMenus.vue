<template>
  <div
    class="site-footer__menus row"
  >
    <div class="col-6 col-sm-6 col-lg mb-4">
      <h5 class="site-footer__menus__menu-title">
        Home Purchase
      </h5>
      <ul class="nav site-footer__menus__menu">
        <li>
          <nuxt-link
            @click="$emit('setloanpurpose', 'Purchase')"
            to="/search"
          >
            Apply for a Loan
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/programs/purchase">
            Loan Programs
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/help">
            Help Guides
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="col-6 col-sm-6 col-lg mb-4">
      <h5 class="site-footer__menus__menu-title">
        Refinance
      </h5>
      <ul class="nav site-footer__menus__menu">
        <li>
          <nuxt-link
            @click="$emit('setloanpurpose', 'Refinance')"
            to="/search"
          >
            Apply for a Loan
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/programs/refinance">
            Loan Programs
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/help">
            Help Guides
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="col-6 col-sm-6 col-lg mb-4">
      <h5 class="site-footer__menus__menu-title">
        Customer Service
      </h5>
      <ul class="nav site-footer__menus__menu">
        <li>
          <nuxt-link to="tel:+18883950395">
            (888) 395-0395
          </nuxt-link>
        </li>
        <li>
          540 Front St.
        </li>
        <li>
          San Diego, CA 92101
        </li>
      </ul>
    </div>
    <FooterCTA class="col-12 col-md-auto" />
  </div>
</template>

<script>
import FooterCTA from '~/components/footer/FooterCTA.vue'

export default {
  components: {
    FooterCTA
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.site-footer__menus {
  color: $white;
  margin-bottom: #{$spacer * 4.875};
  text-align: left;
  @include media-breakpoint-down('xs') {
    text-align: center;
  }
  &__menu {
    flex-direction: column;
    li, a {
      color: $white;
      font-size: 18px;
      line-height: 32px;
      &:hover {
        color: $green;
        text-decoration: none;
      }
    }
  }
  &__menu-title {
    color: $white;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.82px;
    line-height: 22px;
    opacity: 0.40;
    text-transform: uppercase;
  }
}
</style>
