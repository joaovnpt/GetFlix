<script setup>
import { defineProps, onMounted, ref } from "vue";
import Loading from "vue-loading-overlay";
import { useGenreStore } from "@/stores/genre";
import api from "@/plugins/axios";
import { useTvStore } from "@/stores/tv";

const isLoading = ref(false);
const genreStore = useGenreStore();
const tvStore = useTvStore();
const movies = ref([]);
const tvShowGenresNames = ref([]);
const companiesNames = ref(false);

const props = defineProps({
  tvShowId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  isLoading.value = true;
  await tvStore.getTvShowDetail(props.tvShowId);
  await listGenresById(props.tvShowId);
  genreStore.getAllGenres("tv");
  isLoading.value = false;
});

const listGenresById = async (tvShowId) => {
  // Fiz sozinho ;)
  const response = await api.get(`tv/${tvShowId}`); // lista de objetos com os dados da serie (objetos, listas, numbers...)
  const tvShowGenres = response.data.genres; // tvShowGenres agora é a lista de objetos genres da url a cima (id: 1, name: fantasy...)

  for (const genre of tvShowGenres) {
    const name = genre.name; // pra cada objeto da lista, pega a propriedade name
    tvShowGenresNames.value.push(name); //puxa o nome pra lista, pegando assim todos os generos do filme pelo id
  }
};

const showCompaniesNames = () => {
  companiesNames.value = !companiesNames.value;
};
</script>

<template>
  <main>
    <loading v-model:active="isLoading" is-full-page />
    <div class="content">
      <div class="details">
        <h1>{{ tvStore.currentTvShow.name }}</h1>
        <p class="tagline">{{ tvStore.currentTvShow.tagline }}</p>
        <p class="movie-overview">{{ tvStore.currentTvShow.overview }}</p>
        <hr />
        <div class="movie-infos">
          <p class="movie-rate">
            <i class="imdb-icon"><img src="../assets/imdb.png" alt="" /></i>
            {{ tvStore.currentTvShow.vote_average }}/10
          </p>
          <div>
            <p class="movie-genres">
              <i class="fa-solid fa-masks-theater"></i>
              {{ tvShowGenresNames.join(", ") }}
            </p>
          </div>
          <p class="movie-budget">
            <i class="fa-solid fa-film"></i> {{ tvStore.currentTvShow.number_of_seasons }} seasons
          </p>
          <p class="movie-budget">
            <i class="fa-solid fa-clapperboard"></i> {{ tvStore.currentTvShow.number_of_episodes }} episodes
          </p>
          <div class="companies">
            <p @click="showCompaniesNames" class="company-icon">
              <i class="fa-solid fa-building"></i> Companies
            </p>
            <div
              class="companies-names"
              v-for="company in tvStore.currentTvShow.production_companies"
              :key="company.id"
            >
              <p v-if="companiesNames">{{ company.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="movie-poster">
        <img
          :src="`https://image.tmdb.org/t/p/w500${tvStore.currentTvShow.poster_path}`"
          :alt="tvStore.currentTvShow.name"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
p {
  font-weight: 300;
}
i {
  font-size: 1.5rem;
}
hr {
  width: 600px;
  border-color: rgb(194, 194, 194);
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 110px 100px 100px 100px;
}

.details {
  margin-top: 100px;
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.details h1 {
  font-size: 4rem;
}

.tagline {
  font-style: italic;
  font-size: 1.5rem;
}

.movie-overview {
  width: 600px;
  color: rgb(150, 150, 150);
  margin-bottom: 15px;
}

.movie-infos {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.movie-rate,
.movie-genres,
.movie-budget {
  display: flex;
  align-items: center;
  gap: 10px;
}

.imdb-icon {
  height: 23px;
  display: flex;
  align-items: center;
}

.imdb-icon img {
  width: 3rem;
  height: 1.5rem;
}

.company-icon {
  width: fit-content;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.company-icon:hover {
  filter: brightness(0.6);
}

.company-icon i {
  margin-right: 10px;
}

.movie-poster img {
  margin: auto 0;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
