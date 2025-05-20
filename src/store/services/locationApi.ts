import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_GEOCODING_URL = import.meta.env.VITE_OPENWEATHER_API_BASE_GEOCODING_URL

export interface LocationOption {
  value: { lat: number; lon: number }
  label: string
  name: string
  country: string
  state?: string
}
export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_GEOCODING_URL }),
  endpoints: (builder) => ({
    getLocationsByQuery: builder.query<LocationOption[], string | { lat: number; lon: number }>({
      query: (query) =>
        typeof query === 'object'
          ? {
              url: `/reverse`,
              params: {
                lat: query.lat,
                lon: query.lon,
                limit: 5,
                appid: OPENWEATHER_API_KEY,
              },
            }
          : {
              url: `/direct`,
              params: {
                q: query,
                limit: 5,
                appid: OPENWEATHER_API_KEY,
              },
            },

      transformResponse: (rawResponse: any[]): LocationOption[] => {
        if (!rawResponse) return []
        return rawResponse.map((item: any) => ({
          value: { lat: item.lat, lon: item.lon },
          label: `${item.name}${item.state ? ', ' + item.state : ''}, ${item.country}`,
          name: item.name,
          country: item.country,
          state: item.state,
        }))
      },
    }),
  }),
})

export const { useGetLocationsByQueryQuery, useLazyGetLocationsByQueryQuery } = locationApi
export const { getLocationsByQuery } = locationApi.endpoints
