import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue';
import HVAC from '../Views/HVAC.vue';
import PLBG from '../Views/PLBG.vue';
import Management from '../Views/Management.vue';

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
      component: HVAC,
      meta: { showSpecialNav: true }
    },
    {
      path: '/plbg',
      name: 'Plumbing',
      component: PLBG,
      meta: { showSpecialNav: true }
    },
     {
      path: '/management',
      name: 'Management',
      component: Management
    }
  ],
})

export default router
