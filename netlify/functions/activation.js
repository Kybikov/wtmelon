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

async function activateWithPrimary({ key, userToken, primaryUserToken, apiToken, baseUrl }) {
  if (!apiToken) {
    return {
      ok: false,
      status: 503,
      data: {
        message: 'Primary activation is temporarily unavailable'
      }
    }
  }

  const attempts = []
  const normalizedRawToken = normalizeTokenCandidate(userToken)

  if (primaryUserToken) {
    attempts.push(primaryUserToken)
  }

  if (normalizedRawToken && normalizedRawToken !== primaryUserToken) {
    attempts.push(normalizedRawToken)
  }

  if (!attempts.length) {
    return {
      ok: false,
      status: 422,
      data: {
        message: 'Unable to extract accessToken from the session data'
      }
    }
  }

  let lastResult = null

  for (const token of attempts) {
    const result = await callUpstream({
      path: '/activate',
      method: 'POST',
      payload: {
        key,
        user_token: token
      },
      apiToken,
      baseUrl
    })

    if (result.ok) {
      return result
    }

    lastResult = result
  }

  return lastResult
}

function getCookieHeader(response) {
  const getSetCookie = response.headers?.getSetCookie
    ? response.headers.getSetCookie()
    : null

  if (Array.isArray(getSetCookie) && getSetCookie.length > 0) {
    return getSetCookie.map((cookie) => cookie.split(';')[0]).join('; ')
  }

  const setCookie = response.headers?.get?.('set-cookie')
  if (!setCookie) {
    return ''
  }

  return setCookie
    .split(/,(?=[^;,\s]+=)/)
    .map((cookie) => cookie.split(';')[0].trim())
    .join('; ')
}

async function callKeysBatchCheck(key) {
  const landingResponse = await fetch('https://keys.ovh/batch-check', {
    method: 'GET'
  })

  const html = await landingResponse.text()
  const csrfMatch = html.match(/<meta name="csrf-token" content="([^"]+)"/i)
  const csrfToken = csrfMatch?.[1]
  const cookieHeader = getCookieHeader(landingResponse)

  if (!csrfToken || !cookieHeader) {
    throw new Error('Unable to initialize key lookup')
  }

  const response = await fetch('https://keys.ovh/api/keys/batch-check', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      Origin: 'https://keys.ovh',
      Referer: 'https://keys.ovh/batch-check',
      'X-CSRF-TOKEN': csrfToken,
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      codes: [key]
    })
  })

  const data = await response.json().catch(() => [])
  const item = Array.isArray(data) ? data[0] : null

  return {
    ok: response.ok,
    status: response.status,
    item,
    data
  }
}

async function callFallbackBatchCheck(key) {
  const response = await fetch('https://chong.databrain.sbs/api/vip/cdks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([key])
  })

  const data = await response.json().catch(() => ({
    code: 0,
    data: []
  }))

  return {
    ok: response.ok && data?.code === 1,
    status: response.status,
    item: Array.isArray(data?.data) ? data.data[0] : null,
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

function normalizeKeysBatchStatus(status) {
  if (status === 'used') return 'used'
  if (status === 'unused' || status === 'not_used' || status === 'available') return 'available'
  if (status === 'expired') return 'expired'
  if (status === 'invalid') return 'invalid'
  return 'unknown'
}

function normalizeFallbackStatus(status) {
  if (status === 'used') return 'used'
  if (status === 'not_used') return 'available'
  if (status === 'invalid') return 'invalid'
  return 'unknown'
}

function normalizeSubscriptionName(value) {
  if (!value) {
    return ''
  }

  return String(value)
    .replace(/\s*CDK\s*/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function normalizePrimaryDetails(item) {
  if (!item) {
    return null
  }

  return {
    source: 'primary',
    code: item.code || '',
    status: normalizeKeysBatchStatus(item.status),
    activatedAt: item.used_at || '',
    account: item.email || '',
    subscription: normalizeSubscriptionName(item.subscription),
    durationDays: item.duration_days || null
  }
}

function normalizeFallbackDetails(item) {
  if (!item) {
    return null
  }

  return {
    source: 'fallback',
    code: item.cdk || '',
    status: normalizeFallbackStatus(item.useStatus),
    activatedAt: item.usedAt || '',
    account: item.account || '',
    subscription: 'ChatGPT Plus',
    durationDays: 30
  }
}

function normalizeLegacyDetails(key, payload) {
  const rawStatus = payload?.data?.status || payload?.status || 'unknown'

  return {
    source: 'legacy',
    code: key,
    status: normalizeKeysBatchStatus(rawStatus),
    activatedAt: payload?.data?.used_at || payload?.used_at || '',
    account: payload?.data?.email || payload?.email || '',
    subscription: normalizeSubscriptionName(payload?.data?.subscription || payload?.subscription || ''),
    durationDays: payload?.data?.duration_days || payload?.duration_days || null
  }
}

function createNotFoundDetails(key) {
  return {
    source: 'none',
    code: key,
    status: 'invalid',
    activatedAt: '',
    account: '',
    subscription: '',
    durationDays: null
  }
}

function buildCheckResponse(details) {
  return {
    status: details.status,
    details,
    message: 'Key details loaded successfully'
  }
}

async function lookupKeyDetails({ key, apiToken, baseUrl }) {
  try {
    const primaryBatch = await callKeysBatchCheck(key)
    const primaryDetails = normalizePrimaryDetails(primaryBatch.item)

    if (primaryDetails && primaryDetails.status !== 'invalid') {
      return primaryDetails
    }
  } catch (error) {
    console.error('Primary batch check error:', error)
  }

  try {
    const fallbackBatch = await callFallbackBatchCheck(key)
    const fallbackDetails = normalizeFallbackDetails(fallbackBatch.item)

    if (fallbackDetails && fallbackDetails.status !== 'invalid') {
      return fallbackDetails
    }
  } catch (error) {
    console.error('Fallback batch check error:', error)
  }

  if (!apiToken) {
    return createNotFoundDetails(key)
  }

  const result = await callUpstream({
    path: `/key/${encodeURIComponent(key)}/status`,
    apiToken,
    baseUrl
  })

  const legacyDetails = normalizeLegacyDetails(key, result.data)

  return legacyDetails.status === 'unknown'
    ? createNotFoundDetails(key)
    : legacyDetails
}

function extractJsonValue(rawValue) {
  const value = typeof rawValue === 'string' ? rawValue.trim() : ''

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function extractAccountPayload(rawValue) {
  const value = typeof rawValue === 'string' ? rawValue.trim() : ''

  if (!value) {
    return ''
  }

  return extractJsonValue(value) || value
}

function normalizeTokenCandidate(candidate) {
  if (typeof candidate !== 'string') {
    return ''
  }

  const normalized = candidate.trim().replace(/^Bearer\s+/i, '')

  return normalized
}

function pickNestedToken(payload) {
  if (!payload || typeof payload !== 'object') {
    return ''
  }

  const directToken = normalizeTokenCandidate(
    payload.accessToken
    || payload.access_token
    || payload.token
    || payload.userToken
    || payload.user_token
    || payload.sessionToken
    || payload.session_token
  )

  if (directToken) {
    return directToken
  }

  const nestedSources = [
    payload.data,
    payload.session,
    payload.user,
    payload.tokens,
    payload.auth
  ]

  for (const source of nestedSources) {
    const nestedToken = pickNestedToken(source)
    if (nestedToken) {
      return nestedToken
    }
  }

  return ''
}

function extractPrimaryUserToken(rawValue) {
  const value = typeof rawValue === 'string' ? rawValue.trim() : ''

  if (!value) {
    return ''
  }

  const parsed = extractJsonValue(value)
  if (parsed) {
    return pickNestedToken(parsed)
  }

  return normalizeTokenCandidate(value)
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
      const details = await lookupKeyDetails({
        key,
        apiToken,
        baseUrl
      })

      if (details.status === 'invalid') {
        return jsonResponse(404, {
          status: 'invalid',
          details: createNotFoundDetails(key),
          message: 'Key not found'
        })
      }

      return jsonResponse(200, buildCheckResponse(details))
    }

    if (action === 'redeem') {
      if (!userToken) {
        return jsonResponse(400, { message: 'Session token is required' })
      }

      const accountPayload = extractAccountPayload(userToken)
      const primaryUserToken = extractPrimaryUserToken(userToken)
      const primaryResult = await activateWithPrimary({
        key,
        userToken,
        primaryUserToken,
        apiToken,
        baseUrl
      })

      if (primaryResult.ok) {
        const details = await lookupKeyDetails({
          key,
          apiToken,
          baseUrl
        })

        return jsonResponse(200, {
          success: true,
          status: 'used',
          details,
          message: 'Access activated successfully'
        })
      }

      const fallbackResult = await callFallbackActivation({
        key,
        account: accountPayload,
        fallbackUrl
      })

      if (fallbackResult.ok) {
        const details = await lookupKeyDetails({
          key,
          apiToken,
          baseUrl
        })

        return jsonResponse(200, {
          success: true,
          status: 'used',
          details,
          message: 'Access activated successfully'
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
