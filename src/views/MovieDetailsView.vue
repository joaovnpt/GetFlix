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

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  isLoading.value = true;
  await movieStore.getMovieDetail(props.movieId);
  await listGenresById(props.movieId)
  genreStore.getAllGenres("movie");
  isLoading.value = false;
  console.log(movieGenreNames);
});

const listGenresById = async (movieId) => {
  // Fiz sozinho ;)
  const response = await api.get(`movie/${movieId}`); // lista de objetos com os dados do filme (objetos, listas, numbers...)
  console.log(response.data)
  const movieGenres = response.data.genres; // movieGenres agora é a lista de objetos genres da url a cima (id: 1, name: fantasy...)

  for (const genre of movieGenres) {
    const name = genre.name; // pra cada objeto da lista, pega a propriedade name
    movieGenreNames.value.push(name); //puxa o nome pra lista, pegando assim todos os generos do filme pelo id
    console.log(movieGenreNames.value)
  }
};
</script>

<template>
  <main>
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
      />

      <div class="details">
        <h1>Movie: {{ movieStore.currentMovie.title }}</h1>
        <p>{{ movieStore.currentMovie.tagline }}</p>
        <p>{{ movieStore.currentMovie.overview }}</p>
        <p>Budget: ${{ movieStore.currentMovie.budget }}</p>
        <p>Rating: {{ movieStore.currentMovie.vote_average }}/10</p>
        <div>
          <p class="movie-genres">
            Genres: {{ movieGenreNames.join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </main>

  <div class="companies">
    <template
      v-for="company in movieStore.currentMovie.production_companies"
      :key="company.id"
    >
      <p>Companies:</p>
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
