<template>
  <div class="legal-page section-padding">
    <div class="container">
      <div class="legal-content">
        <h1>{{ t('terms.title') }}</h1>
        <p class="updated">{{ t('terms.updated') }}</p>

        <section>
          <p style="text-align: center; margin-bottom: 30px;">
            <strong>{{ t('terms.title').toUpperCase() }}</strong><br>
            <em>({{ t('terms.subtitle') }})</em>
          </p>
          <p>{{ t('terms.intro') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section1.title') }}</h2>
          <p><strong>1.1.</strong> {{ t('terms.section1.offer') }}</p>
          <p><strong>1.2.</strong> {{ t('terms.section1.acceptance') }}</p>
          <p><strong>1.3.</strong> {{ t('terms.section1.service') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section2.title') }}</h2>
          <p><strong>2.1.</strong> {{ t('terms.section2.p1') }}</p>
          <p><strong>2.2.</strong> {{ t('terms.section2.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section3.title') }}</h2>
          <p><strong>3.1.</strong> {{ t('terms.section3.p1') }}</p>
          <p><strong>3.2.</strong> {{ t('terms.section3.p2') }}</p>
          <ul>
            <li>{{ t('terms.section3.method1') }}</li>
            <li>{{ t('terms.section3.method2') }}</li>
            <li>{{ t('terms.section3.method3') }}</li>
          </ul>
          <p><strong>3.3.</strong> {{ t('terms.section3.p3') }}</p>
          <p><strong>3.4.</strong> {{ t('terms.section3.p4') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section4.title') }}</h2>
          <p><strong>4.1.</strong> {{ t('terms.section4.p1') }}</p>
          <p><strong>4.2.</strong> {{ t('terms.section4.p2') }}</p>
          <p><strong>4.3.</strong> {{ t('terms.section4.p3') }}</p>
          <p><strong>4.4.</strong> {{ t('terms.section4.p4') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section5.title') }}</h2>
          <p><strong>5.1.</strong> {{ t('terms.section5.warranty') }}</p>
          <p><strong>5.2.</strong> {{ t('terms.section5.replacement') }}</p>
          <p><strong>5.3.</strong> {{ t('terms.section5.refund') }}</p>
          <ul>
            <li>{{ t('terms.section5.refundItem1') }}</li>
            <li>{{ t('terms.section5.refundItem2') }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ t('terms.section6.title') }}</h2>
          <p><strong>6.1.</strong> {{ t('terms.section6.prohibition') }}</p>
          <p><strong>6.2.</strong> {{ t('terms.section6.warranty_void') }}</p>
          <p><strong>6.3.</strong> {{ t('terms.section6.liability') }}</p>
          <ul>
            <li>{{ t('terms.section6.liabilityItem1') }}</li>
            <li>{{ t('terms.section6.liabilityItem2') }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ t('terms.section7.title') }}</h2>
          <p><strong>7.1.</strong> {{ t('terms.section7.p1') }}</p>
          <p><strong>7.2.</strong> {{ t('terms.section7.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section8.title') }}</h2>
          <p><strong>8.1.</strong> {{ t('terms.section8.p1') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section9.title') }}</h2>
          <p>
            <strong>{{ t('terms.section9.company') }}</strong><br>
            {{ t('terms.section9.code') }}<br>
            {{ t('terms.section9.address') }}<br>
            {{ t('terms.section9.email') }}<br>
            {{ t('terms.section9.phone') }}
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
  name: 'Terms',
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
