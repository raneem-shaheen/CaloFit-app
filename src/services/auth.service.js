import { ApiService } from '../core/base-api/api-service'

const api = new ApiService()

export const authService = {
  
  async login(credentials) {
    return api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  async register(formData){
    return api.request('/auth/register',{
      method : 'POST',
      body : formData,
    })
  },

  async getPofile(){
    return api.request('/auth/me',{
      method: 'GET'
    })
  },

async refreshToken(refreshToken) {
    return api.request('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  },
  
  async logout(refreshToken){
    return api.request('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}