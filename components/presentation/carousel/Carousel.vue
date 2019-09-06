<template>
  <div class="carousel">
    <div class="swiper" v-swiper:swiper="options">
      <div class="swiper-wrapper">
        <div class="blog-container swiper-slide" v-for="(blog, index) in blogs" :key="index">

          <div class="blog-container__arrows"></div>
          <div class="blog-container__image-container">
            <ImageResponsive class="img" width="100%" :imageURL="`blog/${blog.id}/_main.jpg`" :alt="blog.title" />
            <div class="overlay"></div>
            <div class="overlay2"></div>
          </div>
          <div class="blog-container__content">
            <div class="flex">
              <h2 v-html="blog.title"></h2>
              <h3 v-html="blog.description"></h3>
              <nuxt-link 
                :to="localePath({ name: 'blog-slug', params: { slug: `${blog.section}/${blog.name}` }})"
              >
                <button class="btn">READ POST</button>
              </nuxt-link>
            </div>
          </div>
          <div class="blog-container__tags"></div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'carousel',
  props: {
    blogs: Array
  },
  beforeMount () {
    if (process.client) {
      require('swiper/dist/css/swiper.css')
      const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
      Vue.use(VueAwesomeSwiper)
    }
  },
  data() {
    return {
      options: {
        slidesPerView: 'auto',
        loop: true,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/base/_fonts.scss';

.carousel {
  max-width: 1600px;
  margin: 0 auto;
}

.blog-container {
  height: 750px;
  overflow: hidden;

  &__image-container {
    position: relative;
    width: 100%;
    height: 750px;
    opacity: .9;

    .img {
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      transform: translateY(-50%);
    }
    .overlay2 {
      position: absolute;
      top: 0; left: 0; 
      width: 100%; height: 100%;
      background-color: fade-out(black, .2);
      box-shadow: inset 0 0 7rem 1rem fade-out(black, .95);
    }
    .overlay {
      position: absolute;
      top: 0; left: 0; 
      width: 100%; height: 100%;
      background-color: fade-out(darken($primary, 5), .8);
      box-shadow: inset 0 0 7rem 1rem fade-out(black, .95);

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: $primary;
        animation: carousel-progress 10s linear;
      }
    }
  }
  &__content {
    height: 100%; width: 100%;
    position: absolute;
    top: 0;
    padding: 0 5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    h2 {
      color: white;
      font-size: 48px;
      font-family: $font-family-blog;
      padding: 0;
      text-shadow: 0 0 3px fade-out(black, .5)
    }
    h3 {
      color: white;
      font-size: 18px;
      font-weight: 300;
      max-width: 900px;
      padding: 0;
    }
    button {
      margin-top: 8rem;
      border-radius: 3px;
      width: 275px;
      height: auto;
      padding: 1.5rem 0 1.35rem;
      letter-spacing: 2px;
    }
  }
}
</style>