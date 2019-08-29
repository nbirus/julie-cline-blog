<template>
  <div class="container header" ref="header">

    <div class="logo">
      <ImageResponsive
        class="img"
        imageURL="logo.png"
        alt="Julie Cline Logo"
        width="100%"
      />
    </div>

    <div class="fixed-container" :class="{ fixed }">

      <div class="fixed-logo" v-if="fixed">
        <ImageResponsive
          class="fixed-img"
          imageURL="logo.png"
          alt="Julie Cline Logo"
          width="100%"
        />
      </div>

      <ul class="routes">
        <li><nuxt-link class="route" to="/">HOME</nuxt-link></li>
        <li><nuxt-link class="route" to="/about">ABOUT</nuxt-link></li>
        <li><nuxt-link class="route" to="/lately">LATELY</nuxt-link></li>
        <li><nuxt-link class="route" to="/art">ART</nuxt-link></li>
        <li><nuxt-link class="route" to="/travel">TRAVEL</nuxt-link></li>
        <li><nuxt-link class="route" to="/a-day-in-the-life">A DAY IN THE LIFE</nuxt-link></li>
      </ul>

    </div>

    
  </div>
</template>

<script>
export default {
  name: 'app-header',
data: function () {
    return {
      fixed: false
    }
  },
  methods: {
    handleScroll () {
      this.fixed = window.scrollY >= 200
    }
  },
  created () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeUpdate () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
}

</script>

<style lang="scss">

@import '@/assets/css/base/_fonts.scss';
@import '@/assets/css/utilities/_variables.scss';
@import '@/assets/css/utilities/_keyframes.scss';

.header {
  padding-top: 7rem;
  padding-bottom: 7rem;
}
.logo {
  margin-bottom: 5rem;

  .img {
    width: 250px;
    margin: 0 auto;
  }
}
.routes {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  li {
    margin: 0 3rem;
  }
}
.fixed-container {
  background-color: $background-primary;
  transition: padding .5s ease;

  &.fixed {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding: 3rem 0 3rem;
  }
}
.fixed-logo {
  position: absolute;
  width: 150px;
  left: 5rem;
  margin-top: -1rem;

  animation: top-down .5s ease;
}
.route {
  position: relative;
  font-size: $fs-h5;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 3px;
    transition: 1s ease width;
    width: 0;
    background-color: $primary;
  }
} 
.route:not(.nuxt-link-exact-active) {
  color: $font-color;
  font-weight: $regular;
  
  &:hover {
    color: $primary;
  }
}
.route.nuxt-link-exact-active {
  font-weight: $bold;

  &:after {
    width: 100%;
  }
}
</style>
