<script setup>
import { onMounted, ref } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Loading from "vue-loading-overlay";
//Stores/Plugins
import api from "@/plugins/axios";
import { useTvStore } from "@/stores/tv";
import { useGenreStore } from "@/stores/genre";
//Components
import TvShowsByGenres from "./TvShowsByGenres.vue";

const isLoading = ref(false);
const tvStore = useTvStore()
const genreStore = useGenreStore();

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres("tv");
  isLoading.value = false;
});

const listTvShows = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get("discover/tv", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  tvStore.tvShows.value = response.data.results;
  isLoading.value = false;
};

const carouselConfig = {
  itemsToShow: 3.95,
  wrapAround: true,
  transition: 400,
};
</script>

<template>
  <h1>Genres</h1>
  <loading v-model:active="isLoading" is-full-page />
  <Carousel
    v-bind="carouselConfig"
    :items-to-show="10"
    :loop="true"
    class="genres-carousel"
  >
    <Slide
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listTvShows(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      <p
        class="carousel-item"
        :class="{ active: genre.id === genreStore.currentGenreId }"
      >
        {{ genre.name }}
      </p>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
  
  <TvShowsByGenres v-if="!genreStore.isGenresEmpty"/>
</template>

<style scoped>
h1 {
  width: fit-content;
  margin: 50px auto;
}

.genres-carousel {
  margin: 0 auto 50px auto;
  width: 88vw;
}
.carousel-item {
  font-size: 14px;
}

.genre-item {
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #fff;
  margin: 0 1rem 0 1rem;
  height: 30px;
  transition: 200ms ease;
}

.genre-name {
  font-size: 12px;
  cursor: pointer;
  transition: 200ms ease-in-out;
  border-radius: 5px;
  padding: 3px;
}

.genre-name:hover {
  background-color: #fff;
  color: #1e1e1e;
}

.active {
  background-color: #fff;
  color: #1e1e1e;
  font-weight: bold;
}

.movie-genres {
  display: flex;
  justify-content: start;
  height: 20px;
  width: fit-content;
}

.movie-genres span.active {
  background-color: #fff;
  color: #000;
  font-weight: bolder;
}
</style>
