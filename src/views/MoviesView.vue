<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Loading from "vue-loading-overlay";
import { useMovieStore } from "@/stores/movie";
import TrendingMovieBanner from "@/components/TrendingMovieBanner.vue";
import MoviesGenres from '@/components/MoviesGenres.vue'
import { useGenreStore } from "@/stores/genre";
import RealesesMovies from "@/components/RealesesMovies.vue";
import TopRatedMovies from "@/components/TopRatedMovies.vue";

const router = useRouter()
const genreStore = useGenreStore()
const movieStore = useMovieStore();
const isLoading = ref(false);
const carouselConfig = {
  itemsToShow: 3.95,
  wrapAround: true,
  transition: 400,
};

function openMovie(movieId) {
  router.push({ name: "MovieDetails", params: { movieId } });
}

onMounted(async () => {
  isLoading.value = true;
  movieStore.findPopularMovies();
  movieStore.findTrendingMovie();
  isLoading.value = false;
});
</script>

<template>
  <main>
    <TrendingMovieBanner />

    <div class="popular-movies">
      <h1>Popular</h1>
      <Carousel
        v-bind="carouselConfig"
        class="popular-carousel"
        :items-to-show="6"
      >
        <Slide
          v-for="movie in movieStore.popularMovies"
          :key="movie.id"
          class="carousel-slide"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
            alt=""
            class="popular-movie-poster"
            @click="openMovie(movie.id)"
          />
          <div class="carousel-infos">
            <p class="movie-title">{{ movie.title }}</p>
            <p class="movie-rate">
              <img src="../assets/imdb.png" alt="" />{{ movie.vote_average }}/10
            </p>
            <p class="movie-date">{{ genreStore.getDateYear(movie.release_date) }}</p>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>

    <MoviesGenres />
    <RealesesMovies />
    <TopRatedMovies />
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