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

async function callFallbackActivation({ key, account, fallbackUrl }) {
  const response = await fetch(fallbackUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cdk: key,
      account,
      sign: crypto.randomUUID(),
      timestamp: Date.now()
    })
  })

  const data = await response.json().catch(() => ({
    code: 0,
    message: 'Unexpected response from activation server'
  }))

  return {
    ok: response.ok && data?.code === 1,
    status: response.ok ? 200 : response.status,
    data
  }
}

function extractAccountPayload(rawValue) {
  const value = typeof rawValue === 'string' ? rawValue.trim() : ''

  if (!value) {
    return ''
  }

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function getClientMessage(result) {
  if (!result?.data) {
    return ''
  }

  return result.data.message || result.data.error || ''
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
  const fallbackUrl = process.env.FALLBACK_ACTIVATION_URL || 'https://chong.databrain.sbs/api/vip/r'

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
      if (!apiToken) {
        return jsonResponse(500, { message: 'Activation is temporarily unavailable' })
      }

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

      const accountPayload = extractAccountPayload(userToken)
      const primaryResult = apiToken
        ? await callUpstream({
            path: '/activate',
            method: 'POST',
            payload: {
              key,
              user_token: userToken
            },
            apiToken,
            baseUrl
          })
        : {
            ok: false,
            status: 503,
            data: {
              message: 'Primary activation is temporarily unavailable'
            }
          }

      if (primaryResult.ok) {
        return jsonResponse(primaryResult.status, primaryResult.data)
      }

      const fallbackResult = await callFallbackActivation({
        key,
        account: accountPayload,
        fallbackUrl
      })

      if (fallbackResult.ok) {
        return jsonResponse(200, {
          ...fallbackResult.data,
          message: fallbackResult.data?.message || 'Access activated successfully'
        })
      }

      return jsonResponse(primaryResult.status >= 500 ? 502 : primaryResult.status, {
        message: getClientMessage(fallbackResult) || getClientMessage(primaryResult) || 'Activation is temporarily unavailable'
      })
    }

    return jsonResponse(400, { message: 'Unknown action' })
  } catch (error) {
    console.error('Activation function error:', error)
    return jsonResponse(500, { message: 'Activation is temporarily unavailable' })
  }
}
