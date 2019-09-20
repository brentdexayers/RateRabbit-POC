<template>
  <section class="section--testimonials">
    <div class="container-start section--testimonials__container-left">
      <vue-glide
        :per-view="1"
      >
        <vue-glide-slide
          v-for="(testimonial, index) in featuredTestimonials"
          :key="index"
        >
          <blockquote
            class="primary"
            :data-testimonial-index="index"
          >
            {{ testimonial.content }}
            <footer>
              {{ testimonial.citation }}
            </footer>
          </blockquote>
        </vue-glide-slide>
        <template slot="control">
          <button data-glide-dir="<">
            &lt;
          </button><button data-glide-dir=">">
            &gt;
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

.section--testimonials {
  background-color: $light;
  // background-image: url(~assets/images/testimonials-bg.jpg);
  background: linear-gradient(180deg, rgba($white,0) 0%, rgba($white,0) calc(100% - 164.01px), rgba($white,1) calc(100% - 164px), rgba($white,1) 100%), url(~assets/images/testimonials-bg.jpg);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  &__container {
    &-left {
      align-items: center;
      display: flex;
      justify-content: center;
      padding-bottom: 164px;
    }
    &-right {
      max-width: 50%;
      padding-left: 8.333333%;
      padding-top: 150px;
      width: 100%;
    }
  }
  .glide {
    position: unset;
    &__slides {
      align-items: center;
    }
    &__slide {
      padding-top: #{$spacer * 1.5};
    }
    [data-glide-el="controls"] {
      bottom: 164px;
      left: 0;
      position: absolute;
      button {
        background: -moz-linear-gradient(45deg,  rgba($green,1) 0%, rgba($light-green,1) 100%);
        background: -webkit-linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
        background: linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#009646', endColorstr='#9ecd33',GradientType=1 );
        border: none;
        height: 60px;
        width: 60px;
        margin: 0;
        padding: 0;
        color: $white;
      }
    }
  }
}
</style>
