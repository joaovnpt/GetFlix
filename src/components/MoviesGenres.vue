<script setup>
import { onMounted, ref } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Loading from "vue-loading-overlay";
import { useRouter } from "vue-router";
import { useGenreStore } from "@/stores/genre";
import api from "@/plugins/axios";

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);
const movies = ref([]);

onMounted(async () => {
  isLoading.value = true;
  genreStore.getAllGenres("movie");
  isLoading.value = false;
});

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get("discover/movie", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};

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
  <h1>Movies Genres</h1>
  <loading v-model:active="isLoading" is-full-page />
  <Carousel v-bind="carouselConfig" :items-to-show="10" :loop="true" class="genres-carousel">
    <Slide
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listMovies(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      {{ genre.name }}
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>

  <Carousel v-bind="carouselConfig" class="genres-movies-carousel" :items-to-show="6">
    <Slide v-for="movie in movies" :key="movie.id" class="carousel-slide">
      <img
        :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
        alt=""
        class="popular-movie-poster"
        @click="openMovie(movie.id)"
      />
      <div class="carousel-infos">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-rate">
          <img src="../assets/imdb.png" alt="" />{{ movie.vote_average }}/10
        </p>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped>
h1 {
  margin: 0 100px 50px 100px;
}

.genres-carousel {
  margin: 0 auto 50px auto;
  width: 88vw;
}

.genre-item {
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #fff;
  margin: 0 1rem 0 1rem;
  height: 30px;
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

/* Movies carousel */

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
