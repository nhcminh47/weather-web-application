import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { LocationApiRequest, LocationApiResponse } from 'types/weather'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_GEOCODING_URL = import.meta.env.VITE_OPENWEATHER_API_BASE_GEOCODING_URL

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_GEOCODING_URL }),
  endpoints: (builder) => ({
    getLocationsByQuery: builder.query<LocationApiResponse[], LocationApiRequest>({
      query: ({ query }) => {
        const isCoordQuery = typeof query === 'object'
        const endpoint = isCoordQuery ? '/reverse' : '/direct'
        const params = isCoordQuery
          ? { lat: query.lat, lon: query.lon, limit: 5, appid: OPENWEATHER_API_KEY }
          : { q: query, limit: 5, appid: OPENWEATHER_API_KEY }

        return { url: endpoint, params }
      },
      transformResponse: (rawResponse: any[]): LocationApiResponse[] => {
        if (!rawResponse) return []
        return rawResponse.map((item: any) => ({
          value: { lat: item.lat, lon: item.lon },
          label: `${item.name}${item.state ? ', ' + item.state : ''}, ${item.country}`,
          name: item.name,
          country: item.country,
          state: item.state
        }))
      }
    })
  })
})

export const { useGetLocationsByQueryQuery, useLazyGetLocationsByQueryQuery } = locationApi
export const { getLocationsByQuery } = locationApi.endpoints
