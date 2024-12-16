<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";

const isLoading = ref(false);
const genres = ref([]);
const tvShows = ref([]);

const formatDate = (date) => new Date().toLocaleDateString('pt-BR')

onMounted(async () => {
  const response = await api.get("genre/tv/list?language=pt-BR");
  genres.value = response.data.genres;
});

function getGenreName(id) {
  const genre = genres.value.find((genre) => genre.id === id);
  return genre.name;
}

const listTvShows = async (genreId) => {
  isLoading.value = true;
  const response = await api.get("discover/tv", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  tvShows.value = response.data.results;
  isLoading.value = false;
};
</script>

<template>
  <main>
    <h1>Tv Show Genres</h1>
    <ul>
      <loading v-model:active="isLoading" is-full-page />
      <li
        @click="listTvShows(genre.id)"
        v-for="genre in genres"
        :key="genre.id"
      >
        {{ genre.name }}
      </li>
    </ul>
    <div class="tv-list">
      <div class="tv-card" v-for="tvShow in tvShows" :key="tvShow.id">
        <img
          :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`"
          :alt="tvShow.title"
        />
        <div class="tv-details">
          <p class="tv-title">{{ tvShow.name }}</p>
          <p class="tv-release-date">{{ formatDate(tvShow.first_air_date) }}</p>
          <p class="tv-genres">
            <span
              v-for="genre_id in tvShow.genre_ids"
              :key="genre_id"
              @click="listTvShows(genre_id)"
              >{{ getGenreName(genre_id) }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
