const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function sendRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  const payload = await response.json().catch(() => ({
    message: 'Something went wrong'
  }))

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed')
  }

  return payload
}

export function checkActivationKey(key) {
  return sendRequest('/api/activation/check', {
    method: 'POST',
    body: JSON.stringify({ key })
  })
}

export function activateKey(key, userToken) {
  return sendRequest('/api/activation/redeem', {
    method: 'POST',
    body: JSON.stringify({ key, userToken })
  })
}
