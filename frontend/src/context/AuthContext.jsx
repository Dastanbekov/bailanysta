import { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for token on initial load
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    
    try {
      // Verify token validity
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000
      
      if (decoded.exp < currentTime) {
        // Token expired, try to refresh
        await refreshToken()
      } else {
        // Token valid, set user
        setUser({
          username: decoded.username,
          userId: decoded.user_id
        })
        setLoading(false)
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      logout()
      setLoading(false)
    }
  }

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    
    if (!refresh) {
      logout()
      return
    }
    
    try {
      const response = await api.post('/api/token/refresh/', {
        refresh
      })
      
      localStorage.setItem(ACCESS_TOKEN, response.data.access)
      
      const decoded = jwtDecode(response.data.access)
      setUser({
        username: decoded.username,
        userId: decoded.user_id
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/token/', {
        username,
        password
      })
      
      localStorage.setItem(ACCESS_TOKEN, response.data.access)
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
      
      const decoded = jwtDecode(response.data.access)
      setUser({
        username: decoded.username,
        userId: decoded.user_id
      })
      
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка авторизации'
      }
    }
  }

  const register = async (userData) => {
    try {
      await api.post('/api/register/', userData)
      
      // Auto login after successful registration
      return await login(userData.username, userData.password)
    } catch (error) {
      console.error('Registration failed:', error)
      return { 
        success: false,
        error: error.response?.data || 'Ошибка регистрации'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    setUser(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading,
        login,
        register,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 