<template>
  <div class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-color, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.dark-theme .loading-overlay {
  background: #1a1a1a;
}

.dark-theme .spinner {
  border-color: rgba(255, 255, 255, 0.1);
  border-left-color: #4CAF50;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
