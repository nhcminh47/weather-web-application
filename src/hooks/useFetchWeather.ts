import { useEffect, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'

type FetchFunction<T> = (coords: { lat: number; lon: number }) => Promise<T>
type DispatchFunction<T> = (data: T) => void

interface UseFetchOnLocationOptions<T> {
  location: { value: { lat: number; lon: number } } | null
  fetchFn: FetchFunction<T>
  onSuccess: DispatchFunction<T>
  onLoaded?: () => void
}

export function useFetchWeather<T>({ location, fetchFn, onSuccess, onLoaded }: UseFetchOnLocationOptions<T>) {
  const hasFetched = useRef(false)

  const fetchData = useCallback(async () => {
    if (!location || hasFetched.current) return
    hasFetched.current = true

    try {
      const result = await fetchFn(location.value)
      onSuccess(result)
    } catch (error) {
      console.error('Failed to fetch data', error)
      toast.error('Failed to fetch data')
    } finally {
      onLoaded?.()
    }
  }, [location, fetchFn, onSuccess])

  useEffect(() => {
    if (location) fetchData()
  }, [location, fetchData])
}
