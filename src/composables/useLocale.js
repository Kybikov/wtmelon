import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const SUPPORTED_LOCALES = ['en', 'uk', 'de', 'ru']
const DEFAULT_LOCALE = 'en'

const CURRENCY_SYMBOLS = {
  en: '$',
  uk: '₴',
  de: '€',
  ru: '₴'
}

const LOCALE_NAMES = {
  en: 'English',
  uk: 'Українська',
  de: 'Deutsch',
  ru: 'Русский'
}

const currentLocale = ref(DEFAULT_LOCALE)
const translations = ref({})
const isLoading = ref(true)

export function useLocale() {
  const router = useRouter()
  const route = useRoute()

  const locale = computed(() => currentLocale.value)
  const currency = computed(() => CURRENCY_SYMBOLS[currentLocale.value])
  const loading = computed(() => isLoading.value)

  const setLocale = (newLocale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) {
      newLocale = DEFAULT_LOCALE
    }

    currentLocale.value = newLocale
    localStorage.setItem('preferredLocale', newLocale)

    const currentPath = route.path
    const pathWithoutLocale = currentPath.replace(/^\/(en|uk|de|ru)/, '') || '/'

    const newPath = newLocale === DEFAULT_LOCALE
      ? pathWithoutLocale
      : `/${newLocale}${pathWithoutLocale}`

    if (route.path !== newPath) {
      router.push(newPath)
    }
  }

  const initLocale = (routeLocale) => {
    if (routeLocale && SUPPORTED_LOCALES.includes(routeLocale)) {
      currentLocale.value = routeLocale
      return
    }

    const savedLocale = localStorage.getItem('preferredLocale')
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      currentLocale.value = savedLocale
      return
    }

    const browserLocale = navigator.language.split('-')[0]
    if (SUPPORTED_LOCALES.includes(browserLocale)) {
      currentLocale.value = browserLocale
      return
    }

    currentLocale.value = DEFAULT_LOCALE
  }

  const t = (key) => {
    const locale = translations.value[currentLocale.value]
    if (!locale) return key

    const keys = key.split('.')
    let value = locale

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    return value
  }

  const loadTranslations = async () => {
    isLoading.value = true
    try {
      const response = await fetch(`/locales/${currentLocale.value}.json`)
      if (response.ok) {
        translations.value[currentLocale.value] = await response.json()
      }
    } catch (error) {
      console.error('Failed to load translations:', error)
    } finally {
      isLoading.value = false
    }
  }

  const formatPrice = (prices) => {
    if (!prices || typeof prices !== 'object') return {}

    const localePrices = prices[currentLocale.value] || prices[DEFAULT_LOCALE] || prices
    return localePrices
  }

  watch(locale, loadTranslations, { immediate: true })

  return {
    locale,
    currency,
    loading,
    setLocale,
    initLocale,
    t,
    formatPrice,
    supportedLocales: SUPPORTED_LOCALES,
    localeNames: LOCALE_NAMES,
    defaultLocale: DEFAULT_LOCALE
  }
}
