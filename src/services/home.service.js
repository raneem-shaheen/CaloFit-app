import { ApiService } from '../core/base-api/api-service'

const HOME_URL = '/api/home'
const CONTACT_URL = '/api/home/contact-us'
const api = new ApiService()
const API_HEADERS = {
  'ngrok-skip-browser-warning': 'true',
  'Content-Type': 'application/json',
}

function unwrapResponse(payload) {
  return payload?.data?.data ?? payload?.data ?? payload
}

async function requestJson(url) {
  try {
    const payload = await api.request(url, { headers: API_HEADERS })
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
