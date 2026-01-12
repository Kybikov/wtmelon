import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Privacy from '../pages/Privacy.vue'
import Terms from '../pages/Terms.vue'
import Refund from '../pages/Refund.vue'
import Delivery from '../pages/Delivery.vue'
import Requisites from '../pages/Requisites.vue'
import NotFound from '../pages/NotFound.vue'
import { useLocale } from '../composables/useLocale'

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
    path: '/refund',
    name: 'Refund',
    component: Refund
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery
  },
  {
    path: '/requisites',
    name: 'Requisites',
    component: Requisites
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
  },
  {
    path: '/:locale/refund',
    name: 'LocaleRefund',
    component: Refund,
    beforeEnter: (to, from, next) => {
      if (SUPPORTED_LOCALES.includes(to.params.locale)) {
        next()
      } else {
        next('/refund')
      }
    }
  },
  {
    path: '/:locale/delivery',
    name: 'LocaleDelivery',
    component: Delivery,
    beforeEnter: (to, from, next) => {
      if (SUPPORTED_LOCALES.includes(to.params.locale)) {
        next()
      } else {
        next('/delivery')
      }
    }
  },
  {
    path: '/:locale/requisites',
    name: 'LocaleRequisites',
    component: Requisites,
    beforeEnter: (to, from, next) => {
      if (SUPPORTED_LOCALES.includes(to.params.locale)) {
        next()
      } else {
        next('/requisites')
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
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

router.beforeEach(async (to, from, next) => {
  const { initLocale } = useLocale()
  const routeLocale = to.params.locale
  await initLocale(routeLocale)
  next()
})

export default router
