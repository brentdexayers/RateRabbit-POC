<template>
  <ul class="navbar-nav site-header__navbar__nav">
    <li class="nav-item">
      <nuxt-link
        @click.native="navItemClicked"
        to="/search"
        class="nav-link"
      >
        Apply
      </nuxt-link>
    </li>
    <li
      @mouseover="dropdownShow"
      @mouseout="dropdownHide"
      class="nav-item dropdown"
    >
      <nuxt-link
        id="navbarDropdownAbout"
        @click.native="navItemClicked"
        to="/about"
        class="nav-link dropdown-toggle"
      >
        About Us
      </nuxt-link>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownAbout">
        <nuxt-link
          @click.native="navItemClicked"
          to="/about/whychoose"
          class="dropdown-item"
        >
          Why Choose RateRabbit
        </nuxt-link>
        <nuxt-link
          @click.native="navItemClicked"
          to="/about/trackrecord"
          class="dropdown-item"
        >
          Our Track Record
        </nuxt-link>
        <nuxt-link
          @click.native="navItemClicked"
          to="/about/faq"
          class="dropdown-item"
        >
          Faq's
        </nuxt-link>
        <nuxt-link
          @click.native="navItemClicked"
          to="/about/help"
          class="dropdown-item"
        >
          Help Guides
        </nuxt-link>
        <nuxt-link
          @click.native="navItemClicked"
          to="/connect"
          class="dropdown-item"
        >
          Contact Us
        </nuxt-link>
      </div>
    </li>
    <li class="nav-item">
      <nuxt-link
        @click.native="navItemClicked"
        to="/about/help"
        class="nav-link"
      >
        Help Center
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link
        @click.native="navItemClicked"
        to="/connect"
        class="nav-link"
      >
        Contact
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import getClosest from '~/mixins/getClosest.js'

export default {
  mixins: [getClosest],
  data () {
    return {
      dropdowns: [
        {
          about: {
            show: false
          }
        }
      ]
    }
  },
  methods: {
    navItemClicked (event) {
      // const dropdown = this.getClosest(event.target, '.dropdown')
      this.$parent.closeMainNav()
      const dropdowns = document.getElementsByClassName('dropdown')
      for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove('show')
      }
    },
    dropdownShow (event) {
      const dropdown = this.getClosest(event.target, '.dropdown')
      dropdown.classList.add('show')
    },
    dropdownHide (event) {
      const dropdown = this.getClosest(event.target, '.dropdown')
      dropdown.classList.remove('show')
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
      .nuxt-link-active {
        color: $primary;
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
        &.show .dropdown-menu {
          display: block;
        }
      }
    }
  }
}
</style>
