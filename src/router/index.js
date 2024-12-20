import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/movies',
      name: 'Movies',
      component: () => import('../views/MoviesView.vue')
    },
    {
      path: '/tv',
      name: 'TV',
      component: () => import('../views/TvView.vue'),
    },
    {
      path: '/movie/:movieId',
      name: 'MovieDetails',
      component: () => import('../views/MovieDetailsView.vue'),
      props: true,
    },
    {
      path: '/tv/:tvShowId',
      name: 'TvShowDetails',
      component: () => import('../views/TvShowDetailsView.vue'),
      props: true,
    }
  ],
})

export default router
