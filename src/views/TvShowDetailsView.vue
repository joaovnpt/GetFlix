<script setup>
import { defineProps, onMounted } from "vue";
import { useTvStore } from "@/stores/tv";

const tvStore = useTvStore();

const props = defineProps({
  tvShowId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await tvStore.getTvShowDetail(props.tvShowId);
});
</script>

<template>
  <main>
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTvShow.poster_path}`"
        :alt="tvStore.currentTvShow.name"
      />

      <div class="details">
        <h1>Serie: {{ tvStore.currentTvShow.name }}</h1>
        <p>{{ tvStore.currentTvShow.tagline }}</p>
        <p>{{ tvStore.currentTvShow.overview }}</p>
        <p>Seasons: {{ tvStore.currentTvShow.number_of_seasons }}</p>
        <p>Episodes: {{ tvStore.currentTvShow.number_of_episodes }}</p>
        <p>Rate: {{ tvStore.currentTvShow.vote_average }}</p>
      </div>
    </div>
  </main>

  <div class="companies">
    <template
      v-for="company in tvStore.currentTvShow.production_companies"
      :key="company.id"
    >
      <p>Produtora</p>
      <img
        v-if="company.logo_patch"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
</template>

<style scoped>
.companies {
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
