import { API_BASE_URL } from '../../config/env'

export class ApiService {
  constructor(options = {}) {
    this.baseUrl = options.baseURL || API_BASE_URL
  }

  request(path, options = {}) {
    return fetch(`${this.baseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    }).then(async (response) => {
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      return response.json()
    })
  }
}
