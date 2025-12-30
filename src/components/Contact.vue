<template>
  <section class="contact-section section-padding" id="contact">
    <div class="container">
      <div class="row">
        <div class="section-title">
          <h1 class="title">Контакты</h1>
          <h2 class="subtitle">Свяжитесь с нами</h2>
        </div>
      </div>

      <div class="row">
        <div class="contact-info">
          <h3>По любым вопросам и поддержке</h3>

          <div class="contact-info-item">
            <i class="fa-brands fa-telegram"></i>
            <h4>Telegram</h4>
            <p>@watermelon_support</p>
          </div>

          <div class="contact-info-item">
            <i class="fa-solid fa-envelope"></i>
            <h4>Email</h4>
            <p>support@watermelon.ru</p>
          </div>

          <div class="contact-info-item">
            <i class="fa-solid fa-clock"></i>
            <h4>Время работы</h4>
            <p>24/7 онлайн поддержка</p>
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
                    placeholder="Ваше имя"
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
                    placeholder="Ваш Email"
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
                    placeholder="Ваш телефон"
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
                    placeholder="Тема"
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
                    placeholder="Ваше сообщение"
                    class="form-control"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="full-width">
                <button class="btn1" type="submit">Отправить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
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
      alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.')
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
