<template>
  <aside class="sidebar sidebar--search-form">
    <div class="search-rates-form-results">
      <div class="row bottom-space">
        <div class="col-12">
          <div class="form-group">
            <div class="label">
              {{ 'Loan Purpose' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ loanPurpose.name || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <div v-if="loanPurpose && loanPurpose.name === 'Purchase'" class="label">
              {{ 'Purchase price' | titlecase }}
            </div>
            <div v-else class="label">
              {{ 'Property value' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ propertyValue || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="loanPurpose && loanPurpose.name === 'Refinance Cash Out'" class="col-12">
          <div class="form-group">
            <div class="label">
              {{ 'Cash Out Amount' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ loanCashOutAmount || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <div v-if="loanPurpose && loanPurpose.name === 'Refinance Cash Out'" class="label">
              {{ 'Total Loan Amount' }}
              <img id="taxes-tooltip" src="~assets/icons/icon-info.png" height="16" width="16" alt="Additional Information">
              <b-tooltip target="taxes-tooltip" triggers="hover">
                Current loan amount plus cash out request
              </b-tooltip>
            </div>
            <div v-else class="label">
              {{ 'Loan Amount' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ loanAmount || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="locAmount" class="col-12">
          <div class="form-group">
            <div class="label">
              {{ 'LOC Balance' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ locAmount || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="w-100 bottom-space" />
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <div class="label">
              {{ 'State' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ state.name || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <div class="label">
              {{ 'Zip Code' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ propertyZip || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <div class="label">
              {{ 'Property Type' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ propertyType.name || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 bottom-space">
          <div class="form-group">
            <div class="label">
              {{ 'Property Use' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ propertyUse.name || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <div class="label">
              {{ 'Credit Rating' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ creditRating.name || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <div class="label">
              {{ 'Taxes and Insurance' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ taxesAndInsurance || 'No' }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <div class="label">
              {{ 'Promo Code' | titlecase }}
            </div>
            <div class="value">
              <p class="small text-strong">
                {{ promotionCode || `&nbsp;` }}
              </p>
            </div>
            <div
              v-if="promotion && promotion.length && promotion[0].hasOwnProperty('displayMessage')"
            >
              <p class="success-inline mx-0">
                {{ promotion[0].displayMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <button
              @click="startNewSearch"
              class="btn btn-outline-primary"
            >
              {{ 'Try a New Search' | titlecase }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      creditRating: state => state.application.data.creditRating,
      keepingLoc: state => state.application.data.keepingLoc,
      loanAmount: state => state.application.data.loanAmount,
      loanCashOutAmount: state => state.application.data.loanCashOutAmount,
      loanPurpose: state => state.application.data.loanPurpose,
      loanRefinanceType: state => state.application.data.loanRefinanceType,
      loc: state => state.application.data.loc,
      locAfterFirst: state => state.application.data.locAfterFirst,
      locAmount: state => state.application.data.locAmount,
      promotion: state => state.application.data.promotion,
      promotionCode: state => state.application.data.promotionCode,
      propertyType: state => state.application.data.propertyType,
      propertyUse: state => state.application.data.propertyUse,
      propertyValue: state => state.application.data.propertyValue,
      propertyZip: state => state.application.data.propertyZip,
      signUp: state => state.application.data.signUp,
      state: state => state.application.data.state,
      taxesAndInsurance: state => state.application.data.taxes
    })
  },
  methods: {
    scrollToTop () {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
      document.body.focus()
    },
    startNewSearch () {
      this.$emit('startNewSearch')
      this.$router.push({
        path: '/search'
      })
      this.updateSidebar('default')
      this.scrollToTop()
    },
    updateSidebar (payload) {
      this.$store.commit('setLayoutSidebar', payload)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.sidebar--search-form {
  display: inline-flex;
  flex: 1 0 33.333333%;
  flex: 1 0 #{$spacer * 24.375};
  flex-basis: #{$spacer * 24.375};
  flex-direction: column;
  margin-bottom: 2.5625rem;
  max-width: #{$spacer * 24.375};
  padding-top: #{$spacer * 2.5};
  .search-rates-form-results {
    background-color: $white;
    border: 1px solid #DEDEDE;
    width: 100%;
    padding: 15px 22px 40px;
    .form-group {
      // margin-bottom: 0;
      .label {
        // bottom: -0.5em;
        color: $primary;
        font-size: #{$font-size-sm * 0.8125};
        font-weight: $font-weight-normal;
        margin-left: 0; // $input-padding-x;
        margin-bottom: 0;
        position: relative;
      }
      .value {
        border-radius: 0;
        border-bottom: 1px solid #{$gray-500};
        border-left: none;
        border-right: none;
        border-top: none;
        font-weight: $font-weight-semibold;
      }
    }
    .bottom-space {
      margin-bottom: 30px;
    }
  }
  @include media-breakpoint-down('sm') {
    display: none;
  }
}
</style>
