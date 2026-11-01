import { useCallback, useEffect, useState } from 'react'
import api, { errorMessage } from '../api/client'

/** Tiny data hook: const { data, loading, error, reload, setData } = useFetch('/hotels/mine') */
export default function useFetch(url, { params, skip = false, initial = null } = {}) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState(null)
  const key = JSON.stringify(params || {})

  const reload = useCallback(async () => {
    if (!url) return
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(url, { params: JSON.parse(key) })
      setData(res.data)
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setLoading(false)
    }
  }, [url, key])

  useEffect(() => {
    if (!skip) reload()
  }, [reload, skip])

  return { data, setData, loading, error, reload }
}
