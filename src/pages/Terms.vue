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
          <p><strong>1.3.</strong> {{ t('terms.section1.digitalGoods') }}</p>
          <p><strong>1.4.</strong> {{ t('terms.section1.service') }}</p>
          <p><strong>1.5.</strong> {{ t('terms.section1.period') }}</p>
          <p><strong>1.6.</strong> {{ t('terms.section1.durableMedium') }}</p>
          <p><strong>1.7.</strong> {{ t('terms.section1.supportHours') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section2.title') }}</h2>
          <p><strong>2.1.</strong> {{ t('terms.section2.p1') }}</p>
          <p><strong>2.2.</strong> {{ t('terms.section2.p2') }}</p>
          <p><strong>2.3.</strong> {{ t('terms.section2.p3') }}</p>
          <p><strong>2.4.</strong> {{ t('terms.section2.p4') }}</p>
          <p><strong>2.5.</strong> {{ t('terms.section2.p5') }}</p>
          <p><strong>2.6.</strong> {{ t('terms.section2.p6') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section3.title') }}</h2>
          <p><strong>3.1.</strong> {{ t('terms.section3.p1') }}</p>
          <p><strong>3.2.</strong> {{ t('terms.section3.p2') }}</p>
          <p><strong>3.3.</strong> {{ t('terms.section3.p3') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section4.title') }}</h2>
          <p><strong>4.1.</strong> {{ t('terms.section4.p1') }}</p>
          <p><strong>4.2.</strong> {{ t('terms.section4.p2') }}</p>
          <p><strong>4.3.</strong> {{ t('terms.section4.p3') }}</p>
          <p><strong>4.4.</strong> {{ t('terms.section4.p4') }}</p>
          <p><strong>4.5.</strong> {{ t('terms.section4.p5') }}</p>
          <p><strong>4.5.1.</strong> {{ t('terms.section4.p51') }}</p>
          <p><strong>4.6.</strong> {{ t('terms.section4.p6') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section5.title') }}</h2>
          <p><strong>5.1.</strong> {{ t('terms.section5.p1') }}</p>
          <p><strong>5.2.</strong> {{ t('terms.section5.p2') }}</p>
          <p><strong>5.3.</strong> {{ t('terms.section5.p3') }}</p>
          <p><strong>5.4.</strong> {{ t('terms.section5.p4') }}</p>
          <p><strong>5.5.</strong> {{ t('terms.section5.p5') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section6.title') }}</h2>
          <p><strong>6.1.</strong> {{ t('terms.section6.p1') }}</p>
          <p><strong>6.2.</strong> {{ t('terms.section6.p2') }}</p>
          <p><strong>6.3.</strong> {{ t('terms.section6.p3') }}</p>
          <p><strong>6.4.</strong> {{ t('terms.section6.p4') }}</p>
          <p><strong>6.5.</strong> {{ t('terms.section6.p5') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section7.title') }}</h2>
          <p><strong>7.1.</strong> {{ t('terms.section7.p1') }}</p>
          <p><strong>7.2.</strong> {{ t('terms.section7.p2') }}</p>
          <p><strong>7.3.</strong> {{ t('terms.section7.p3') }}</p>
          <p><strong>7.4.</strong> {{ t('terms.section7.p4') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section8.title') }}</h2>
          <p><strong>8.1.</strong> {{ t('terms.section8.p1') }}</p>
          <p><strong>8.2.</strong> {{ t('terms.section8.p2') }}</p>
          <p><strong>8.3.</strong> {{ t('terms.section8.p3') }}</p>
          <p><strong>8.4.</strong> {{ t('terms.section8.p41') }}</p>
          <p><strong>8.5.</strong> {{ t('terms.section8.p5') }}</p>
          <p><strong>8.6.</strong> {{ t('terms.section8.p6') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section9.title') }}</h2>
          <p><strong>9.1.</strong> {{ t('terms.section9.p1') }}</p>
          <p><strong>9.2.</strong> {{ t('terms.section9.p2') }}</p>
          <p><strong>{{ t('terms.section9.liability') }}</strong></p>
          <ul>
            <li>{{ t('terms.section9.liabilityItem1') }}</li>
            <li>{{ t('terms.section9.liabilityItem2') }}</li>
            <li>{{ t('terms.section9.liabilityItem3') }}</li>
            <li>{{ t('terms.section9.liabilityItem4') }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ t('terms.section10.title') }}</h2>
          <p><strong>10.1.</strong> {{ t('terms.section10.p1') }}</p>
          <p><strong>10.2.</strong> {{ t('terms.section10.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section11.title') }}</h2>
          <p><strong>11.1.</strong> {{ t('terms.section11.p1') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section12.title') }}</h2>
          <p><strong>12.1.</strong> {{ t('terms.section12.p1') }}</p>
          <p><strong>12.2.</strong> {{ t('terms.section12.p2') }}</p>
          <p><strong>12.3.</strong> {{ t('terms.section12.p3') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section13.title') }}</h2>
          <p><strong>13.1.</strong> {{ t('terms.section13.p1') }}</p>
          <p><strong>13.2.</strong> {{ t('terms.section13.p2') }}</p>
          <p><strong>13.3.</strong> {{ t('terms.section13.p3') }}</p>
        </section>

        <section>
          <h2>{{ t('terms.section14.title') }}</h2>
          <p>
            <strong>{{ t('terms.section14.company') }}</strong><br>
            {{ t('terms.section14.code') }}<br>
            {{ t('terms.section14.address') }}<br>
            {{ t('terms.section14.email') }}<br>
            {{ t('terms.section14.phone') }}<br>
            {{ t('terms.section14.brand') }}
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
