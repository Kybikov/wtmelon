<template>
  <div class="settings-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ t.settings.title }}</h1>
        <p class="page-subtitle">{{ t.settings.subtitle }}</p>
      </div>

      <div class="settings-content">
        <div class="settings-section">
          <h2 class="section-title">{{ t.settings.profileInfo }}</h2>

          <form @submit.prevent="saveProfile" class="settings-form">
            <div class="form-group">
              <label for="name">{{ t.settings.name }}</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                :placeholder="t.settings.namePlaceholder"
                required
              >
            </div>

            <div class="form-group">
              <label for="email">{{ t.settings.email }}</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                :placeholder="t.settings.emailPlaceholder"
                required
              >
            </div>

            <div class="form-group">
              <label for="phone">{{ t.settings.phone }}</label>
              <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                :placeholder="t.settings.phonePlaceholder"
              >
            </div>

            <div v-if="profileSuccess" class="success-message">
              {{ t.settings.profileSaved }}
            </div>

            <button type="submit" class="btn-primary" :disabled="profileSaving">
              <span v-if="profileSaving">{{ t.settings.saving }}</span>
              <span v-else>{{ t.settings.saveChanges }}</span>
            </button>
          </form>
        </div>

        <div class="settings-section">
          <h2 class="section-title">{{ t.settings.changePassword }}</h2>

          <form @submit.prevent="changePassword" class="settings-form">
            <div class="form-group">
              <label for="currentPassword">{{ t.settings.currentPassword }}</label>
              <input
                type="password"
                id="currentPassword"
                v-model="passwordData.currentPassword"
                :placeholder="t.settings.currentPasswordPlaceholder"
                required
              >
            </div>

            <div class="form-group">
              <label for="newPassword">{{ t.settings.newPassword }}</label>
              <input
                type="password"
                id="newPassword"
                v-model="passwordData.newPassword"
                :placeholder="t.settings.newPasswordPlaceholder"
                required
                minlength="6"
              >
            </div>

            <div class="form-group">
              <label for="confirmPassword">{{ t.settings.confirmPassword }}</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="passwordData.confirmPassword"
                :placeholder="t.settings.confirmPasswordPlaceholder"
                required
                minlength="6"
              >
            </div>

            <div v-if="passwordError" class="error-message">
              {{ passwordError }}
            </div>

            <div v-if="passwordSuccess" class="success-message">
              {{ t.settings.passwordChanged }}
            </div>

            <button type="submit" class="btn-primary" :disabled="passwordSaving">
              <span v-if="passwordSaving">{{ t.settings.saving }}</span>
              <span v-else>{{ t.settings.changePasswordButton }}</span>
            </button>
          </form>
        </div>

        <div class="settings-section">
          <h2 class="section-title">{{ t.settings.notifications }}</h2>

          <div class="settings-form">
            <div class="toggle-group">
              <div class="toggle-info">
                <div class="toggle-label">{{ t.settings.emailNotifications }}</div>
                <div class="toggle-desc">{{ t.settings.emailNotificationsDesc }}</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notificationSettings.email">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-group">
              <div class="toggle-info">
                <div class="toggle-label">{{ t.settings.renewalReminders }}</div>
                <div class="toggle-desc">{{ t.settings.renewalRemindersDesc }}</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notificationSettings.renewalReminders">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-group">
              <div class="toggle-info">
                <div class="toggle-label">{{ t.settings.promotions }}</div>
                <div class="toggle-desc">{{ t.settings.promotionsDesc }}</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notificationSettings.promotions">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <button @click="saveNotificationSettings" class="btn-primary" :disabled="notificationSaving">
              <span v-if="notificationSaving">{{ t.settings.saving }}</span>
              <span v-else>{{ t.settings.saveChanges }}</span>
            </button>
          </div>
        </div>

        <div class="settings-section danger-zone">
          <h2 class="section-title">{{ t.settings.dangerZone }}</h2>
          <p class="section-desc">{{ t.settings.dangerZoneDesc }}</p>
          <button @click="handleLogout" class="btn-danger">
            {{ t.settings.logout }}
          </button>
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
  name: 'Settings',
  setup() {
    const { currentUser, updateProfile, logout } = useAuth()
    const { t } = useLanguage()
    const router = useRouter()

    return {
      currentUser,
      updateProfile,
      logout,
      t,
      router
    }
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: ''
      },
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      notificationSettings: {
        email: true,
        renewalReminders: true,
        promotions: false
      },
      profileSaving: false,
      profileSuccess: false,
      passwordSaving: false,
      passwordSuccess: false,
      passwordError: '',
      notificationSaving: false
    }
  },
  mounted() {
    if (this.currentUser) {
      this.formData = {
        name: this.currentUser.name || '',
        email: this.currentUser.email || '',
        phone: this.currentUser.phone || ''
      }
    }

    const savedSettings = localStorage.getItem('notificationSettings')
    if (savedSettings) {
      this.notificationSettings = JSON.parse(savedSettings)
    }
  },
  methods: {
    async saveProfile() {
      this.profileSaving = true
      this.profileSuccess = false

      try {
        await this.updateProfile(this.formData)
        this.profileSuccess = true

        setTimeout(() => {
          this.profileSuccess = false
        }, 3000)
      } catch (error) {
        console.error('Error saving profile:', error)
      } finally {
        this.profileSaving = false
      }
    },
    async changePassword() {
      this.passwordError = ''
      this.passwordSuccess = false

      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        this.passwordError = this.t.auth.passwordMismatch
        return
      }

      this.passwordSaving = true

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.passwordSuccess = true
        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }

        setTimeout(() => {
          this.passwordSuccess = false
        }, 3000)
      } catch (error) {
        this.passwordError = this.t.settings.passwordChangeError
      } finally {
        this.passwordSaving = false
      }
    },
    async saveNotificationSettings() {
      this.notificationSaving = true

      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        localStorage.setItem('notificationSettings', JSON.stringify(this.notificationSettings))
      } finally {
        this.notificationSaving = false
      }
    },
    handleLogout() {
      if (confirm(this.t.settings.logoutConfirm)) {
        this.logout()
        this.router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.settings-page {
  min-height: calc(100vh - 80px);
  padding: 3rem 0;
  background: var(--bg-secondary);
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section {
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.section-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.settings-form {
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

.toggle-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
}

.toggle-info {
  flex: 1;
}

.toggle-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.toggle-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  flex-shrink: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: 0.4s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.toggle-switch input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(22px);
}

.success-message {
  background: rgba(52, 199, 89, 0.1);
  border: 1px solid rgba(52, 199, 89, 0.3);
  color: #34c759;
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
}

.error-message {
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #ff3b30;
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
}

.btn-primary {
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(88, 195, 34, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.danger-zone {
  border: 2px solid rgba(255, 59, 48, 0.3);
}

.btn-danger {
  padding: 1rem 2rem;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 59, 48, 0.3);
}

@media (max-width: 768px) {
  .settings-page {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .settings-section {
    padding: 1.5rem;
  }

  .toggle-group {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
