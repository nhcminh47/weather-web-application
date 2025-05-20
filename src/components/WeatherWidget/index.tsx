import { useAppDispatch, useAppSelector } from '@store/hook'
import { Card } from '../Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useLazyGetWeatherByCoordsQuery } from '@store/services/weatherApi'
import { useEffect, useRef } from 'react'
import { setWeatherData } from '@store/slices/home'
import WeatherWidgetSkeleton from './WeatherWidgetSkeleton'

const WeatherWidget: React.FC = () => {
  const { location } = useAppSelector((state) => state.home)
  const { data } = useAppSelector((state) => state.home)
  const [trigger, { isLoading }] = useLazyGetWeatherByCoordsQuery()
  const dispatch = useAppDispatch()
  const hasFetched = useRef(false)
  const fetchForecast = async () => {
    if (!location || hasFetched.current) return
    hasFetched.current = true
    try {
      const result = await trigger(location.value).unwrap()
      dispatch(setWeatherData(result))
    } catch (error) {
      console.error('Failed to fetch forecast', error)
    } finally {
    }
  }
  useEffect(() => {
    if (location) {
      fetchForecast()
    }
  }, [location])

  return (
    <Card>
      {isLoading || !location ? (
        <WeatherWidgetSkeleton />
      ) : (
        <div className='weatherWidget__wrapper'>
          <div className='weatherWidget__header'>
            {new Date().toLocaleString(undefined, {
              dateStyle: 'long',
            })}
          </div>
          <div className='weatherWidget__summary'>
            <div className='weatherWidget__summary--temperature'>
              <div className='icon'>
                <img
                  src={`https://openweathermap.org/img/wn/${data?.icon || '04n'}@2x.png`}
                  alt=''
                />
              </div>
              <div className='info'>
                <span className='meter'>
                  {data?.temperature || 0}
                  <sup>o</sup>C
                </span>
                <span className='status'>{data?.conditions || ''}</span>
              </div>
            </div>
            <div className='weatherWidget__summary--other'>
              <div className='block'>
                <span className='text'>Humidity</span>
                <span className='meter'>{data?.humidity || 0}%</span>
              </div>
              <div className='block'>
                <span className='text'>Winds</span>
                <span className='meter'>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{ rotate: `${data?.windDirection || 0}deg` }}
                  />{' '}
                  {data?.windSpeed} m/s
                </span>
              </div>
              <div className='block'>
                <span className='text'>Visibility</span>
                <span className='meter'>{(data?.visibility || 0) / 1000} km</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default WeatherWidget
