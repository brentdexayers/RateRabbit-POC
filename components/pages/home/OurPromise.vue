<template>
  <section class="section--our-promise">
    <div class="container">
      <h3 class="subtitle section--our-promise__subtitle">
        Our promise to you
      </h3>
      <h1 class="title section--our-promise__title">
        One Fee Guarantee
      </h1>
      <div class="row justify-content-center section--our-promise__text">
        <div class="col-12 col-lg-11">
          <p>
            Your total cost includes all lender and third party fees (Refinance only).<br>
            On new purchases, we <a class="link-underscored">guarantee</a> all your lender fees.
          </p>
          <p>
            We are a Direct Lender and <i>not</i> a lead site.
          </p>
        </div>
      </div>
      <div class="row justify-content-between section--our-promise__icons">
        <div class="col-6 col-lg">
          <img src="~assets/icons/line-art-guaranteed-costs.png" alt="Guaranteed Closing Costs">
          <p>
            Guaranteed<br>
            Closing Costs
          </p>
        </div>
        <div class="col-6 col-lg">
          <img src="~assets/icons/line-art-fast-process.png" alt="Fast Loan Process">
          <p>
            Fast Loan<br>
            Process
          </p>
        </div>
        <div class="col-6 col-lg">
          <img src="~assets/icons/line-art-lowest-rates.png" alt="Lowest Rates and Fees">
          <p>
            Lowest<br>
            Rates &amp; Fees
          </p>
        </div>
        <div class="col-6 col-lg">
          <img src="~assets/icons/line-art-one-fee.png" alt="One Closing Fee">
          <p>
            No Cost Loan or<br>
            1 Closing Fee Option
          </p>
        </div>
        <div class="col-6 col-lg">
          <img src="~assets/icons/line-art-direct-lender.png" alt="Direct Lender">
          <p>
            Direct<br>
            Lender
          </p>
        </div>
        <div class="col-6 col-lg">
          <img src="~assets/icons/line-art-no-personal-info.png" alt="No Personal Info Required">
          <p>
            No Personal<br>
            Info Required
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.section--our-promise {
  background-color: $white;
  padding-bottom: 164px;
  padding-top: 150px;
  text-align: center;
  @include media-breakpoint-down('sm') {
    padding-bottom: 103px;
    padding-top: 63px;
  }
  &__subtitle {
    color: rgba($body-color, 0.5);
    text-transform: uppercase;
    font-size: $font-size-sm; // ~18px
    @include media-breakpoint-down('sm') {
      font-size: #{$font-size-sm * 0.7777777777777778}; // ~14px
    }
  }
  &__title {
    color: $primary;
    font-size: #{$font-size-base * 2.476190476190476}; // ~52px
    margin-bottom: 0.627em;
    @include media-breakpoint-down('sm') {
      font-size: #{$font-size-base * 1.714285714285714}; // ~36px
    }
  }
  &__text {
    margin-bottom: #{$spacer * 4.1875};
    .link-underscored {
      border-bottom: 2px solid $primary;
      color: $body-color;
      display: inline-block;
      font-weight: $font-weight-bold;
      text-decoration: none;
      transition: $transition-base;
      &:hover {
        color: $primary;
      }
    }
  }
  &__icons {
    img {
      margin-bottom: #{$spacer * 1.875};
    }
    p {
      font-size: $font-size-sm;
      font-weight: $font-weight-semibold;
      line-height: 1.3125;
    }
  }
}
</style>
