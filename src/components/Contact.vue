<template>
  <section class="contact-section section-padding" id="contact">
    <div class="container">
      <div class="row">
        <div class="section-title">
          <h1 class="title">{{ t.contact.title }}</h1>
          <h2 class="subtitle">{{ t.contact.subtitle }}</h2>
        </div>
      </div>

      <div class="row">
        <div class="contact-info">
          <h3>{{ t.contact.info }}</h3>

          <div class="contact-info-item">
            <i class="fa-brands fa-telegram"></i>
            <h4>Telegram</h4>
            <p>@watermelon_support</p>
          </div>

          <div class="contact-info-item">
            <i class="fa-solid fa-envelope"></i>
            <h4>Email</h4>
            <p>support@watermelon.ua</p>
          </div>

          <div class="contact-info-item">
            <i class="fa-solid fa-clock"></i>
            <h4>{{ t.contact.workingHours }}</h4>
            <p>{{ t.contact.support247 }}</p>
          </div>
        </div>

        <div class="contact-form">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="left">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="formData.name"
                    :placeholder="t.contact.form.name"
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
                    :placeholder="t.contact.form.email"
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
                    :placeholder="t.contact.form.phone"
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
                    :placeholder="t.contact.form.subject"
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
                    :placeholder="t.contact.form.message"
                    class="form-control"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="full-width">
                <button class="btn1" type="submit">{{ t.contact.form.send }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'Contact',
  setup() {
    const { t } = useLanguage()
    return { t }
  },
  data() {
    return {
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
    handleSubmit() {
      alert(this.t.contact.form.success)
      this.formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>
