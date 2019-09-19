<template>
  <header
    id="site-header"
    class="site-header"
  >
    <nav id="mainNav" class="navbar navbar-light navbar-expand-lg site-header__navbar">
      <div class="container">
        <button
          class="navbar-toggler site-header__navbar__toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="mainNav.toggle = !mainNav.toggle"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <nuxt-link to="/" class="navbar-brand site-header__navbar__logo">
          <Logo />
        </nuxt-link>
        <div class="collapse navbar-collapse site-header__navbar__nav-wrapper" :class="{ show: mainNav.toggle }">
          <button
            class="navbar-toggler--close site-header__navbar__toggler--close"
            type="button"
            data-toggle="collapse"
            data-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="mainNav.toggle = !mainNav.toggle"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <NavMenu />
          <Phone />
        </div>
        <LoanConsultantCTA />
      </div>
    </nav>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue'
import NavMenu from '~/components/NavMenu.vue'
import Phone from '~/components/Phone.vue'
import LoanConsultantCTA from '~/components/LoanConsultantCTA.vue'

export default {
  components: {
    Logo,
    NavMenu,
    Phone,
    LoanConsultantCTA
  },
  data () {
    return {
      mainNav: {
        toggle: false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.site-header {
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  &__navbar {
    align-items: center;
    background-color: $white;
    height: 110px;
    padding: 0;
    .container {
      padding-left: $grid-gutter-width;
      padding-right: $grid-gutter-width;
    }
    &__toggler {
      &--close {
        background: transparent;
        border-color: transparent;
        display: none;
        left: $grid-gutter-width;
        position: fixed;
        top: $grid-gutter-width;
        z-index: 10001;
        @include media-breakpoint-down('md') {
          display: block;
        }
        .navbar-toggler-icon {
          background: no-repeat center center;
          background-image: url(~assets/icons/icon-close.png);
          background-size: 100% 100%;
          content: "";
          display: inline-block;
          height: 1.5em;
          vertical-align: middle;
          width: 1.5em;
        }
      }
    }
    &__nav-wrapper {
      justify-content: center;
      @include media-breakpoint-down('md') {
        background: white;
        bottom: 0;
        box-shadow: 0px 4px 10px -10px;
        left: 0;
        overflow-y: auto;
        padding: 110px $grid-gutter-width $grid-gutter-width;
        position: fixed;
        right: 0;
        text-align: center;
        top: 0;
        width: 100%;
        .nav {
          &-item {
            }
          &-link {
            font-size: $font-size-lg;
            line-height: 1.33333;
          }
        }
        .dropdown {
          &-menu {
            border: none;
            display: block;
            font-size: $font-size-sm;
            line-height: 2.25;
            padding: 0;
            text-align: center;
          }
          &-item {
            padding: 0;
          }
        }
        .phone {
          align-items: center;
          border: $btn-border-width solid $primary;
          border-radius: $btn-border-radius;
          display: none;
          font-size: $font-size-lg;
          font-family: $font-family-condensed;
          line-height: 1;
          margin-top: 30px;
          padding: 22px 49px;
          @include media-breakpoint-down('md') {
            display: inline-flex;
          }
          &::before {
            content: "";
            background-image: url(~assets/icons/icon-call.png);
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            display: inline-block;
            height: 30px;
            margin-right: .25em;
            width: 30px;
          }
        }
      }
    }
  }
}
</style>
