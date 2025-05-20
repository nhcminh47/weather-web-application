import { Card } from '@components/Card'
import { useAppSelector } from '@store/hook'
import { useLazyGetForecastWeatherQuery } from '@store/services/forecastApi'
import { setForecastData } from '@store/slices/home'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import WeatherForecastSkeleton from './WeatherForecastSkeleton'

const WeatherForecast: React.FC = () => {
  const { location } = useAppSelector((state) => state.home)
  const { forecast } = useAppSelector((state) => state.home)
  const [trigger, { isLoading }] = useLazyGetForecastWeatherQuery()
  const dispatch = useDispatch()
  const hasFetched = useRef(false)
  const mapDate = Object.keys(forecast || {})

  const fetchForecast = async () => {
    if (!location || hasFetched.current) return
    hasFetched.current = true
    try {
      const result = await trigger(location.value).unwrap()
      dispatch(setForecastData(result))
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
    <>
      <div className='weatherForecast__title'>5-day Forecast (3 Hours)</div>
      <Card>
        {isLoading || !location ? (
          <WeatherForecastSkeleton />
        ) : (
          <div className='weatherForecast__wrapper'>
            <div className='weatherForecast__daily'>
              {mapDate.map((date, idx1) => {
                return (
                  <React.Fragment key={idx1}>
                    <div className='weatherForecast__daily--date'>{date}</div>
                    {forecast![date].map((timeline, idx2) => {
                      return (
                        <React.Fragment key={idx2}>
                          <div className='weatherForecast__daily--timeline'>
                            <div className='time'>
                              {new Date(timeline.date * 1000).toLocaleString(undefined, {
                                timeStyle: 'short',
                                hour12: false,
                              })}
                            </div>
                            <div className='temperature'>
                              <img
                                src={`https://openweathermap.org/img/wn/${timeline.icon || '04n'}@2x.png`}
                                alt=''
                              />
                              <span>
                                {timeline.minTemperate}/{timeline.maxTemperate} <sup>o</sup>C
                              </span>
                            </div>
                            <div className='weather'>{timeline.description}</div>
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )}
      </Card>
    </>
  )
}

export default WeatherForecast
