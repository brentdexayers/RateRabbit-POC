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
              <p>
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
              <p>
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
              <p>
                {{ loanCashOutAmount || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 bottom-space">
          <div class="form-group">
            <div v-if="loanPurpose && loanPurpose.name === 'Refinance Cash Out'" class="label">
              {{ 'Total Loan Amount (Current loan amount plus cash out request)' }}
            </div>
            <div v-else class="label">
              {{ 'Loan Amount' | titlecase }}
            </div>
            <div class="value">
              <p>
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
              <p>
                {{ locAmount || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="form-group">
            <div class="label">
              {{ 'State' | titlecase }}
            </div>
            <div class="value">
              <p>
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
              <p>
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
              <p>
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
              <p>
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
              <p>
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
              <p>
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
              <p>
                {{ promotionCode || `&nbsp;` }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <a
              href="/search"
              class="btn btn-outline-primary"
            >
              {{ 'Try a New Search' | titlecase }}
            </a>
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
      promotionCode: state => state.application.data.promotionCode,
      propertyType: state => state.application.data.propertyType,
      propertyUse: state => state.application.data.propertyUse,
      propertyValue: state => state.application.data.propertyValue,
      propertyZip: state => state.application.data.propertyZip,
      signUp: state => state.form.data.signUp,
      state: state => state.application.data.state,
      taxesAndInsurance: state => state.application.data.taxes
    })
  },
  methods: {
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
