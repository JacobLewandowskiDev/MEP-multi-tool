import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue';
import HVAC from '../Views/HVAC.vue';
import PLBG from '../Views/PLBG.vue';
import Management from '../Components/Management.vue';
import LoginView from '../Views/LoginView.vue';

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
      meta: { showSpecialNav: 'HVAC', showUnitToggle: true }
    },
    {
      path: '/plbg',
      name: 'Plumbing',
      component: PLBG,
      meta: { showSpecialNav: 'Plumbing', showUnitToggle: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/management',
      name: 'Management',
      component: Management,
      meta: { showSpecialNav: 'Management' }
    }
  ],
})

export default router
