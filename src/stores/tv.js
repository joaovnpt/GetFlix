import { reactive, computed, ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useTvStore = defineStore("tv", () => {
  const state = reactive({
    currentTvShow: {},
  });

  const currentTvShow = computed(() => state.currentTvShow);
  const tvShows = ref([]);
  const topRatedTvShows = ref([]);
  const popularTvShows = ref([]);
  const onAirTvShows = ref([]);
  const trendingTvShow = ref(null);

  const getTvShowDetail = async (tvShowId) => {
    const response = await api.get(`tv/${tvShowId}`);
    state.currentTvShow = response.data;
  };

  const findTrendingTvShow = async () => {
    const response = await api.get("trending/tv/week", {
      params: {
        page: 1,
      },
    });
    trendingTvShow.value = response.data.results[0];
  };

  const findPopularTvShows = async () => {
    const response = await api.get("tv/popular", {
      params: {
        page: 1,
      },
    });
    popularTvShows.value = response.data.results;
  };

  const findOnAirTvShows = async () => {
    const response = await api.get("tv/on_the_air", {
      params: {
        page: 1,
      },
    });
    onAirTvShows.value = response.data.results
  };

  const findTopRatedTvShows = async () => {
    const response = await api.get('tv/top_rated', {
      params: {
        page: 1
      },
    })
    topRatedTvShows.value = response.data.results
  }

  return { currentTvShow, getTvShowDetail, findPopularTvShows, popularTvShows, findTrendingTvShow, trendingTvShow, tvShows, findOnAirTvShows, onAirTvShows, findTopRatedTvShows, topRatedTvShows };
});