<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import { useMovieStore } from "@/stores/movie";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const router = useRouter()
const movieStore = useMovieStore()
const isLoading = ref(false)

function openMovie(movieId) {
  router.push({ name: "MovieDetails", params: { movieId } });
}

const carouselConfig = {
  itemsToShow: 3.95,
  wrapAround: true,
  transition: 400,
};
</script>

<template>
    <loading v-model:active="isLoading" is-full-page />
    <Carousel v-bind="carouselConfig" class="genres-movies-carousel" :items-to-show="6">
    <Slide v-for="movie in movieStore.movies.value" :key="movie.id" class="carousel-slide">
      <img
        :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
        alt=""
        class="popular-movie-poster"
        @click="openMovie(movie.id)"
      />
      <div class="carousel-infos">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-rate">
          <img src="../../assets/imdb.png" alt="" />{{ movie.vote_average }}/10
        </p>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped>
.genres-movies-carousel {
  margin: 0 auto 50px auto;
  width: 88vw;
}

.carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  color: black;
  padding: 1rem;
  text-align: start;
}

.popular-movie-poster {
  cursor: pointer;
  box-shadow: 0 5px 5px #00000041;
  transition: 300ms ease-in-out;
  border-radius: 5px;
}

.popular-movie-poster {
  transform: scale(1.02);
}

.carousel-infos {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-top: 1rem;
  width: 200px;
  overflow: hidden;
}

.movie-title {
  font-weight: 500;
}

.movie-rate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.movie-rate img {
  width: 28px;
}
</style>