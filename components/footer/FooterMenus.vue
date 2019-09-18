<template>
  <div
    class="site-footer__menus row"
  >
    <div class="col">
      <h5 class="site-footer__menus__menu-title">
        Home Purchase
      </h5>
      <ul class="nav site-footer__menus__menu">
        <li>
          <nuxt-link to="#">
            Apply for a Loan
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">
            Loan Programs
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">
            Help Guides
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="col">
      <h5 class="site-footer__menus__menu-title">
        Refinance
      </h5>
      <ul class="nav site-footer__menus__menu">
        <li>
          <nuxt-link to="#">
            Apply for a Loan
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">
            Loan Programs
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">
            Help Guides
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="col">
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
    <FooterCTA />
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

.site-footer__menus {
  color: #ffffff;
  margin-bottom: 102px;
  text-align: left;
  &__menu {
    flex-direction: column;
    li, a {
      color: #ffffff;
      font-size: 18px;
      line-height: 32px;
      &:hover {
        color: $green;
        text-decoration: none;
      }
    }
  }
  &__menu-title {
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.82px;
    line-height: 22px;
    opacity: 0.40;
    text-transform: uppercase;
  }
}
</style>
