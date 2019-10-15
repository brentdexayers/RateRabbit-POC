<template>
  <div
    class="search-loader"
  >
    <div class="search-loader__content">
      <div class="search-loader__gif">
        <img src="~assets/images/raterabbit.gif">
      </div>
      <!-- <div class="search-loader__lead">
        <p>
          Hang Tight… Your Quote is Almost Ready
        </p>
      </div> -->
      <div class="search-loader__box">
        <div class="search-loader__box__title">
          Other Lenders Don’t Guarantee Their Closing Costs. <i>We Do.</i>
        </div>
        <div class="search-loader__box__graphic">
          <div class="row">
            <div class="col-auto">
              <img src="~assets/icons/icon-other-lenders.png">
              <p>
                {{ 'Other Lenders' | titlecase }}
              </p>
            </div>
            <div class="col-auto">
              <div class="the-arrow" />
            </div>
            <div class="col-auto">
              <img src="~assets/icons/icon-happy.png">
              <p>
                {{ 'Rate Rabbit' | titlecase }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.search-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $light;
  z-index: 1;
  &__content {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 9rem;
    text-align: center;
  }
  &__gif {
    img {
      width: 200px;
    }
  }
  &__lead {
    p {
      font-size: $font-size-base;
      margin-bottom: 2rem;
    }
  }
  &__box {
    background-color: #FEFEFE;
    border: 1px solid #F0F0F0;
    border-radius: 10px;
    box-shadow: 0 30px 80px -20px rgba(0,0,0,0.25);
    margin: 1rem auto 0;
    max-width: 826px;
    padding: 2rem 2rem;
    &__title {
      color: $primary;
      font-size: 3rem;
      font-weight: $font-weight-bold;
      line-height: 1.2;
      margin-bottom: 2.5rem;
      text-align: center;
    }
    &__graphic {
      .row {
        justify-content: center;
        align-items: center;
        .col-auto {
          text-align: center;
        }
      }
      p {
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
      }
      .the-arrow {
        background-color: $primary;
        height: 1px;
        margin-bottom: 1.6rem;
        width: 120px;
        &::after {
          border-bottom: 5px solid transparent;
          border-left: 10px solid $primary;
          border-top: 5px solid transparent;
          content: "";
          display: inline-block;
          position: absolute;
          right: 10px;
          top: -4.5px;
        }
      }
    }
  }
}
</style>
