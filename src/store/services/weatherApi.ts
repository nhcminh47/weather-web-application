import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { WeatherApiResponse, WeatherData } from '../../types/weather'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const OPENWEATHER_API_BASE_URL = import.meta.env.VITE_OPENWEATHER_API_BASE_URL

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: OPENWEATHER_API_BASE_URL }),
  endpoints: (builder) => ({
    getWeatherByCoords: builder.query<WeatherData, { lat: number; lon: number }>({
      query: ({ lat, lon }) => `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`,
      transformResponse: (response: WeatherApiResponse): WeatherData => ({
        temperature: response.main.temp,
        feelsLike: response.main.feels_like,
        minTemp: response.main.temp_min,
        maxTemp: response.main.temp_max,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
        windSpeed: response.wind.speed,
        windDirection: response.wind.deg,
        visibility: response.visibility,
        conditions: response.weather[0].main,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        location: {
          lat: response.coord.lat,
          lon: response.coord.lon,
          city: response.name,
          country: response.sys.country
        },
        timestamp: response.dt,
        sunrise: response.sys.sunrise,
        sunset: response.sys.sunset
      })
    })
  })
})

export const { useGetWeatherByCoordsQuery, useLazyGetWeatherByCoordsQuery } = weatherApi
