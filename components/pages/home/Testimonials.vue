<template>
  <section class="section--testimonials">
    <div class="container-start section--testimonials__container-left">
      <blockquote class="primary">
        I give very high marks to Rate Rabbit. My loan consultant got me locked in when I asked him to and at what turned out to be a very good rate. The whole process went fast and smooth. I was very pleased and will certainly recommend your firm.
        <footer>Rick H, California</footer>
      </blockquote>
    </div>
    <div class="section--testimonials__container-right">
      <img src="~assets/images/testimonials/testimonial-1.png" class="testimonial-image img-fluid">
    </div>
  </section>
</template>

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
}
</style>
