import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue';
import HVAC from '../Views/HVAC.vue';
import PLBG from '../Views/PLBG.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hvac',
      name: 'HVAC',
      component: HVAC
    },
    {
      path: '/plbg',
      name: 'PLBG',
      component: PLBG
    }
  ],
})

export default router
