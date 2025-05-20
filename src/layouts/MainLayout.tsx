import Header from '@components/Header'
import LoadingSpinner from '@components/LoadingSpinner'
import useDeviceLocation from '@hooks/useDeviceLocation'
import { useFetchWeather } from '@hooks/useFetchWeather'
import { useAppDispatch } from '@store/hook'
import { useLazyGetLocationsByQueryQuery } from '@store/services/locationApi'
import { setLocationData } from '@store/slices/home'
import { useEffect, useState } from 'react'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { location, locationError, fetchLocation } = useDeviceLocation()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  const [trigger] = useLazyGetLocationsByQueryQuery()

  useEffect(() => {
    fetchLocation(true)
  }, [fetchLocation])

  useFetchWeather({
    location,
    fetchFn: (coords) => trigger({ query: coords }).unwrap(),
    onSuccess: (data) => {
      setIsLoading(true)
      dispatch(setLocationData(data?.[0]))
    },
    onLoaded: () => setIsLoading(false)
  })

  const handleRetry = () => {
    fetchLocation(false)
  }

  if (locationError && !isLoading) {
    const errorMessage = locationError.message
    const isPermissionDenied = locationError.code === 1
    return (
      <div className='error-message'>
        <p>Location Error: {errorMessage}</p>
        {isPermissionDenied && <p>Please enable location permissions in your browser settings.</p>}
        <button onClick={handleRetry}>Retry Location (Standard Accuracy)</button>
      </div>
    )
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className='main__wrapper'>
        <div className='main__header'>
          <Header />
        </div>
        <div className='main__body'>{children}</div>
      </div>
    </>
  )
}

export default MainLayout
