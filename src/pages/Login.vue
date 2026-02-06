<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">{{ isSignUp ? t('login.signup') : t('login.signin') }}</h1>

        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email">{{ t('login.email') }}</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              :placeholder="t('login.emailPlaceholder')"
              class="form-input"
            />
          </div>

          <div v-if="!useMagicLink" class="form-group">
            <label for="password">{{ t('login.password') }}</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              :placeholder="t('login.passwordPlaceholder')"
              class="form-input"
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading">{{ t('login.loading') }}</span>
            <span v-else-if="useMagicLink">{{ t('login.sendCode') }}</span>
            <span v-else>{{ isSignUp ? t('login.signup') : t('login.signin') }}</span>
          </button>
        </form>

        <div class="login-options">
          <button @click="useMagicLink = !useMagicLink" class="link-button">
            {{ useMagicLink ? t('login.usePassword') : t('login.useMagicLink') }}
          </button>

          <button v-if="!useMagicLink" @click="isSignUp = !isSignUp" class="link-button">
            {{ isSignUp ? t('login.haveAccount') : t('login.noAccount') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useLocale } from '../composables/useLocale';

const { t } = useLocale();
const router = useRouter();
const { signIn, signUp, signInWithMagicLink } = useAuth();

const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const useMagicLink = ref(false);
const isLoading = ref(false);
const error = ref('');
const successMessage = ref('');

const handleSubmit = async () => {
  error.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    if (useMagicLink.value) {
      await signInWithMagicLink(email.value);
      successMessage.value = t('login.magicLinkSent');
    } else if (isSignUp.value) {
      await signUp(email.value, password.value);
      successMessage.value = t('login.signupSuccess');
      setTimeout(() => {
        router.push('/cabinet');
      }, 1500);
    } else {
      await signIn(email.value, password.value);
      router.push('/cabinet');
    }
  } catch (err) {
    error.value = err.message || t('login.error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 32px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  padding: 12px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c00;
  font-size: 14px;
}

.success-message {
  padding: 12px;
  background-color: #efe;
  border: 1px solid #cfc;
  border-radius: 8px;
  color: #060;
  font-size: 14px;
}

.btn-submit {
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-options {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.link-button {
  background: none;
  border: none;
  color: #667eea;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
}

.link-button:hover {
  color: #764ba2;
}

@media (max-width: 640px) {
  .login-card {
    padding: 32px 24px;
  }

  .login-title {
    font-size: 24px;
  }
}
</style>
