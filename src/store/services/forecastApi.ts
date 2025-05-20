import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ForecastApiResponse, ForecastData } from './types'
import type { LocationOption } from './locationApi'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_FORECAST_URL = import.meta.env.VITE_OPENWEATHER_API_BASE_FORECAST_URL

export const forecastApi = createApi({
  reducerPath: 'forecastApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_FORECAST_URL }),
  endpoints: (builder) => ({
    getForecastWeather: builder.query<Record<string, ForecastData[]>, LocationOption['value']>({
      query: ({ lat, lon }) => `?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`,

      transformResponse: (response: ForecastApiResponse): Record<string, ForecastData[]> => {
        if (!response) return {}
        const res: Record<string, ForecastData[]> = {}
        response.list.forEach((item) => {
          const key = new Date(item.dt * 1000).toLocaleString(undefined, {
            dateStyle: 'long',
          })
          
          if (res[key]) {
            res[key].push({
              date: item.dt,
              dt_txt: item.dt_txt,
              icon: item.weather[0].icon,
              minTemperate: item.main.temp_min,
              maxTemperate: item.main.temp_max,
              description: item.weather[0].description,
            })
          } else {
            res[key] = [
              {
                date: item.dt,
                dt_txt: item.dt_txt,
                icon: item.weather[0].icon,
                minTemperate: item.main.temp_min,
                maxTemperate: item.main.temp_max,
                description: item.weather[0].description,
              },
            ]
          }
        })
        return res
      },
    }),
  }),
})

export const { useGetForecastWeatherQuery, useLazyGetForecastWeatherQuery } = forecastApi
export const { getForecastWeather } = forecastApi.endpoints
