<template>
  <div class="home-page">
    <Hero />
    <Products />
    <About />
    <Reviews />
    <Partners />
    <Contact />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { checkPaymentStatus } from '../services/orderService'
import Hero from '../components/Hero.vue'
import Products from '../components/Products.vue'
import About from '../components/About.vue'
import Reviews from '../components/Reviews.vue'
import Partners from '../components/Partners.vue'
import Contact from '../components/Contact.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Products,
    About,
    Reviews,
    Partners,
    Contact
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { initLocale } = useLocale()

    onMounted(() => {
      initLocale(route.params.locale)

      const payment = route.query.payment
      const orderId = route.query.orderId

      if (payment !== 'return' || !orderId) {
        return
      }

      const storageKey = `monoInvoice:${orderId}`
      const rawInvoice = localStorage.getItem(storageKey)

      if (!rawInvoice) {
        return
      }

      const invoiceData = JSON.parse(rawInvoice)
      const checkedKey = `monoInvoiceChecked:${invoiceData.invoiceId}`

      if (!invoiceData?.invoiceId || localStorage.getItem(checkedKey)) {
        return
      }

      checkPaymentStatus(invoiceData.invoiceId, true)
        .then((statusResult) => {
          localStorage.setItem(checkedKey, String(Date.now()))

          if (statusResult.status === 'success') {
            alert('Оплата прошла успешно. Деньги получены.')
          } else if (statusResult.status === 'processing' || statusResult.status === 'created') {
            alert('Платеж еще обрабатывается. Telegram-уведомление будет отправлено после подтверждения.')
          } else {
            alert('Оплата не подтверждена. Проверьте статус в Monobank или попробуйте снова позже.')
          }
        })
        .catch((error) => {
          console.error('Payment status check failed:', error)
        })
        .finally(() => {
          router.replace({
            path: route.path,
            query: {
              ...Object.fromEntries(Object.entries(route.query).filter(([key]) => key !== 'payment' && key !== 'orderId'))
            }
          })
        })
    })
  }
}
</script>
