<template>
  <div class="legal-page section-padding">
    <div class="container">
      <div class="legal-content">
        <h1>{{ t('refund.title') }}</h1>
        <p class="updated">{{ t('refund.updated') }}</p>

        <section>
          <h2>{{ t('refund.section1.title') }}</h2>
          <p>{{ t('refund.section1.p1') }}</p>
          <p>{{ t('refund.section1.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('refund.section2.title') }}</h2>
          <p>{{ t('refund.section2.intro') }}</p>
          <ul>
            <li>{{ t('refund.section2.item1') }}</li>
            <li>{{ t('refund.section2.item2') }}</li>
            <li>{{ t('refund.section2.item3') }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ t('refund.section3.title') }}</h2>
          <p>{{ t('refund.section3.p1') }}</p>
          <ul>
            <li>{{ t('refund.section3.item1') }}</li>
            <li>{{ t('refund.section3.item2') }}</li>
            <li>{{ t('refund.section3.item3') }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ t('refund.section4.title') }}</h2>
          <p>{{ t('refund.section4.p1') }}</p>
          <p>{{ t('refund.section4.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('refund.section5.title') }}</h2>
          <p>
            {{ t('refund.section5.contact') }}<br>
            <strong>{{ t('refund.section5.telegram') }}</strong><br>
            <strong>{{ t('refund.section5.email') }}</strong>
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
  name: 'Refund',
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
