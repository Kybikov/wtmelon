import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Privacy from '../pages/Privacy.vue'
import Terms from '../pages/Terms.vue'

const SUPPORTED_LOCALES = ['en', 'uk', 'de', 'ru']

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
    path: '/:locale',
    name: 'LocaleHome',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (SUPPORTED_LOCALES.includes(to.params.locale)) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/:locale/privacy',
    name: 'LocalePrivacy',
    component: Privacy,
    beforeEnter: (to, from, next) => {
      if (SUPPORTED_LOCALES.includes(to.params.locale)) {
        next()
      } else {
        next('/privacy')
      }
    }
  },
  {
    path: '/:locale/terms',
    name: 'LocaleTerms',
    component: Terms,
    beforeEnter: (to, from, next) => {
      if (SUPPORTED_LOCALES.includes(to.params.locale)) {
        next()
      } else {
        next('/terms')
      }
    }
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

export default router
