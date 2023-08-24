import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/createHotel',
      name: 'createHotel',
      component: () => import('../modules/hotels/pages/CreateHotel.vue')
    },
    {
      path: '/detailHotel',
      name: 'detailHotel',
      component: () => import('../modules/hotels/pages/DetailsHotel.vue')
    }
    /* , Example for new page in router
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

export default router
