import { ref, computed } from 'vue'

const currentUser = ref(null)
const isAuthenticated = ref(false)

const initAuth = () => {
  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')

  if (storedUser && storedToken) {
    currentUser.value = JSON.parse(storedUser)
    isAuthenticated.value = true
  }
}

initAuth()

export function useAuth() {
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name: 'Олександр Петренко',
          email: email,
          phone: '+380633084244',
          avatar: null,
          createdAt: '2024-01-15'
        }

        const mockToken = 'mock-jwt-token-' + Date.now()

        currentUser.value = mockUser
        isAuthenticated.value = true

        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('token', mockToken)

        resolve({ user: mockUser, token: mockToken })
      }, 800)
    })
  }

  const register = async (name, email, password, phone) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = {
          id: Date.now().toString(),
          name: name,
          email: email,
          phone: phone || '',
          avatar: null,
          createdAt: new Date().toISOString().split('T')[0]
        }

        const mockToken = 'mock-jwt-token-' + Date.now()

        currentUser.value = mockUser
        isAuthenticated.value = true

        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('token', mockToken)

        resolve({ user: mockUser, token: mockToken })
      }, 800)
    })
  }

  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const updateProfile = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser.value = { ...currentUser.value, ...userData }
        localStorage.setItem('user', JSON.stringify(currentUser.value))
        resolve(currentUser.value)
      }, 500)
    })
  }

  return {
    currentUser: computed(() => currentUser.value),
    isAuthenticated: computed(() => isAuthenticated.value),
    login,
    register,
    logout,
    updateProfile
  }
}
