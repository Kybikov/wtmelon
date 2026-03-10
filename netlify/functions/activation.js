const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  }
}

async function callUpstream({ path, method = 'GET', payload, apiToken, baseUrl }) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: payload ? JSON.stringify(payload) : undefined
  })

  const data = await response.json().catch(() => ({
    message: 'Unexpected response from activation server'
  }))

  return {
    ok: response.ok,
    status: response.status,
    data
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {})
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' })
  }

  const apiToken = process.env.KEYS_OVH_API_TOKEN
  const baseUrl = process.env.KEYS_OVH_BASE_URL || 'https://keys.ovh/api/v1'

  if (!apiToken) {
    return jsonResponse(500, { message: 'Activation is temporarily unavailable' })
  }

  let body

  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return jsonResponse(400, { message: 'Invalid request body' })
  }

  const { action, key, userToken } = body

  if (!action || !key) {
    return jsonResponse(400, { message: 'Missing required fields' })
  }

  try {
    if (action === 'check') {
      const result = await callUpstream({
        path: `/key/${encodeURIComponent(key)}/status`,
        apiToken,
        baseUrl
      })

      return jsonResponse(result.status, result.data)
    }

    if (action === 'redeem') {
      if (!userToken) {
        return jsonResponse(400, { message: 'Session token is required' })
      }

      const result = await callUpstream({
        path: '/activate',
        method: 'POST',
        payload: {
          key,
          user_token: userToken
        },
        apiToken,
        baseUrl
      })

      return jsonResponse(result.status, result.data)
    }

    return jsonResponse(400, { message: 'Unknown action' })
  } catch (error) {
    console.error('Activation function error:', error)
    return jsonResponse(500, { message: 'Activation is temporarily unavailable' })
  }
}
