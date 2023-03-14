import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import StatesPage from '../pages/StatesPage.vue'
import StateInfoPage from '../pages/StateInfoPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/states',
    name: 'StatesPage',
    component: StatesPage,
  },
  {
    path: '/states/:state',
    name: 'StateInfoPage',
    component: StateInfoPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
]

})

export default router
