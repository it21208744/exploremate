import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api, { tokenStore } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!tokenStore.get())

  useEffect(() => {
    if (!tokenStore.get()) return
    api
      .get('/auth/me')
      .then((r) => setUser(r.data.user))
      .catch(() => tokenStore.set(null))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onLogout = () => setUser(null)
    window.addEventListener('em:logout', onLogout)
    return () => window.removeEventListener('em:logout', onLogout)
  }, [])

  const applySession = useCallback(({ token, user: u }) => {
    if (token) tokenStore.set(token)
    setUser(u)
    return u
  }, [])

  const login = useCallback(async (email, password) => applySession((await api.post('/auth/login', { email, password })).data), [applySession])
  const register = useCallback(async (data) => applySession((await api.post('/auth/register', data)).data), [applySession])
  const logout = useCallback(() => {
    tokenStore.set(null)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, register, logout, applySession }), [user, loading, login, register, logout, applySession])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
