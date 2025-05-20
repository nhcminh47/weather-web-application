// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { forecastApi } from './services/forecastApi'
import { locationApi } from './services/locationApi'
import { weatherApi } from './services/weatherApi'
import homeReducer from './slices/home'
export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [forecastApi.reducerPath]: forecastApi.reducer,
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware).concat(locationApi.middleware).concat(forecastApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
