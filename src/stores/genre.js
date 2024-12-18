import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useGenreStore = defineStore("genre", () => {
  const state = reactive({
    genres: [],
    currentGenreId: null,
  });

  const currentGenreId = computed(() => state.currentGenreId)

  const formatDate = (date) => new Date().toLocaleDateString("pt-BR");

  const setCurrentGenreId = (genreId) => {
    state.currentGenreId = genreId
  }

  const genres = computed(() => state.genres);
  function getGenreName(id) {
    const genre = state.genres.find((genre) => genre.id === id);
    return genre.name;
  }

  const getAllGenres = async (type) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`);
    state.genres = response.data.genres;
  };

  const getDateYear = (date) => {
    return date.substr(0, 4)
  }

  return { genres, getAllGenres, getGenreName, currentGenreId, setCurrentGenreId, formatDate, getDateYear };
});
