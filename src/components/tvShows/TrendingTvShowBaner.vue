<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import { useTvStore } from "@/stores/tv";

const router = useRouter()
const tvStore = useTvStore()
const isLoading = ref(false)

onMounted(async() => {
  isLoading.value = true
  await tvStore.findTrendingTvShow()
  isLoading.value = false
})

function openTvShow(tvShowId) {
  router.push({ name: "TvShowDetails", params: { tvShowId } });
}
</script>

<template>
  <loading v-model:active="isLoading" is-full-page />
  <div class="trending-movie" v-if="tvStore.trendingTvShow">
    <img
      :src="`https://image.tmdb.org/t/p/original${tvStore.trendingTvShow.backdrop_path}`"
      alt=""
    />
    <div class="infos-wrapper">
      <p class="week-trending">
        <i class="fa-solid fa-fire"></i> Outstanding of the week
      </p>
      <h1>{{ tvStore.trendingTvShow.name }}</h1>
      <p class="banner-rate">
        <span><img class="imdb" src="../../assets/imdb.png" alt="" /></span>
        {{ tvStore.trendingTvShow.vote_average }}/10
      </p>
      <p>{{ tvStore.trendingTvShow.overview }}</p>
      <button @click="openTvShow(tvStore.trendingTvShow.id)" class="show-details-button">Show details</button>
    </div>
  </div>
</template>

<style scoped>
.trending-movie {
  position: relative;
  width: fit-content;
  display: inline-block;
}

.trending-movie img {
  filter: brightness(0.5);
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trending-movie::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, #1e1e1e 100%);
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

.show-details-button {
  margin-top: 1rem;
  width: 120px;
  height: 35px;
  background-color: #fff;
  color: #1e1e1e;
  border: 0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1rem;
  transition: 300ms ease;
  z-index: 1000;
  position: absolute;
}

.show-details-button:hover {
  background-color: #d1d1d1;
  cursor: pointer;
}
</style>
