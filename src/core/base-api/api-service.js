import { API_BASE_URL } from '../../config/env'

const ACCESS_TOKEN_KEY = 'calofit_access_token'
const REFRESH_TOKEN_KEY = 'calofit_refresh_token'
const USER_KEY = 'calofit_user'
export const AUTH_SESSION_EXPIRED_EVENT = 'calofit:auth-session-expired'

let refreshPromise = null

const extractErrorMessage = (message) => {
  if (typeof message === 'string') return message

  if (message && typeof message === 'object') {
    const language = document.documentElement.lang?.toLowerCase().split('-')[0]
    return message[language] || message.en || message.ar || 'Something went wrong'
  }

  return 'Something went wrong'
}

const sanitizeBaseUrl = (value = '') => {
  if (typeof value !== 'string') return 'http://localhost:8080'

  return value
    .trim()
    .replace(/0\.0\.0\.0:8080/g, 'localhost:8080')
    .replace(/127\.0\.0\.1:8080/g, 'localhost:8080')
    .replace(/\/+$|\s+$/g, '')
}

export class ApiService {
  constructor(options = {}) {
    this.baseUrl = sanitizeBaseUrl(options.baseURL || API_BASE_URL)
  }

  buildUrl(endpoint) {
    if (/^https?:\/\//i.test(endpoint)) return endpoint
    if (endpoint.startsWith('/api/')) return endpoint
    return `/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  }

  clearSession() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT))
  }

  async refreshAccessToken() {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
        if (!refreshToken) throw new Error('No refresh token available')

        const response = await fetch(this.buildUrl('/auth/refresh-token'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        })
        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(extractErrorMessage(data?.message) || 'Token refresh failed')
        }

        const refreshedSession = data?.data || data
        const accessToken = refreshedSession?.accessToken || refreshedSession?.token
        if (!accessToken) throw new Error('Token refresh response did not include an access token')

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        if (refreshedSession.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshedSession.refreshToken)
        }

        return accessToken
      })().finally(() => {
        refreshPromise = null
      })
    }

    return refreshPromise
  }

  async request(endpoint, options = {}) {
    const { headers = {}, body, _retry = false, ...customOptions } = options
    const requestHeaders = { ...headers }
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const contentTypeHeader = Object.keys(requestHeaders).find(
      (header) => header.toLowerCase() === 'content-type',
    )
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

    if (accessToken) requestHeaders.Authorization = `Bearer ${accessToken}`

    if (isFormData) {
      if (contentTypeHeader) delete requestHeaders[contentTypeHeader]
    } else if (!contentTypeHeader) {
      requestHeaders['Content-Type'] = 'application/json'
    }

    const response = await fetch(this.buildUrl(endpoint), {
      ...customOptions,
      headers: requestHeaders,
      body,
    })

    const isRefreshRequest = /\/auth\/refresh-token(?:[/?#]|$)/.test(endpoint)
    const isAuthRequest = /\/auth\/(?:login|register|refresh-token)(?:[/?#]|$)/.test(endpoint)
    if (response.status === 401) {
      if (isRefreshRequest || (_retry && !isAuthRequest)) {
        this.clearSession()
      } else if (!isAuthRequest) {
        try {
          const newAccessToken = await this.refreshAccessToken()
          return this.request(endpoint, {
            ...options,
            _retry: true,
            headers: { ...headers, Authorization: `Bearer ${newAccessToken}` },
          })
        } catch (error) {
          this.clearSession()
          throw error
        }
      }
    }

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const errorMsg = extractErrorMessage(data?.message)
      const error = new Error(errorMsg)
      error.response = { data, status: response.status }
      throw error
    }

    return data
  }
}