import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";
import Pert1 from "../components/Pert1.vue";
import Pert2 from "../components/Pert2.vue";
import Pert3 from "../components/Pert3.vue";
import Pert4 from "../components/Pert4.vue";
import Pert5 from "../components/Pert5.vue";
import Pert6 from "../components/Pert6.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },
    {
      path: '/Pert1',
      name: 'Pert1',
      component: Pert1,
    },
    {
      path: '/Pert2',
      name: 'Pert2',
      component: Pert2,
    },
    {
      path: '/Pert3',
      name: 'Pert3',
      component: Pert3,
    },
    {
      path: '/Pert4',
      name: 'Pert4',
      component: Pert4,
    },
    {
      path: '/Pert5',
      name: 'Pert5',
      component: Pert5,
    },
    {
      path: '/Pert6',
      name: 'Pert6',
      component: Pert6,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title ? `${to.meta.title} | ` : ""}Weather`;
  next();
});

export default router;
