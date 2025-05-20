import { useAppDispatch, useAppSelector } from '@store/hook'
import { Card } from '../Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useLazyGetWeatherByCoordsQuery } from '@store/services/weatherApi'
import { setWeatherData } from '@store/slices/home'
import WeatherWidgetSkeleton from './WeatherWidgetSkeleton'
import { useFetchWeather } from '@hooks/useFetchWeather'

const WeatherWidget: React.FC = () => {
  const { location } = useAppSelector((state) => state.home)
  const { data } = useAppSelector((state) => state.home)
  const [trigger, { isLoading }] = useLazyGetWeatherByCoordsQuery()
  const dispatch = useAppDispatch()

  useFetchWeather({
    location,
    fetchFn: (coords) => trigger(coords).unwrap(),
    onSuccess: (data) => dispatch(setWeatherData(data))
  })

  const RenderComponent: React.FC = () => {
    return (
      <div className='weatherWidget__wrapper'>
        <div className='weatherWidget__header'>
          {new Date().toLocaleString(undefined, {
            dateStyle: 'long'
          })}
        </div>
        <div className='weatherWidget__summary'>
          <div className='weatherWidget__summary--temperature'>
            <div className='icon'>
              <img src={`https://openweathermap.org/img/wn/${data?.icon || '04n'}@2x.png`} alt='' />
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
                <FontAwesomeIcon icon={faArrowUp} style={{ rotate: `${data?.windDirection || 0}deg` }} />{' '}
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
    )
  }
  return <Card>{isLoading || !location ? <WeatherWidgetSkeleton /> : <RenderComponent />}</Card>
}

export default WeatherWidget
