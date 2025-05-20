import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ForecastApiRequest, ForecastApiResponse, ForecastData } from '../../types/weather'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_FORECAST_URL = import.meta.env.VITE_OPENWEATHER_API_BASE_FORECAST_URL

export const forecastApi = createApi({
  reducerPath: 'forecastApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_FORECAST_URL }),
  endpoints: (builder) => ({
    getForecastWeather: builder.query<Record<string, ForecastData[]>, ForecastApiRequest>({
      query: ({ lat, lon }) => `?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`,
      transformResponse: (response: ForecastApiResponse): Record<string, ForecastData[]> => {
        if (!response || !response.list) return {}
        return response.list.reduce<Record<string, ForecastData[]>>((acc, item) => {
          const key = new Date(item.dt * 1000).toLocaleDateString(undefined, {
            dateStyle: 'long'
          })
          const forecast: ForecastData = {
            date: item.dt,
            dt_txt: item.dt_txt,
            icon: item.weather[0].icon,
            minTemperate: item.main.temp_min,
            maxTemperate: item.main.temp_max,
            description: item.weather[0].description
          }
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(forecast)
          return acc
        }, {})
      }
    })
  })
})

export const { useGetForecastWeatherQuery, useLazyGetForecastWeatherQuery } = forecastApi
export const { getForecastWeather } = forecastApi.endpoints
