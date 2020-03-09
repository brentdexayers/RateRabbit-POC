<template>
  <section class="section--testimonials">
    <div class="container-start section--testimonials__container-left">
      <vue-glide
        :per-view="1"
        :autoplay="10000"
      >
        <vue-glide-slide
          v-for="(testimonial, index) in featuredTestimonials"
          :key="index"
        >
          <blockquote
            :data-testimonial-index="index"
            class="primary"
          >
            {{ testimonial.content }}
            <footer>
              {{ testimonial.citation }}
            </footer>
          </blockquote>
        </vue-glide-slide>
        <template slot="control">
          <button data-glide-dir="<">
            <img src="~assets/icons/icon-chevron-left.png" alt="Previous">
          </button><button data-glide-dir=">">
            <img src="~assets/icons/icon-chevron-right.png" alt="Next">
          </button>
        </template>
      </vue-glide>
    </div>
    <div class="section--testimonials__container-right">
      <img src="~assets/images/testimonials/testimonial-1.png" class="testimonial-image img-fluid">
    </div>
  </section>
</template>

<script>
/*
 * See `Glide JS` documentation here: https://glidejs.com/docs/
 * See `Vue Glide JS` documentation here: https://antonreshetov.github.io/vue-glide/
 */
import { Glide, GlideSlide } from 'vue-glide-js'
import testimonials from '~/mixins/testimonials.js'

export default {
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  data () {
    return {
      testimonials
    }
  },
  computed: {
    featuredTestimonials () {
      return this.testimonials.filter(function (t) {
        return t.featured
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.section--testimonials {
  background-color: $light;
  // background-image: url(~assets/images/testimonials-bg.jpg);
  background: linear-gradient(180deg, rgba($white,0) 0%, rgba($white,0) calc(100% - 164.01px), rgba($white,1) calc(100% - 164px), rgba($white,1) 100%), url(~assets/images/testimonials-bg.jpg);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  @include media-breakpoint-down('sm') {
    background: url(~assets/images/testimonials-bg.jpg) no-repeat top left, linear-gradient(180deg, rgba($light,1) 0%, rgba($light,1) 100%);
  }
  &__container {
    &-left {
      align-items: center;
      display: flex;
      justify-content: center;
      padding-bottom: 164px;
      @include media-breakpoint-down('sm') {
        padding-bottom: 0;
      }
    }
    &-right {
      max-width: 50%;
      padding-left: 8.333333%;
      padding-top: 150px;
      width: 100%;
      @include media-breakpoint-down('sm') {
        display: none;
      }
    }
  }
  .glide {
    padding-bottom: #{$spacer * 8.75}; // 140px
    padding-top: #{$spacer * 5}; // 80px
    position: unset;
    @include media-breakpoint-down('sm') {
      padding-bottom: #{$spacer * 4}; // 64px
      padding-top: #{$spacer * 4}; // 64px
    }
    &__slides {
      align-items: center;
      @include media-breakpoint-down('sm') {
        align-items: inherit;
      }
    }
    &__slide {
      padding-top: #{$spacer * 1.5};
    }
    [data-glide-el="controls"] {
      bottom: 164px;
      left: 0;
      line-height: 0;
      position: absolute;
      @include media-breakpoint-down('sm') {
        bottom: 0;
        left: auto;
        right: 0;
      }
      button {
        align-items: center;
        background: -moz-linear-gradient(45deg,  rgba($green,1) 0%, rgba($light-green,1) 100%);
        background: -webkit-linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
        background: linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#009646', endColorstr='#9ecd33',GradientType=1 );
        border: none;
        color: $white;
        height: 60px;
        justify-content: center;
        margin: 0;
        padding: 0;
        width: 60px;
        img {
          display: flex;
          margin: auto;
        }
      }
    }
  }
}
</style>
