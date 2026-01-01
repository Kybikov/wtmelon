import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from './useLocale'

const SEO_TITLES = {
  en: {
    home: 'Watermelon - Premium Subscriptions',
    privacy: 'Privacy Policy - Watermelon',
    terms: 'Terms of Service - Watermelon'
  },
  uk: {
    home: 'Watermelon - Преміум підписки',
    privacy: 'Політика конфіденційності - Watermelon',
    terms: 'Умови використання - Watermelon'
  },
  de: {
    home: 'Watermelon - Premium-Abonnements',
    privacy: 'Datenschutz - Watermelon',
    terms: 'Nutzungsbedingungen - Watermelon'
  },
  ru: {
    home: 'Watermelon - Премиум подписки',
    privacy: 'Политика конфиденциальности - Watermelon',
    terms: 'Условия использования - Watermelon'
  }
}

const SEO_DESCRIPTIONS = {
  en: {
    home: 'Get access to premium subscriptions at unbeatable prices. Spotify, Netflix, ChatGPT and more.',
    privacy: 'Learn how we protect your personal data and ensure your privacy.',
    terms: 'Read our terms of service and understand your rights as a customer.'
  },
  uk: {
    home: 'Отримайте доступ до преміум підписок за неперевершеними цінами. Spotify, Netflix, ChatGPT та інше.',
    privacy: 'Дізнайтеся, як ми захищаємо ваші персональні дані та забезпечуємо конфіденційність.',
    terms: 'Ознайомтеся з нашими умовами використання та зрозумійте свої права як клієнта.'
  },
  de: {
    home: 'Erhalten Sie Zugang zu Premium-Abonnements zu unschlagbaren Preisen. Spotify, Netflix, ChatGPT und mehr.',
    privacy: 'Erfahren Sie, wie wir Ihre persönlichen Daten schützen und Ihre Privatsphäre gewährleisten.',
    terms: 'Lesen Sie unsere Nutzungsbedingungen und verstehen Sie Ihre Rechte als Kunde.'
  },
  ru: {
    home: 'Получите доступ к премиум подпискам по непревзойденным ценам. Spotify, Netflix, ChatGPT и другое.',
    privacy: 'Узнайте, как мы защищаем ваши персональные данные и обеспечиваем конфиденциальность.',
    terms: 'Ознакомьтесь с нашими условиями использования и поймите свои права как клиента.'
  }
}

export function useSEO() {
  const route = useRoute()
  const { locale } = useLocale()

  const getPageKey = (path) => {
    if (path.includes('privacy')) return 'privacy'
    if (path.includes('terms')) return 'terms'
    return 'home'
  }

  const updateMeta = () => {
    const pageKey = getPageKey(route.path)
    const currentLocale = locale.value

    document.title = SEO_TITLES[currentLocale]?.[pageKey] || SEO_TITLES.en[pageKey]

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = SEO_DESCRIPTIONS[currentLocale]?.[pageKey] || SEO_DESCRIPTIONS.en[pageKey]

    let metaOgTitle = document.querySelector('meta[property="og:title"]')
    if (!metaOgTitle) {
      metaOgTitle = document.createElement('meta')
      metaOgTitle.setAttribute('property', 'og:title')
      document.head.appendChild(metaOgTitle)
    }
    metaOgTitle.content = SEO_TITLES[currentLocale]?.[pageKey] || SEO_TITLES.en[pageKey]

    let metaOgDescription = document.querySelector('meta[property="og:description"]')
    if (!metaOgDescription) {
      metaOgDescription = document.createElement('meta')
      metaOgDescription.setAttribute('property', 'og:description')
      document.head.appendChild(metaOgDescription)
    }
    metaOgDescription.content = SEO_DESCRIPTIONS[currentLocale]?.[pageKey] || SEO_DESCRIPTIONS.en[pageKey]

    const baseUrl = window.location.origin
    const hreflangLinks = document.querySelectorAll('link[rel="alternate"]')
    hreflangLinks.forEach(link => link.remove())

    const locales = ['en', 'uk', 'de', 'ru']
    locales.forEach(loc => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = loc

      const pathSuffix = route.path.replace(/^\/(en|uk|de|ru)/, '') || '/'
      link.href = loc === 'en'
        ? `${baseUrl}${pathSuffix}`
        : `${baseUrl}/${loc}${pathSuffix}`

      document.head.appendChild(link)
    })

    const xDefaultLink = document.createElement('link')
    xDefaultLink.rel = 'alternate'
    xDefaultLink.hreflang = 'x-default'
    xDefaultLink.href = `${baseUrl}${route.path.replace(/^\/(en|uk|de|ru)/, '') || '/'}`
    document.head.appendChild(xDefaultLink)
  }

  watch([locale, () => route.path], updateMeta, { immediate: true })

  return {
    updateMeta
  }
}
