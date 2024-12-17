import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useMovieStore = defineStore("movie", () => {
  const state = reactive({
    currentMovie: {},
  });

  const popularMovies = ref([]);
  const trendingMovie = ref(null)
  const currentMovie = computed(() => state.currentMovie);

  const getMovieDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}`);
    state.currentMovie = response.data;
  };

  const findTrendingMovie = async () => {
    const response = await api.get('trending/movie/week', {
      params: {
        page: 1
      }
    })
    trendingMovie.value = response.data.results[0]
  }

  const findPopularMovies = async () => {
    const response = await api.get("movie/popular", {
      params: {
        page: 1
      },
    });
    popularMovies.value = response.data.results;
  };

  return { currentMovie, getMovieDetail, findPopularMovies, popularMovies, findTrendingMovie, trendingMovie };
});
