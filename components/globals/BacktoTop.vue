<template>
  <button
    :class="classes"
    @click.prevent="scrollToTop"
    class="button--back-to-top"
  >
    <img src="~assets/icons/icon-chevron-left.png" alt="Back to top" class="icon scroll-to-top__icon">
  </button>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: ''
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.scrollButtonShow)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollButtonShow)
  },
  methods: {
    scrollToTop (event) {
      window.scrollTo(0, 0)
      document.body.focus()
    },
    scrollButtonShow () {
      const btn = document.getElementsByClassName('button--back-to-top')
      const top = window.scrollY
      if (top > 200) {
        btn[0].classList.add('show')
      } else {
        btn[0].classList.remove('show')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

.button {
  &--back-to-top {
    align-items: center;
    background: -moz-linear-gradient(45deg,  rgba($green,1) 0%, rgba($light-green,1) 100%);
    background: -webkit-linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
    background: linear-gradient(45deg,  rgba($green,1) 0%,rgba($light-green,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#{$green}', endColorstr='#{$light-green}',GradientType=1 );
    border: none;
    border-radius: 50%;
    bottom: $spacer;
    color: $white;
    visibility: hidden;
    height: 60px;
    justify-content: center;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: fixed;
    right: $spacer;
    transition: visibility 0s, $transition-fade;
    width: 60px;
    z-index: 90001;
    &.show {
      visibility: visible;
      opacity: 0.333;
      &:hover {
        opacity: 1;
      }
    }
    img {
      display: flex;
      margin: auto;
      transform: rotate(90deg);
    }
  }
}

</style>
