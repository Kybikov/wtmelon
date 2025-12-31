<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <img src="/banner_2.png" alt="Watermelon" class="login-logo">
          <h1 class="login-title">{{ mode === 'login' ? t.auth.loginTitle : t.auth.registerTitle }}</h1>
          <p class="login-subtitle">{{ mode === 'login' ? t.auth.loginSubtitle : t.auth.registerSubtitle }}</p>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit" class="login-form">
          <div v-if="mode === 'register'" class="form-group">
            <label for="name">{{ t.auth.name }}</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              :placeholder="t.auth.namePlaceholder"
              required
            >
          </div>

          <div class="form-group">
            <label for="email">{{ t.auth.email }}</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              :placeholder="t.auth.emailPlaceholder"
              required
            >
          </div>

          <div v-if="mode === 'register'" class="form-group">
            <label for="phone">{{ t.auth.phone }}</label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              :placeholder="t.auth.phonePlaceholder"
            >
          </div>

          <div class="form-group">
            <label for="password">{{ t.auth.password }}</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              :placeholder="t.auth.passwordPlaceholder"
              required
              minlength="6"
            >
          </div>

          <div v-if="mode === 'register'" class="form-group">
            <label for="confirmPassword">{{ t.auth.confirmPassword }}</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :placeholder="t.auth.confirmPasswordPlaceholder"
              required
              minlength="6"
            >
          </div>

          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="loading">{{ t.auth.loading }}</span>
            <span v-else>{{ mode === 'login' ? t.auth.loginButton : t.auth.registerButton }}</span>
          </button>
        </form>

        <div class="form-footer">
          <p>
            {{ mode === 'login' ? t.auth.noAccount : t.auth.hasAccount }}
            <button @click="toggleMode" class="link-button">
              {{ mode === 'login' ? t.auth.registerLink : t.auth.loginLink }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '../composables/useAuth'
import { useLanguage } from '../composables/useLanguage'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const { login, register } = useAuth()
    const { t } = useLanguage()
    const router = useRouter()

    return {
      login,
      register,
      t,
      router
    }
  },
  data() {
    return {
      mode: 'login',
      loading: false,
      error: '',
      formData: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    toggleMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login'
      this.error = ''
      this.formData = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }
    },
    async handleSubmit() {
      this.error = ''

      if (this.mode === 'register') {
        if (this.formData.password !== this.formData.confirmPassword) {
          this.error = this.t.auth.passwordMismatch
          return
        }
      }

      this.loading = true

      try {
        if (this.mode === 'login') {
          await this.login(this.formData.email, this.formData.password)
        } else {
          await this.register(
            this.formData.name,
            this.formData.email,
            this.formData.password,
            this.formData.phone
          )
        }

        this.router.push('/dashboard')
      } catch (err) {
        this.error = this.t.auth.error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.login-container {
  width: 100%;
  max-width: 480px;
}

.login-card {
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-logo {
  width: 150px;
  height: auto;
  margin-bottom: 1.5rem;
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

.error-message {
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #ff3b30;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group input {
  padding: 0.875rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(88, 195, 34, 0.1);
}

.btn-submit {
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-submit:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(88, 195, 34, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.form-footer p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.link-button {
  background: none;
  border: none;
  color: var(--primary-color);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-button:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-card {
    padding: 2rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>
