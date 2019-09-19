<template>
  <ul class="navbar-nav site-header__navbar__nav">
    <li class="nav-item">
      <nuxt-link
        to="/apply"
        class="nav-link"
        @click.native="navItemClicked"
      >
        Apply for a Loan
      </nuxt-link>
    </li>
    <li class="nav-item dropdown">
      <nuxt-link
        id="navbarDropdownAbout"
        to="/about"
        class="nav-link dropdown-toggle"
        @click.native="navItemClicked"
      >
        About Us
      </nuxt-link>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownAbout">
        <nuxt-link
          to="whychoose"
          class="dropdown-item"
          @click.native="navItemClicked"
        >
          Why Choose RateRabbit
        </nuxt-link>
        <nuxt-link
          to="/about/trackrecord"
          class="dropdown-item"
          @click.native="navItemClicked"
        >
          Our Track Record
        </nuxt-link>
        <nuxt-link
          to="/about/faq"
          class="dropdown-item"
          @click.native="navItemClicked"
        >
          Faq's
        </nuxt-link>
        <nuxt-link
          to="/about/help"
          class="dropdown-item"
          @click.native="navItemClicked"
        >
          Help Guides
        </nuxt-link>
        <nuxt-link
          to="/connect"
          class="dropdown-item"
          @click.native="navItemClicked"
        >
          Contact Us
        </nuxt-link>
      </div>
    </li>
    <li class="nav-item">
      <nuxt-link
        to="/about/help"
        class="nav-link"
        @click.native="navItemClicked"
      >
        Help Guides
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link
        to="/connect"
        class="nav-link"
        @click.native="navItemClicked"
      >
        Contact
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    navItemClicked () {
      this.$parent.closeMainNav()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.site-header {
  // parent component
  &__navbar {
    // parent component
    &__nav {
      > li {
        margin-bottom: 0;
        margin-left: 10px;
        margin-right: 10px;
        > a {
          font-size: 1rem;
          font-weight: normal;
          line-height: 1.375rem;
          padding-left: 1rem;
          padding-right: 1rem;
          &:hover {
            color: $primary;
          }
          &.nuxt-link-active {
            color: $primary;
          }
        }
      }
      .dropdown {
        &-toggle {
          &::after {
            display: none;
          }
        }
        .dropdown-menu {
          left: -#{$dropdown-padding-y};
          .dropdown-item {
            position: relative;
            &:hover {
              &::after {
                content: "";
                display: inline-block;
                background-image: url(~assets/icons/icon-arrow-forward-green.png);
                background-position: center bottom;
                background-repeat: no-repeat;
                background-size: contain;
                height: .75rem;
                margin-left: .25rem;
                width: .75rem;
              }
              @include media-breakpoint-down('md') {
                &::after {
                  display: none;
                }
              }
            }
          }
        }
        &:hover .dropdown-menu {
          display: block;
        }
      }
    }
  }
}
</style>
