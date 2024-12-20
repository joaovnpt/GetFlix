<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Loading from "vue-loading-overlay";
//Stores
import { useTvStore } from "@/stores/tv";
import { useGenreStore } from "@/stores/genre";
//Components
import TvShowGenres from "@/components/tvShows/TvShowGenres.vue";
import TrendingTvShowBaner from "@/components/tvShows/TrendingTvShowBaner.vue";
import OnTheAirTvShows from "@/components/tvShows/OnAirTvShows.vue"
import TopRatedTvShows from "@/components/tvShows/TopRatedTvShows.vue"

const router = useRouter();
const isLoading = ref(false);
const genreStore = useGenreStore();
const tvStore = useTvStore();
const carouselConfig = {
  itemsToShow: 3.95,
  wrapAround: true,
  transition: 400,
};

function openTvShow(tvShowId) {
  router.push({ name: "TvShowDetails", params: { tvShowId } });
}

onMounted(async () => {
  isLoading.value = true;
  await tvStore.findPopularTvShows();
  isLoading.value = false;
});
</script>

<template>
  <main>
    <loading v-model:active="isLoading" is-full-page />
    <TrendingTvShowBaner />

    <div class="popular-movies">
      <h1>Popular</h1>
      <Carousel
        v-bind="carouselConfig"
        class="popular-carousel"
        :items-to-show="6"
      >
        <Slide
          v-for="tvShow in tvStore.popularTvShows"
          :key="tvShow.id"
          class="carousel-slide"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`"
            alt=""
            class="popular-movie-poster"
            @click="openTvShow(tvShow.id)"
          />
          <div class="carousel-infos">
            <p class="movie-title">{{ tvShow.name }}</p>
            <p class="movie-rate">
              <img src="../assets/imdb.png" alt="" />{{ tvShow.vote_average }}/10
            </p>
            <p class="movie-date">
              {{ genreStore.getDateYear(tvShow.first_air_date) }}
            </p>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>

    <TvShowGenres />
    <OnTheAirTvShows />
    <TopRatedTvShows />
  </main>
</template>

<style scoped>
.popular-movies {
  margin: 0 auto 50px auto;
  width: 88vw;
}

.popular-movies h1 {
  margin: 50px 0px;
}

.carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  color: black;
  padding: 1rem;
  text-align: start;
}

.popular-movie-poster {
  cursor: pointer;
  box-shadow: 0 5px 5px #00000041;
  transition: 300ms ease-in-out;
  border-radius: 5px;
  transition: 250ms ease;
}

.popular-movie-poster:hover {
  transform: scale(1.06);
}

.carousel-infos {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 1rem;
  width: 200px;
  overflow: hidden;
}

.movie-title {
  font-weight: 500;
}

.movie-rate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.movie-rate img {
  width: 28px;
}
</style>
