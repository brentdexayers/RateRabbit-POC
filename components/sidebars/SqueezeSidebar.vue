<template>
  <aside
    :class="classes"
    class="sidebar sidebar--squeeze"
  >
    <div class="sidebar--squeeze__intro">
      <h2 class="sidebar--squeeze__intro__header">
        Real Rates,<br>Real Time.
      </h2>
      <ul class="sidebar--squeeze__intro__list">
        <li>
          10 Seconds or Less
        </li>
        <li>
          No Personal Information
        </li>
        <li>
          Transparent
        </li>
        <li>
          Lock Your Rate 24/7
        </li>
        <li>
          Direct Lender
        </li>
        <li>
          Guaranteed Closing Costs
        </li>
      </ul>
    </div>
    <blockquote class="squeeze-sidebar__testimonial">
      I give very high marks to Rate Rabbit. My loan consultant got me locked in when I asked him to and at what turned out to be a very good rate.
      <footer>Rick H, California</footer>
    </blockquote>
    <div class="w-100" />
  </aside>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.sidebar--squeeze {
  background-color: $green;
  background: linear-gradient(74.78deg, $green 0%, #BED72A 100%);
  color: $white;
  display: inline-flex;
  flex: 1 0 100%;
  flex-direction: column;
  justify-content: space-between;
  max-width: 488px;
  padding: #{$spacer * 4.125} #{$grid-gutter-width};
  @include media-breakpoint-down('sm') {
    display: none;
  }
  &__intro {
    align-self: center;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    max-width: 290px;
    &__header {
      color: $white;
      font-size: 36px;
      font-weight: bold;
      line-height: 40px;
      margin-bottom: 33px;
    }
    &__list {
      line-height: 30px;
      list-style: none;
      margin-bottom: 33px;
      padding-left: 2rem;
      li {
        position: relative;
        &::before {
          content: "";
          background-image: url(~assets/icons/icon-check.png);
          background-position: center 0.3em;
          background-repeat: no-repeat;
          background-size: contain;
          bottom: 0;
          display: block;
          height: 100%;
          left: -2rem;
          position: absolute;
          top: 0;
          width: 1.25rem;
        }
      }
    }
  }
  blockquote {
    font-size: $font-size-sm;
    line-height: 1.625;
    font-style: italic;
    footer {
      font-size: 14px;
      font-style: normal;
    }
  }
  @include media-breakpoint-down('md') {
    flex: 1 0 40%;
  }
  @include media-breakpoint-down('sm') {
    display: none;
    flex: 1 0 100%;
    max-width: 100%;
  }
}
</style>
