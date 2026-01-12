<template>
  <div class="legal-page section-padding">
    <div class="container">
      <div class="legal-content">
        <h1>{{ t('delivery.title') }}</h1>
        <p class="updated">{{ t('delivery.updated') }}</p>

        <section>
          <h2>{{ t('delivery.section1.title') }}</h2>
          <p>{{ t('delivery.section1.p1') }}</p>
          <p>{{ t('delivery.section1.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('delivery.section2.title') }}</h2>
          <p>{{ t('delivery.section2.intro') }}</p>
          <ol>
            <li>{{ t('delivery.section2.step1') }}</li>
            <li>{{ t('delivery.section2.step2') }}</li>
            <li>{{ t('delivery.section2.step3') }}</li>
            <li>{{ t('delivery.section2.step4') }}</li>
          </ol>
        </section>

        <section>
          <h2>{{ t('delivery.section3.title') }}</h2>
          <p>{{ t('delivery.section3.p1') }}</p>
          <p>{{ t('delivery.section3.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('delivery.section4.title') }}</h2>
          <p>{{ t('delivery.section4.p1') }}</p>
          <ul>
            <li>{{ t('delivery.section4.item1') }}</li>
            <li>{{ t('delivery.section4.item2') }}</li>
            <li>{{ t('delivery.section4.item3') }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ t('delivery.section5.title') }}</h2>
          <p>{{ t('delivery.section5.p1') }}</p>
          <p>{{ t('delivery.section5.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('delivery.section6.title') }}</h2>
          <p>{{ t('delivery.section6.p1') }}</p>
          <p>{{ t('delivery.section6.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('delivery.section7.title') }}</h2>
          <p>
            {{ t('delivery.section7.contact') }}<br>
            <strong>{{ t('delivery.section7.telegram') }}</strong><br>
            <strong>{{ t('delivery.section7.email') }}</strong><br>
            <strong>{{ t('delivery.section7.phone') }}</strong>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Delivery',
  setup() {
    const route = useRoute()
    const { locale, initLocale, t } = useLocale()

    onMounted(() => {
      initLocale(route.params.locale)
    })

    return { currentLanguage: locale, t }
  }
}
</script>
