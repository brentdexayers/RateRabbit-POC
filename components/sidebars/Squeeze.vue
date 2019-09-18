<template>
  <aside class="sidebar sidebar--squeeze">
    <h2 class="sidebar--squeeze__intro">
      Real Rates,<br>Real Time.
    </h2>
    <ul class="sidebar--squeeze__list">
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
    <blockquote class="squeeze-sidebar__testimonial">
      I give very high marks to Rate Rabbit. My loan consultant got me locked in when I asked him to and at what turned out to be a very good rate.
      <footer>Rick H, California</footer>
    </blockquote>
  </aside>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

.sidebar--squeeze {
  background-color: $green;
  background: linear-gradient(74.78deg, $green 0%, #BED72A 100%);
  color: $white;
  display: inline-flex;
  flex: 1 0 33.333333%;
  // flex-basis: 444px;
  flex-direction: column;
  max-width: 40%;
  padding: 67px #{$grid-gutter-width} 120px 98px;
  &__intro {
    font-size: 36px;
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 33px;
  }
  &__list {
    line-height: 30px;
    margin-bottom: 33px;
  }
}
</style>
