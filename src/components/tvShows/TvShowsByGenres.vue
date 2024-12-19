<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
//Stores
import { useTvStore } from "@/stores/tv";

const router = useRouter()
const isLoading = ref(false)
const tvStore = useTvStore()

function openTvShow(tvShowId) {
  router.push({ name: "TvShowDetails", params: { tvShowId } });
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
    <Slide v-for="tvShow in tvStore.tvShows.value" :key="tvShow.id" class="carousel-slide">
      <img
        :src="`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`"
        alt=""
        class="movie-poster"
        @click="openTvShow(tvShow.id)"
      />
      <div class="carousel-infos">
        <p class="movie-title">{{ tvShow.name }}</p>
        <p class="movie-rate">
          <img src="../../assets/imdb.png" alt="" />{{ tvShow.vote_average }}/10
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

.movie-poster {
  cursor: pointer;
  box-shadow: 0 5px 5px #00000041;
  transition: 250ms ease;
  border-radius: 5px;
}

.movie-poster:hover {
  transform: scale(1.06);
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