<template>
  <div>
    <div
      v-if="loanProducts"
    >
      <div
        v-for="(loanProductGroup, loanProductGroupIndex) in loanProducts"
        :key="loanProductGroupIndex"
        class="results-table__results"
      >
        <h2>
          {{ loanProductGroup.amortization }}
        </h2>
        <div class="results-table__header container-fluid">
          <div class="row">
            <div class="col">
              {{ 'Rate' | uppercase }}
            </div>
            <div class="col">
              {{ 'APR' | uppercase }}
            </div>
            <div class="col">
              {{ 'Monthly Payment' | uppercase }}
            </div>
            <div class="col d-md-none d-lg-flex">
              &nbsp;
            </div>
          </div>
        </div>
        <div>
          <div
            v-for="(loanProduct, loanProductIndex) in loanProductGroup.results"
            :key="loanProductIndex"
            :data-rate-index="loanProductIndex"
            :class="showMore.indexOf(loanProductGroupIndex) > -1 || loanProductIndex < 2 ? 'show' : 'hide'"
            class="results-table__result-wrapper"
          >
            <div>
              <!-- Desktop view -->
              <div class="results-table__result results-table__result--desktop">
                <!-- One Fee Guarantee -->
                <div v-if="loanProduct.recommended" class="results-table__result__recommended">
                  <img src="~assets/icons/icon-check.png" width="18">
                </div>
                <!-- END: One Fee Guarantee -->
                <div class="row">
                  <div class="col">
                    <div class="row results-table__result--desktop__rates">
                      <div class="col-4">
                        {{ loanProduct.rate / 100 | percent }}
                      </div>
                      <div class="col-4">
                        {{ loanProduct.apr / 100 || 0 | percent }}
                      </div>
                      <div class="col-4">
                        {{ loanProduct.totalPayment | currency }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p :class="{ recommended: loanProduct.recommended }" class="ofg-text">
                          {{ 'One fee guarantee' | titlecase }}: <span :class="{ strong: loanProduct.recommended }">{{ loanProduct.fee | currency }}</span>
                          <span v-if="loanProduct.recommended" class="no-cost-loan-text">
                            {{ 'Recommended No-Cost loan' | titlecase }}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-lg-3">
                    <div class="row justify-content-between">
                      <div class="col-12 col-md-4 col-lg-12 order-md-last order-lg-first">
                        <nuxt-link
                          @click.native="apply(loanProduct)"
                          :data-loan-product-id="loanProduct.productId"
                          to="/apply"
                          class="btn btn-sm btn-primary results-table__result--desktop__button"
                        >
                          {{ 'Apply' | titlecase }}
                        </nuxt-link>
                      </div>
                      <div class="col-12 col-md-auto col-lg-12 order-md-first order-lg-last">
                        <p class="results-table__result--desktop__link-p">
                          <a
                            @click.prevent="showDetails($event, loanProduct)"
                            href="#"
                            class="link-decorated results-table__result--desktop__link"
                          >
                            {{ 'See Details' | titlecase }}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Mobile view -->
              <div class="results-table__result results-table__result--mobile">
                <!-- One Fee Guarantee -->
                <div v-if="loanProduct.recommended" class="results-table__result__recommended">
                  <img src="~assets/icons/icon-check.png" width="18">
                </div>
                <!-- END: One Fee Guarantee -->
                <div class="results-table__result--mobile__rates">
                  <div class="row">
                    <div class="col">
                      <p>
                        {{ 'Rate' | capitalize }}
                      </p>
                    </div>
                    <div class="col-auto text-right">
                      <p>
                        {{ loanProduct.rate / 100 | percent }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p>
                        {{ 'APR' | capitalize }}
                      </p>
                    </div>
                    <div class="col-auto text-right">
                      <p>
                        {{ loanProduct.apr / 100 || 0 | percent }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p>
                        {{ 'Monthly Payment' | capitalize }}
                      </p>
                    </div>
                    <div class="col-auto text-right">
                      <p>
                        {{ loanProduct.totalPayment | currency }}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p :class="{ recommended: loanProduct.recommended }">
                        {{ 'One Fee Guarantee' | capitalize }}
                        <span v-if="loanProduct.recommended" class="no-cost-loan-text">
                          {{ 'Recommended No-Cost loan' | titlecase }}
                        </span>
                      </p>
                    </div>
                    <div class="col-auto text-right">
                      <p>
                        {{ loanProduct.fee | currency }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <a
                      href="#"
                      class="btn btn-sm btn-outline-primary results-table__result--mobile__button results-table__button--mobile--details"
                    >
                      {{ 'Details' | titlecase }}
                    </a>
                  </div>
                  <div class="col">
                    <nuxt-link
                      @click.native="apply(loanProduct)"
                      :data-loan-product-id="loanProduct.productId"
                      to="/apply"
                      class="btn btn-sm btn-primary results-table__result--mobile__button results-table__result--mobile__button--apply"
                    >
                      {{ 'Apply' | titlecase }}
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="toggleShowMoreByIndex(loanProductGroupIndex)"
        >
          <span>
            {{ showMore.indexOf(loanProductGroupIndex) > -1 ? 'Show Less' : 'Show More' }}
          </span>
          <img
            :alt="showMore.indexOf(loanProductGroupIndex) > -1 ? 'Show Less' : 'Show More'"
            :class="showMore.indexOf(loanProductGroupIndex) > -1 ? 'icon--show-less' : 'icon--show-more'"
            src="~assets/icons/icon-chevron-down-sm.png"
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      showMore: []
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      loanProducts: state => state.search.results
    })
  },
  methods: {
    apply (loanProduct) {
      this.$store.commit('setApplicationLoanProduct', loanProduct)
      this.$emit('apply:', loanProduct)
    },
    showDetails (event, loanProduct) {
      this.$emit('showDetails', loanProduct)
    },
    toggleShowMoreByIndex (i) {
      const index = this.showMore.indexOf(i)
      if (index > -1) {
        this.showMore.splice(index, 1)
      } else {
        this.showMore.push(i)
      }
      console.log('shwMore', this.showMore)
    },
    log (i) {
      console.log(i)
    },
    limit (arr, more = false, limit = 2) {
      if (more) {
        return arr
      }
      return arr.slice(0, limit)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.search-results {
  .results-table {
    &__results {
      margin-bottom: #{$spacer * 4.125};
      button {
        align-items: center;
        background: transparent;
        border: 0;
        color: $primary;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        img {
          &.icon--show-less {
            transform: scaleY(-1);
          }
        }
      }
    }
    &__header {
      background-color: $white;
      border: $border-width solid $gray-450;
      color: rgba($body-color,0.5);
      font-size: 12px;
      font-weight: $font-weight-bold;
      line-height: 28px;
      padding-left: #{$spacer * 1.25};
      padding-right: #{$spacer * 1.25};
      position: sticky;
      top: 110px;
      z-index: 1000;
      @include media-breakpoint-down('sm') {
        display: none;
      }
      .row {
        align-items: center;
        .col {
          white-space: nowrap;
        }
      }
    }
    &__result {
      &-wrapper {
        height: auto;
        overflow: hidden;
        transition: height .33s ease;
        &.show {
          height: 130px;
          @include media-breakpoint-down('sm') {
            height: 220px;
          }
        }
        &.hide {
          height: 0;
        }
      }
      &--desktop {
        @include media-breakpoint-down('sm') {
          display: none;
        }
        background-color: $gray-400;
        border: $border-width solid $gray-450;
        margin-bottom: .25rem;
        padding-left: #{$spacer * 1.25};
        padding-right: #{$spacer * 1.25};
        padding-top: #{$spacer * 2};
        padding-bottom: $spacer;
        position: relative;
        &__rates {
          font-size: $font-size-lg;
          font-weight: $font-weight-semibold;
          line-height: 28px;
          margin-bottom: $spacer;
        }
        &__guarantee {
          font-size: $font-size-sm;
          line-height: 28px;
        }
        &__button {
          display: block;
          margin-bottom: #{$spacer * .7};
          width: 100%;
        }
        &__link {
          color: $primary;
          font-size: $font-size-sm;
          line-height: 28px;
          margin-bottom: 0;
          white-space: nowrap;
          &::after {
            height: 12px;
            width: 12px;
          }
          &-p {
            text-align: center;
          }
        }
      }
      &--mobile {
        @include media-breakpoint-up('md') {
          display: none;
        }
        background-color: $gray-400;
        border: $border-width solid $gray-450;
        margin-bottom: #{$spacer * .25};
        padding-left: #{$spacer * 1.25};
        padding-right: #{$spacer * 1.25};
        padding-top: #{$spacer * 2};
        padding-bottom: $spacer;
        position: relative;
        &__rates {
          font-size: $font-size-sm;
          font-weight: $font-weight-semibold;
          line-height: 28px;
          margin-bottom: $spacer;
        }
        &__button {
          display: block;
          width: 100%;
        }
      }
      &__recommended {
        background-color: $primary;
        background: -moz-linear-gradient(-45deg,  rgba($primary,1) 0%, rgba($primary,1) 50%, rgba($primary,0) 50.01%, rgba($primary,0) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(-45deg,  rgba($primary,1) 0%,rgba($primary,1) 50%,rgba($primary,0) 50.01%,rgba($primary,0) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(135deg,  rgba($primary,1) 0%,rgba($primary,1) 50%,rgba($primary,0) 50.01%,rgba($primary,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        height: 2rem;
        left: 0;
        position: absolute;
        top: 0;
        width: 2rem;
        img {
          left: 2px;
          position: absolute;
          top: 4px;
        }
      }
      .ofg-text {
        font-size: $font-size-sm;
      }
      .recommended {
        padding-left: 1em;
        position: relative;
        &::before {
          background-image: url(~assets/icons/icon-verified.png);
          background-repeat: no-repeat;
          background-size: contain;
          content: "";
          display: block;
          height: .85em;
          left: 0;
          position: absolute;
          top: .4rem;
          width: .85em;
        }
        .strong {
          font-weight: $font-weight-bold;
        }
        .no-cost-loan-text {
          font-size: 0.875em;
          font-style: italic;
          opacity: .5;
          display: block;
        }
      }
    }
  }
}
</style>
