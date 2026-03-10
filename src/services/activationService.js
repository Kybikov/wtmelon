const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions/activation'

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
  return sendRequest('', {
    method: 'POST',
    body: JSON.stringify({
      action: 'check',
      key
    })
  })
}

export function activateKey(key, userToken) {
  return sendRequest('', {
    method: 'POST',
    body: JSON.stringify({
      action: 'redeem',
      key,
      userToken
    })
  })
}
