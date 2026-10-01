/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AUTH_SESSION_EXPIRED_EVENT } from '../core/base-api/api-service'
import { authService } from '../services/auth.service'
import { formatAuthResponse } from '../services/dtos/auth.dto'

const AuthContext = createContext(null)

const ACCESS_TOKEN_KEY= 'calofit_access_token'
const REFRESH_TOKEN_KEY = 'calofit_refresh_token'
const USER_KEY = 'calofit_user'

export function AuthProvider ({ children }){
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem(ACCESS_TOKEN_KEY) || null)
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem(REFRESH_TOKEN_KEY) || null)
    const [user, setUser]= useState(() => {
        try{
            const savedUser = localStorage.getItem(USER_KEY)
            return savedUser ? JSON.parse(savedUser) : null 
        } catch{
            return null
        }
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const handleSessionExpired = () => {
        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
      }

      window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired)
      return () => window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired)
    }, [])

    const  handleAuthSuccess = (rawResponse) => {
    const { accessToken: newAccess, refreshToken: newRefresh, user: newUser } = formatAuthResponse(rawResponse)

    if (newAccess) {
      setAccessToken(newAccess)
      localStorage.setItem(ACCESS_TOKEN_KEY, newAccess)
    }

    if (newRefresh) {
      setRefreshToken(newRefresh)
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh)
    }
    
   if (newUser && newUser.id) {
      setUser(newUser)
      localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }

    return { accessToken: newAccess, refreshToken: newRefresh, user: newUser }
  }

  const login = async (credentials) => {
    try {
      setLoading(true)
      const res = await authService.login(credentials)
      return handleAuthSuccess(res)
    } finally {
      setLoading(false)
    }
  }

 
  const register = async (formData) => {
    try {
      setLoading(true)
      const res = await authService.register(formData)
      return handleAuthSuccess(res)
    } finally {
      setLoading(false)
    }
  }

 const refreshSession = async () => {
    const currentRefresh = refreshToken || localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!currentRefresh) {
      logout()
      return null
    }

    try {
      const res = await authService.refreshToken(currentRefresh)
      return handleAuthSuccess(res)
    } catch {
      logout()
      return null
    }
  }


  const logout = async () => {
    const currentRefresh = refreshToken || localStorage.getItem(REFRESH_TOKEN_KEY)
    try {
      setLoading(true)
      if (currentRefresh) {
        await authService.logout(currentRefresh).catch((err) => {
          console.warn('Logout API failed, clearing local state anyway:', err)
        })
      }
    } finally {
      setAccessToken(null)
      setRefreshToken(null)
      setUser(null)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      setLoading(false)
    }
  }
  const value = {
    user,
    token:accessToken,
    accessToken,
    refreshToken,
    isAuthenticated: Boolean(accessToken), 
    loading,
    login,
    register,
    refreshSession,
    logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}