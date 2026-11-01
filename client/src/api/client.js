import axios from 'axios'

const TOKEN_KEY = 'em_token'

export const tokenStore = {
  get: () => {
    try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set: (t) => {
    try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) } catch { /* ignore */ }
  },
}

const api = axios.create({ baseURL: '/api/v1', timeout: 90000 })

api.interceptors.request.use((config) => {
  const token = tokenStore.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && tokenStore.get() && !error.config.url.includes('/auth/login')) {
      tokenStore.set(null)
      window.dispatchEvent(new Event('em:logout'))
    }
    return Promise.reject(error)
  }
)

/** Human-readable error message from an axios error. */
export const errorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
  if (err?.code === 'ECONNABORTED') return 'The request took too long. Please try again.'
  if (!err?.response) return 'Cannot reach the ExploreMate server. Is it running?'
  return err.response.data?.message || fallback
}

/** Field → message map from a validation error. */
export const fieldErrors = (err) =>
  Object.fromEntries((err?.response?.data?.details || []).map((d) => [d.field, d.message]))

export default api
