<template>
  <div class="page-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui. Duis rhoncus velit nec est condimentum feugiat. Donec aliquam augue nec gravida lobortis. Nunc arcu mi, pretium quis dolor id, iaculis euismod ligula. Donec tincidunt gravida lacus eget lacinia.
    </p>
    <p>
      Cras et dui mollis, tempus velit placerat, sodales tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque et venenatis sapien. <a href="#">This is a link sample</a> maecenas sem diam, lacinia in ipsum et, fermentum rutrum lacus.
    </p>
    <nuxt-link to="#" class="link-decorated">
      Another Link Example
    </nuxt-link>
    <h2>
      Sample Header
    </h2>
    <p>
      Nulla facilisis, arcu ac facilisis tincidunt, tortor est congue ligula, eu adipiscing quam ligula ut purus. Suspendisse at gravida dolor. Vestibulum eget odio in massa luctus imperdiet. Donec consequat orci a diam pellentesque mollis.
    </p>
    <h3>
      Another Sample Header
    </h3>
    <p>
      Nulla facilisis, arcu ac facilisis tincidunt, tortor est congue ligula, eu adipiscing quam ligula ut purus. Suspendisse at gravida dolor. Vestibulum eget odio in massa luctus imperdiet. Donec consequat orci a diam pellentesque mollis.
    </p>
    <ul>
      <li>
        Nulla facilisis arcu
      </li>
      <li>
        Suspendisse at gravida dolor. Vestibulum eget odio in massa luctus imperdiet. Donec consequat orci a diam pellentesque mollis.
      </li>
      <li>
        Tortor est congue ligula
      </li>
      <li>
        Adipiscing quam ligula ut purus
      </li>
      <li>
        Suspendisse at gravida dolor
      </li>
    </ul>
    <div class="box">
      <h2 class="box__title">
        Box Highlight
      </h2>
      <p class="box__body">
        Can swap header, button, can copy styles here nulla facilisis, arcu ac facilisis tincidunt, tortor est congue ligula, eu adipiscing quam ligula ut purus. Suspendisse at gravida dolor. Vestibulum eget odio in massa luctus imperdiet. Donec consequat orci a diam pellentesque mollis.
      </p>
      <nuxt-link to="#" class="link-decorated">
        Another Link Example
      </nuxt-link>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="box">
          <h3 class="box__title">
            Box Highlight (1/2)
          </h3>
          <p class="box__body">
            Can swap header, button, can copy styles here nulla facilisis, arcu ac facilisis tincidunt, tortor est congue ligula, eu adipiscing quam ligula ut purus. Suspendisse at gravida dolor. Vestibulum eget odio in massa luctus imperdiet. Donec consequat orci a diam pellentesque mollis.
          </p>
          <nuxt-link to="#" class="link-decorated">
            Link Text
          </nuxt-link>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="box">
          <h3 class="box__title">
            Box Highlight (2/2)
          </h3>
          <p class="box__body">
            Can swap header, button, can copy styles here nulla facilisis, arcu ac facilisis tincidunt, tortor est congue ligula, eu adipiscing quam ligula ut purus. Suspendisse at gravida dolor. Vestibulum eget odio in massa luctus imperdiet. Donec consequat orci a diam pellentesque mollis.
          </p>
          <nuxt-link to="#" class="link-decorated">
            Link Text
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="w-100" style="height: 40px;" />
    <blockquote class="primary">
      I give very high marks to Rate Rabbit. My loan consultant got me locked in when I asked him to and at what turned out to be a very good rate. The whole process went fast and smooth. I was very pleased and will certainly recommend your firm.
      <footer>Rick H, California</footer>
    </blockquote>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  layout: 'default',
  components: {
    // Logo
  },
  data () {
    return {
      title: 'Our Track Record'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Our track record' }
      ]
    }
  }
}
</script>

<style>
</style>
