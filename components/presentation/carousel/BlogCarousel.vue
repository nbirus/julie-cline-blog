<template>
  <div class="carousel">


    <!-- Slideshow container -->
    <div class="slideshow-container">

      <!-- Full-width images with number and caption text -->
      <div class="mySlides" v-for="(blog, index) in blogs" :key="index">
        <nuxt-link 
          :to="localePath({ name: 'blog-slug', params: { slug: `${blog.section}/${blog.name}` }})"
        >
          <!-- bg img -->
          <div class="img-container">
            <ImageResponsive
              class="img"
              :imageURL="`blog/${blog.id}/_main.jpg`"
              alt="Julie Cline Logo"
              width="100%"
            />
            <div class="img-overlay"></div>
          </div>
            <div class="tag-container">
              <h1 class="font" v-html="blog.section"></h1>            
              <h1 v-html="blog.date"></h1>            
            </div>
          <div class="blog-container">
            <h2 v-html="blog.title"></h2>
            <h3 v-html="blog.description"></h3>

            <button class="button">READ POST</button>
          </div>
        </nuxt-link>
      </div>

      <!-- Next and previous buttons -->
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>

    </div>

    <!-- The dots/circles -->
    <div class="dots">
      <span 
        v-for="(blog, index) in blogs" 
        :key="`t-${index}`"
        class="dot" 
        @click="currentSlide(index + 1)"
      />
    </div>


  </div>
</template>

<script>

let slideInterval = undefined

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
    this.resetInterval()
  },
  methods: {
    resetInterval() {
      clearInterval(slideInterval)
      slideInterval = setInterval(() => {
        this.plusSlides(1)
      }, 10000);
    },
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
          slides[i].classList.remove('slide-active')
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex-1].style.display = "block"; 
      slides[this.slideIndex-1].classList.add('slide-active')
      dots[this.slideIndex-1].className += " active";
    }
  },
  watch: {
    'slideIndex': 'resetInterval'
  },
  beforeDestroy() {
    clearInterval(slideInterval)
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/base/_fonts.scss';

.slide-active .img {
  animation: carousel .5s ease;
}
.img {
  animation: carousel-leave .5s ease;
}
.tag-container {
  position: absolute;
  top: 6rem;
  right: 6rem;
  display: flex;

  h1 {
    background-color: fade-out(black, .8);
    color: white;
    padding: .65rem 1rem .5rem;
    font-size: 1.6rem;
    display: block;
    width: auto;
    text-transform: uppercase;
    transform: scale(.9);
  }
  .font {
    // font-family: $font-family-blog;
    font-weight: $bold;
  }
}
.blog-container {
  position: absolute;
  top: 0;
  width: 100%; height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20rem 12rem 6rem;
  padding: 0 12rem;

  h2 {
    color: $primary;
    color: white;
    padding-bottom: 0;
    font-family: $font-family-blog;
    font-size: 4.5rem;
    display: block;
    width: auto;
    letter-spacing: -1px;
    text-shadow: 0 0 5px fade-out(black, .25);
  }
  h3 {
    letter-spacing: -1px;
    display: block;
    color: white;
    font-weight: $regular;
    font-size: 2rem;
    position: relative;
    margin-bottom: 0;
    text-shadow: 0 0 3px fade-out(black, .25);
  }
}
.carousel {
  height: 70vh;
  max-width: 1600px;
  min-height: 600px;
  max-height: 800px;
  margin: 0 auto;
}
.img-container {
  width: 100%;
  height: 70vh;
  min-height: 600px;
  max-height: 800px;
  position: relative;
}
.button {
  background-color: darken($primary, 10);
  margin-top: 6rem;
  letter-spacing: 2px;
  // border: solid 2px white;
  padding: 2rem 4rem 1.75rem;
  height: auto;
  font-size: 1.5rem;
  font-weight: 100;
  border-radius: 50px;
  width: 250px;
  display: none;

  &:hover {
    background-color: fade-out(white, .75);
  }
}
.img {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100%;
}
.img-overlay {
  position: absolute;
  height: 100%; width: 100%;
  background-color: fade-out(darken($primary, 35), .15);
  box-shadow: inset 0 0 3rem 1rem fade-out(black, .8);

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 5px;
    background-color: darken($primary, 5);
    animation: carousel-progress 10s;
  }

  &:hover {
  }
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
  margin-top: 3rem;
  text-align: center;
  position: relative;
}
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 8px;
  background-color: fade-out($n1, .5);
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}


.active, .dot:hover {
  background-color: $primary;
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
