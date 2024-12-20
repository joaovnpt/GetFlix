import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/movies",
      name: "Movies",
      component: () => import("../views/MoviesView.vue"),
    },
    {
      path: "/tv",
      name: "TV",
      component: () => import("../views/TvView.vue"),
    },
    {
      path: "/movie/:movieId",
      name: "MovieDetails",
      component: () => import("../views/MovieDetailsView.vue"),
      props: true,
    },
    {
      path: "/tv/:tvShowId",
      name: "TvShowDetails",
      component: () => import("../views/TvShowDetailsView.vue"),
      props: true,
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () => import("../views/SignInView.vue")
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Se existir uma posição salva, volta para ela (ex.: ao usar o botão voltar)
      return savedPosition;
    } else {
      // Rola para o topo da página
      return { top: 0 };
    }
  },
});

export default router;
