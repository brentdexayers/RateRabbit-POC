<template>
  <header
    id="site-header"
    class="site-header"
  >
    <nav id="mainNav" class="navbar navbar-expand-md site-header__navbar">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand site-header__navbar__logo">
          <Logo />
        </nuxt-link>
        <button
          class="navbar-toggler site-header__navbar__toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse site-header__navbar__nav-wrapper">
          <ul class="navbar-nav site-header__navbar__nav">
            <li class="nav-item">
              <nuxt-link to="apply" class="nav-link">
                Apply for a Loan
              </nuxt-link>
            </li>
            <li class="nav-item dropdown">
              <nuxt-link to="about" class="nav-link dropdown-toggle">
                About Us
              </nuxt-link>
              <ul class="dropdown-menu">
                <li class="dropdown-item">
                  <nuxt-link to="whychoose" class="dropdown-link">
                    Why Choose RateRabbit
                  </nuxt-link>
                </li>
                <li class="dropdown-item">
                  <nuxt-link to="trackrecord" class="dropdown-link">
                    Our Track Record
                  </nuxt-link>
                </li>
                <li class="dropdown-item">
                  <nuxt-link to="faq" class="dropdown-link">
                    Faq's
                  </nuxt-link>
                </li>
                <li class="dropdown-item">
                  <nuxt-link to="help" class="dropdown-link">
                    Help Guides
                  </nuxt-link>
                </li>
                <li class="dropdown-item">
                  <nuxt-link to="connect" class="dropdown-link">
                    Contact Us
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <nuxt-link to="help" class="nav-link">
                Help Guides
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="connect" class="nav-link">
                Contact
              </nuxt-link>
            </li>
          </ul>
        </div>
        <LoanConsultantCTA />
      </div>
    </nav>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue'
import LoanConsultantCTA from '~/components/LoanConsultantCTA.vue'

export default {
  components: {
    Logo,
    LoanConsultantCTA
  }
}
</script>

<style lang="scss">
.site-header {
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  &__navbar {
    align-items: center;
    background-color: #ffffff;
    height: 110px;
    padding: 0 1rem;
    &__nav-wrapper {
      justify-content: center;
    }
    &__nav {
      li, a {
        color: #2D3033;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        &:hover {
          color: #009646;
        }
      }
      li {
        margin-left: 10px;
        margin-right: 10px;
        &.dropdown {
          &:hover {
            .dropdown-menu {
              display: block;
            }
          }
        }
      }
      a {
        padding-left: 16px;
        padding-right: 16px;
        &.nuxt-link-active {
          color: #009646;
        }
      }
    }
  }
}
</style>
