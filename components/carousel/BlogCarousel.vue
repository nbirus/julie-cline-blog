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
            <h1 v-html="blog.section"></h1>            
          </div>

          <div class="blog-container">
            <h2 v-html="blog.title"></h2>
            <h3 v-html="blog.description"></h3>
            <button class="button">READ POST</button>
          </div>

          <!-- text-box -->
          <div class="text-container" v-if="false">
            <div class="text">
              <h1 v-html="blog.section"></h1>
              <h2 v-html="blog.title"></h2>
              <h3 v-html="blog.description"></h3>
              <button class="button">READ POST</button>
            </div>
          </div>
        
        </nuxt-link>
      </div>

      <!-- Next and previous buttons -->
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>

    </div>

    <!-- The dots/circles -->
    <div class="dots" >
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
    slideInterval = setInterval(() => {
      this.plusSlides(1)
    }, 5000);
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
  left: 12rem; top: 14rem;
  
  h1 {
    background-color: fade-out(black, .8);
    color: white;
    padding: .5rem 1rem;
    font-family: $font-family-blog;
    font-size: 1.6rem;
    display: block;
    width: auto;
    margin-bottom: 6rem;
    text-transform: uppercase;
    transform: translateY(-3rem);
  }
}
.blog-container {
  position: absolute;
  top: 4rem;
  width: 100%; height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
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
  }
  h3 {
    letter-spacing: -1px;
    display: block;
    color: white;
    font-weight: $regular;
    font-size: 2rem;
    position: relative;
    margin-bottom: 0;
    opacity: .85;
  }
}
.carousel {
  height: 70vh;
  overflow: hidden;
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
  background-color: darken($primary, 30);
  margin-top: 6rem;
  letter-spacing: 2px;
  // border: solid 2px white;
  padding: 2rem 4rem 1.75rem;
  height: auto;
  font-size: 1.5rem;
  font-weight: 100;
  border-radius: 50px;
  width: 220px;

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
  background-color: fade-out($primary, .075);
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
  margin-top: 2rem;
  border: solid thin red;
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
