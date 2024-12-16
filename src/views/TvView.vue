<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";
import { useGenreStore } from "@/stores/genre";

const genreStore = useGenreStore();
const isLoading = ref(false);
const tvShows = ref([]);

const formatDate = (date) => new Date().toLocaleDateString("pt-BR");

onMounted(async () => {
  isLoading.value = true;
  genreStore.getAllGenres("tv");
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
        v-for="genre in genreStore.genres"
        :key="genre.id"
        class="genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }"
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
              :class="{ active: genre_id === genreStore.currentGenreId }"
              >{{ genreStore.getGenreName(genre_id) }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
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
