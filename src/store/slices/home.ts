import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LocationOption } from '@store/services/locationApi'
import type { ForecastData, WeatherData } from '@store/services/types'

interface Home {
  data: WeatherData | null
  forecast: Record<string, ForecastData[]> | null
  location: LocationOption | null
}

const initialState: Home = {
  data: null,
  forecast: null,
  location: null,
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      state.data = structuredClone(action.payload)
    },
    setForecastData: (state, action: PayloadAction<Record<string, ForecastData[]>>) => {
      state.forecast = structuredClone(action.payload)
    },
    setLocationData: (state, action: PayloadAction<Home['location']>) => {
      state.location = structuredClone(action.payload)
    },
  },
})

export const { setWeatherData, setForecastData, setLocationData } = homeSlice.actions

export default homeSlice.reducer
