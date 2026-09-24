const sanitizeBaseUrl = (value = '') => {
  if (typeof value !== 'string') return 'http://localhost:8080'

  const trimmed = value.trim()
  if (!trimmed) return 'http://localhost:8080'

  return trimmed
    .replace(/0\.0\.0\.0:8080/g, 'localhost:8080')
    .replace(/127\.0\.0\.1:8080/g, 'localhost:8080')
    .replace(/\/+$|\s+$/g, '')
}

export const API_BASE_URL = sanitizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CaloFit'
