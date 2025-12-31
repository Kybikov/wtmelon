import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Privacy from '../pages/Privacy.vue'
import Terms from '../pages/Terms.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Subscriptions from '../pages/Subscriptions.vue'
import PaymentHistory from '../pages/PaymentHistory.vue'
import Settings from '../pages/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/subscriptions',
    name: 'Subscriptions',
    component: Subscriptions,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/payments',
    name: 'PaymentHistory',
    component: PaymentHistory,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
