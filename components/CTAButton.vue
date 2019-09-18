<template>
  <div class="cta">
    <nuxt-link :to="destination" class="cta__button">
      <span class="cta__button__text">
        {{ cta }}
      </span>
    </nuxt-link>
    <p v-if="showDisclaimer" class="cta__disclaimer">
      {{ disclaimer }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    destination: {
      type: String,
      default: 'search'
    },
    cta: {
      type: String,
      default: 'Search Live Rates'
    },
    showDisclaimer: {
      type: Boolean,
      default: true
    },
    disclaimer: {
      type: String,
      default: 'No Personal Information Required'
    }
  }
}
</script>

<style lang="scss">
.cta {
  display: inline-flex;
  flex: 1 1 auto;
  flex-direction: column;
  &__button {
    align-items: center;
    justify-content: center;
    background: rgba(27,102,39,0.65);
    border-radius: 45.5px;
    color: #ffffff;
    display: inline-flex;
    flex: 0 1 auto;
    font-size: 44px;
    height: 80px;
    padding-left: 73px;
    padding-right: 73px;
    &:hover {
      text-decoration: none;
      color: #ffffff;
    }
    &__text {
      &::after {
        background: url("~assets/icons/icon-arrow-forward.png");
        content: "";
        display: inline-block;
        height: 24px;
        margin-left: 10px;
        max-width: 100%;
        width: 23px;
      }
    }
  }
  &__disclaimer {
    font-style: italic;
    font-size: 18px;
    line-height: 22px;
    opacity: 0.90;
    margin-top: 14px;
  }
}
</style>
