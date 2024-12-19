<script setup>
import { ref, onMounted } from "vue";
import { useMovieStore } from "@/stores/movie";
import Loading from "vue-loading-overlay";

const movieStore = useMovieStore();
const isLoading = ref(false)

onMounted(async() => {
  isLoading.value = true
  await movieStore.findTrendingMovie()
  isLoading.value = false
})
</script>

<template>
  <loading v-model:active="isLoading" is-full-page />
  <div class="trending-movie" v-if="movieStore.trendingMovie">
    <img
      :src="`https://image.tmdb.org/t/p/original${movieStore.trendingMovie.backdrop_path}`"
      alt=""
    />
    <div class="infos-wrapper">
      <p class="week-trending">
        <i class="fa-solid fa-fire"></i> Outstanding of the week
      </p>
      <h1>{{ movieStore.trendingMovie.title }}</h1>
      <p class="banner-rate">
        <span><img class="imdb" src="../assets/imdb.png" alt="" /></span>
        {{ movieStore.trendingMovie.vote_average }}/10
      </p>
      <p>{{ movieStore.trendingMovie.overview }}</p>
    </div>
  </div>
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
  object-fit: cover;
}

.infos-wrapper {
  position: absolute;
  top: 20%;
  margin: auto 100px;
  width: 400px;
  color: white;
  text-shadow: 3px 3px 2px rgba(19, 19, 19, 0.219);
}

.infos-wrapper h1 {
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.banner-rate {
  display: flex;
  align-items: center;
  height: 30px;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.banner-rate span {
  display: flex;
  filter: brightness(1.8);
  align-items: center;
}

.imdb {
  width: 40px !important;
  height: 20px !important;
}
</style>
