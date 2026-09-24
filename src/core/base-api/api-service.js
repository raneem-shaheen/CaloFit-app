import { API_BASE_URL } from '../../config/env'

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

  request(path, options = {}) {
    return fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }).then(async (response) => {
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      return response.json()
    })
  }
}
