<template>
  <section class="contact-section section-padding" id="contact">
    <div class="container">
      <div class="row">
        <div class="section-title">
          <h1 class="title">{{ t('contact.title') }}</h1>
          <h2 class="subtitle">{{ t('contact.subtitle') }}</h2>
        </div>
      </div>

      <div class="contacts-grid">
        <div class="contact-info-item">
          <i class="fa-solid fa-phone"></i>
          <h4>{{ t('contact.phone') }}</h4>
          <a href="tel:+380633084244" class="contact-link">+380 63 308 42 44</a>
        </div>

        <div class="contact-info-item">
          <i class="fa-solid fa-envelope"></i>
          <h4>{{ t('contact.email') }}</h4>
          <a href="mailto:info@wtmelon.store" class="contact-link">info@wtmelon.store</a>
        </div>

        <div class="contact-info-item">
          <i class="fa-brands fa-telegram"></i>
          <h4>{{ t('contact.telegramChannel') }}</h4>
          <a href="https://t.me/wtmelon_ua" target="_blank" rel="noopener" class="contact-link">@wtmelon_ua</a>
        </div>

        <div class="contact-info-item">
          <i class="fa-brands fa-instagram"></i>
          <h4>{{ t('contact.instagram') }}</h4>
          <a href="https://instagram.com/wtmelon.ua" target="_blank" rel="noopener" class="contact-link">@wtmelon.ua</a>
        </div>

        <div class="contact-info-item">
          <i class="fa-brands fa-whatsapp"></i>
          <h4>{{ t('contact.whatsapp') }}</h4>
          <a href="https://wa.me/380633084244" target="_blank" rel="noopener" class="contact-link">+380 63 308 42 44</a>
        </div>

        <div class="contact-info-item">
          <i class="fa-brands fa-telegram"></i>
          <h4>{{ t('contact.telegramSupport') }}</h4>
          <a href="https://t.me/WTmelon" target="_blank" rel="noopener" class="contact-link">@WTmelon</a>
        </div>
      </div>

      <div class="ask-question-wrapper">
        <button class="btn1 btn-ask-question" @click="toggleForm">
          <i class="fa-solid fa-envelope"></i>
          {{ showForm ? t('contact.form.hide') : t('contact.form.show') }}
        </button>
      </div>

      <transition name="slide-down">
        <div v-if="showForm" class="contact-form">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="left">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="formData.name"
                    :placeholder="t('contact.form.name')"
                    class="form-control"
                    required
                  >
                </div>
              </div>

              <div class="right">
                <div class="form-group">
                  <input
                    type="email"
                    v-model="formData.email"
                    :placeholder="t('contact.form.email')"
                    class="form-control"
                    required
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="full-width">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="formData.phone"
                    :placeholder="t('contact.form.phone')"
                    class="form-control"
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="full-width">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="formData.subject"
                    :placeholder="t('contact.form.subject')"
                    class="form-control"
                    required
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="full-width">
                <div class="form-group">
                  <textarea
                    v-model="formData.message"
                    cols="30"
                    rows="10"
                    :placeholder="t('contact.form.message')"
                    class="form-control"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="full-width">
                <button class="btn1" type="submit">{{ t('contact.form.send') }}</button>
              </div>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Contact',
  setup() {
    const { t } = useLocale()
    return { t }
  },
  data() {
    return {
      showForm: false,
      formData: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm
    },
    handleSubmit() {
      alert(this.t('contact.form.success'))
      this.formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
      this.showForm = false
    }
  }
}
</script>
