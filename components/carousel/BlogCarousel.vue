<template>
  <div class="carousel">


    <!-- Slideshow container -->
    <div class="slideshow-container">

      <!-- Full-width images with number and caption text -->
      <div class="mySlides" v-for="(blog, index) in blogs" :key="index">
            <nuxt-link 
      :to="localePath({ name: 'blog-slug', params: { slug: `${blog.section}/${blog.name}` }})"
    >
        <div class="img-container">
          <ImageResponsive
            class="img"
            :imageURL="`blog/${blog.id}/_main.jpg`"
            alt="Julie Cline Logo"
            width="100%"
          />
        </div>

        <div class="text-container">
          <div class="text">
            <h2 v-html="blog.title"></h2>
            <h3 v-html="blog.date"></h3>
          </div>
        </div>
    </nuxt-link>

      </div>

      <!-- Next and previous buttons -->
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>

    </div>

    <!-- The dots/circles -->
    <div style="text-align:center" class="dots" >
      <span 
        v-for="(blog, index) in blogs" 
        :key="`t-${index}`"
        class="dot" 
        @click="currentSlide(index)"
      />
    </div>


  </div>
</template>

<script>
export default {
  name: 'carousel',
  props: {
    blogs: {
      type: Array
    }
  },
  data() {
    return {
      slideIndex: 0,
    }
  },
  mounted() {
    this.plusSlides(0)
  },
  methods: {
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    },
    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    },
    showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {this.slideIndex = 1} 
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none"; 
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex-1].style.display = "block"; 
      dots[this.slideIndex-1].className += " active";
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/base/_fonts.scss';

.carousel {
  height: 70vh;
  overflow: hidden;
}
.img-container {
  width: 100%;
  height: 70vh;
  position: relative;
}
.text-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100%;
}

/* Slideshow container */
.slideshow-container {
  position: relative;
  height: 100%;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  background-color: fade-out(black, .15);
  color: white;
  font-size: 2rem;
  padding: 3rem 3rem;
  width: 400px;
  text-align: center;
  font-weight: $bold;

  h2 {
    color: white;
    padding-bottom: 0;
    font-family: $font-family-blog;
  }
  h3 {
    font-weight: $regular;
    font-size: $fs-h6;
    position: relative;

    &:before {
      content: "";
      background-color: fade-out(#fff, .5);
      height: 1px;
      width: 50px;
      position: absolute;
      left: 4rem;
      top: 1rem;
    }
    &:after {
      content: "";
      background-color: fade-out(#fff, .5);
      height: 1px;
      width: 50px;
      position: absolute;
      right: 4rem;
      top: 1rem;
    }
  }
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dots {
  margin-top: 2rem;
}
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}


.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}
</style>
