import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useMovieStore = defineStore("movie", () => {
  const state = reactive({
    currentMovie: {},
  });

  const currentMovie = computed(() => state.currentMovie);
  const movies = ref([])
  const topRatedMovies = ref([])
  const popularMovies = ref([]);
  const releasesMovies = ref([])
  const trendingMovie = ref(null)

  const getMovieDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}`);
    state.currentMovie = response.data;
  };

  const findTrendingMovie = async () => {
    const response = await api.get('trending/movie/week', {
      params: {
        page: 1
      },
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

  const findReleasesMovies = async () => {
    const response = await api.get('movie/now_playing', {
      params: {
        page: 1
      },
    })
    releasesMovies.value = response.data.results
  }

  const findTopRatedMovies = async () => {
    const response = await api.get('movie/top_rated', {
      params: {
        page: 1
      },
    })
    topRatedMovies.value = response.data.results
  }

  return { currentMovie, getMovieDetail, findPopularMovies, popularMovies, findTrendingMovie, trendingMovie, movies, findReleasesMovies, releasesMovies, findTopRatedMovies, topRatedMovies };
});