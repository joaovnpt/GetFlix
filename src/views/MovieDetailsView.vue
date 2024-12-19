<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useMovieStore } from "@/stores/movie";
import Loading from "vue-loading-overlay";
import { useGenreStore } from "@/stores/genre";
import api from "@/plugins/axios";

const isLoading = ref(false);
const genreStore = useGenreStore();
const movieStore = useMovieStore();
const movies = ref([]);
const movieGenreNames = ref([]);
const companiesNames = ref(false);

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  isLoading.value = true;
  await movieStore.getMovieDetail(props.movieId);
  await listGenresById(props.movieId);
  genreStore.getAllGenres("movie");
  isLoading.value = false;
});

const listGenresById = async (movieId) => {
  // Fiz sozinho ;)
  const response = await api.get(`movie/${movieId}`); // lista de objetos com os dados do filme (objetos, listas, numbers...)
  const movieGenres = response.data.genres; // movieGenres agora é a lista de objetos genres da url a cima (id: 1, name: fantasy...)

  for (const genre of movieGenres) {
    const name = genre.name; // pra cada objeto da lista, pega a propriedade name
    movieGenreNames.value.push(name); //puxa o nome pra lista, pegando assim todos os generos do filme pelo id
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
        <h1>{{ movieStore.currentMovie.title }}</h1>
        <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
        <p class="movie-overview">{{ movieStore.currentMovie.overview }}</p>
        <hr>
        <div class="movie-infos">
          <p class="movie-rate">
            <i class="imdb-icon"><img src="../assets/imdb.png" alt="" /></i>
            {{ movieStore.currentMovie.vote_average }}/10
          </p>
          <div>
            <p class="movie-genres">
              <i class="fa-solid fa-masks-theater"></i>
              {{ movieGenreNames.join(", ") }}
            </p>
          </div>
          <p class="movie-budget">
            <i class="fa-solid fa-coins" /> ${{
              movieStore.currentMovie.budget
            }},00
          </p>
          <div class="companies">
            <p @click="showCompaniesNames" class="company-icon">
              <i class="fa-solid fa-building"></i> Companies
            </p>
            <div
              class="companies-names"
              v-for="company in movieStore.currentMovie.production_companies"
              :key="company.id"
            >
              <p v-if="companiesNames">{{ company.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="movie-poster">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movieStore.currentMovie.poster_path}`"
          :alt="movieStore.currentMovie.title"
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
  color: rgb(150, 150, 150);
  margin-bottom: 15px;
}

.movie-infos {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.movie-rate, .movie-genres, .movie-budget {
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
