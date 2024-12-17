<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";
import { useGenreStore } from "@/stores/genre";
import { useMovieStore } from "@/stores/movie";
import NavbarComponent from "@/components/NavbarComponent.vue";

const movieStore = useMovieStore();
const router = useRouter();
const genreStore = useGenreStore();
const isLoading = ref(false);
const movies = ref([]);

const formatDate = (date) => new Date().toLocaleDateString("pt-BR");

onMounted(async () => {
  isLoading.value = true;
  genreStore.getAllGenres("movie");
  movieStore.findPopularMovies();
  movieStore.findTrendingMovie();
  isLoading.value = false;
});

function openMovie(movieId) {
  console.log(movieId);
  router.push({ name: "MovieDetails", params: { movieId } });
}

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
</script>

<template>
  <main>
    <div class="trending-movie" v-if="movieStore.trendingMovie">
      <img :src="`https://image.tmdb.org/t/p/original${movieStore.trendingMovie.backdrop_path}`" alt="">
      <div class="infos-wrapper">
        <h1>Title</h1>
        <p>Rate</p>
        <p>Description</p>
      </div>
    </div>
    <h1>Movies Genres</h1>
    <ul>
      <loading v-model:active="isLoading" is-full-page />
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        @click="listMovies(genre.id)"
        class="genre-item"  
        :class="{ active: genre.id === genreStore.currentGenreId }"
      >
        {{ genre.name }}
      </li>
    </ul>
    <div class="popular-movies">
      <h1>Popular movies</h1>
      <carousel :items-to-show="5">
        <slide
          v-for="movie in movieStore.popularMovies"
          :key="movie.id"
          class="popular-movies"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
            alt=""
          />
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
    </div>
    <div class="movie-list">
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          @click="openMovie(movie.id)"
        />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span
              v-for="genre_id in movie.genre_ids"
              :key="genre_id"
              @click="listMovies(genre_id)"
              :class="{ active: genre_id === genreStore.currentGenreId }"
              >{{ genreStore.getGenreName(genre_id) }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.trending-movie {
  position: relative;
  width: fit-content;
}

.trending-movie img {
  filter: brightness(0.5);
  height: 100%;
  width: 100%;
}

.infos-wrapper {
  position: absolute;
  top: 20%;
  margin-left: 100px;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
