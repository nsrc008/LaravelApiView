import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../components/UserComp.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../views/LoadingView.vue')
    },
    // Ruta de redirección automática
    {
      path: '/autoredirect',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isAuthenticated')) {
          next('/dashboard')
        } else {
          next('/')
        }
      },
    },
  ]
})

export default router
