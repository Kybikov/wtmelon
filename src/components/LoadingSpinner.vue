<template>
  <div class="loading-overlay">
    <div class="watermelon-spinner">
      <div class="watermelon">
        <div class="watermelon-slice">
          <div class="red-part"></div>
          <div class="white-part"></div>
          <div class="green-part"></div>
          <div class="seed seed-1"></div>
          <div class="seed seed-2"></div>
          <div class="seed seed-3"></div>
        </div>
      </div>
      <p class="loading-text">{{ loadingText }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'

export default {
  name: 'LoadingSpinner',
  setup() {
    const { locale } = useLocale()

    const loadingText = computed(() => {
      const texts = {
        en: 'Loading...',
        uk: 'Завантаження...',
        de: 'Laden...',
        ru: 'Загрузка...'
      }
      return texts[locale.value] || texts.en
    })

    return { loadingText }
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--light-color, #f8f9fa);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.watermelon-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.watermelon {
  width: 100px;
  height: 100px;
  position: relative;
  animation: bounce 1.2s ease-in-out infinite;
}

.watermelon-slice {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(255, 71, 87, 0.3);
}

.red-part {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 65%;
  background: linear-gradient(135deg, #ff4757 0%, #ff6b95 100%);
  animation: pulse 1.2s ease-in-out infinite;
}

.white-part {
  position: absolute;
  top: 65%;
  left: 0;
  width: 100%;
  height: 10%;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
}

.green-part {
  position: absolute;
  top: 75%;
  left: 0;
  width: 100%;
  height: 25%;
  background: linear-gradient(135deg, #2ed573 0%, #26d467 100%);
}

.seed {
  position: absolute;
  width: 6px;
  height: 10px;
  background: #1e272e;
  border-radius: 50%;
  opacity: 0.8;
  animation: seedFloat 1.5s ease-in-out infinite;
}

.seed-1 {
  top: 25%;
  left: 30%;
  animation-delay: 0s;
}

.seed-2 {
  top: 35%;
  left: 55%;
  animation-delay: 0.3s;
}

.seed-3 {
  top: 45%;
  left: 40%;
  animation-delay: 0.6s;
}

.loading-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  animation: fadeInOut 1.5s ease-in-out infinite;
}

.dark-theme .loading-overlay {
  background: #1a1a1a;
}

.dark-theme .white-part {
  background: linear-gradient(135deg, #e8e8e8 0%, #d5d5d5 100%);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(-5deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-10px) rotate(5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

@keyframes seedFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.1);
  }
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
