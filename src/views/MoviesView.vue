<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";

const isLoading = ref(false);
const genres = ref([]);
const movies = ref([]);

const formatDate = (date) => new Date().toLocaleDateString('pt-BR')

onMounted(async () => {
  const response = await api.get("genre/movie/list?language=pt-BR");
  genres.value = response.data.genres;
});

function getGenreName(id) {
  const genre = genres.value.find((genre) => genre.id === id);
  return genre.name;
}

const listMovies = async (genreId) => {
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
    <h1>Movies Genres</h1>
    <ul>
      <loading v-model:active="isLoading" is-full-page />
      <li v-for="genre in genres" :key="genre.id" @click="listMovies(genre.id)">
        {{ genre.name }}
      </li>
    </ul>
    <div class="movie-list">
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span
              v-for="genre_id in movie.genre_ids"
              :key="genre_id"
              @click="listMovies(genre_id)"
              >{{ getGenreName(genre_id) }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
