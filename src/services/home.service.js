const HOME_URL = '/api/home'
const CONTACT_URL = '/api/home/contact-us'
const API_HEADERS = {
  'ngrok-skip-browser-warning': 'true',
  'Content-Type': 'application/json',
}

function unwrapResponse(payload) {
  return payload?.data?.data ?? payload?.data ?? payload
}

async function requestJson(url) {
  try {
    const response = await fetch(url, {
      headers: API_HEADERS,
    })
    const body = await response.text()
    let payload

    try {
      payload = body ? JSON.parse(body) : null
    } catch {
      const error = new Error(`Expected JSON from ${url}, received non-JSON content`)
      error.response = { data: body, status: response.status }
      throw error
    }

    if (!response.ok) {
      const error = new Error(`Request failed with status ${response.status}`)
      error.response = { data: payload, status: response.status }
      throw error
    }

    return unwrapResponse(payload)
  } catch (error) {
    console.error(`[home.service] Request failed: ${url}`, error.response?.data || error.message)
    throw error
  }
}

export function fetchHomeData() {
  return requestJson(HOME_URL)
}

export function fetchContactUs() {
  return requestJson(CONTACT_URL)
}
