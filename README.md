# 🌤️ Weather Web Application

A modern weather web app built with **React**, **TypeScript**, **Vite**, and **Redux Toolkit**. It fetches real-time weather and forecast data from the **OpenWeather API** and displays it in a clean, responsive UI.

---

## 🎉 Project Features

- Current weather summary
- 5-day forecast by 3 hours
- Search & history

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/nhcminh47/weather-web-application.git
cd weather-web-application
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

🔑 You can get an API key from https://openweathermap.org/api

### 4.Start the development server

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### 5. Project Folder Structure

```Folder Struc
weather-web-application/
├── public/
│   └── index.html
├── src/
│   ├── assets/                          # Stores images and other static assets.
│   │   └── images/                      # Contains images
│   ├── components/                      # Contains reusable UI components
│   ├── hooks/                           # Includes custom React hooks
│   ├── pages/                           # Defines page-level components
│   ├── scss/                            # Styling that includes base style
│   ├── store/                           # Manages Redux store configuration, API services, and slices
│   │   ├── services/                    # Contain API Services used RTK Query
│   │   └── slices/                      # Reducers
│   ├── types/                           # Defines TypeScript interfaces and types
│   ├── App.tsx                          # The main application component.
│   ├── main.tsx                         # The entry point for the application.
├── .env                                 # Environment variables
├── .gitignore                           # Specifies files to be ignored by Git
├── .eslintrc.js                         # ESLint configuration
├── .prettierrc                          # Prettier configuration
├── index.html                           # The main HTML file
├── package-lock.json                    # Locks the versions of installed packages
├── package.json                         # Manages project dependencies and scripts
├── tsconfig.app.json                    # TypeScript configuration for the application
├── tsconfig.json                        # Base TypeScript configuration
├── tsconfig.node.json                   # TypeScript configuration for Node.js
└── vite.config.ts                       # Vite configuration file
```

---

## 🪝Custom Hook

`useFetchOnLocation` : Reusable hook for auto-fetching data when the user's location changes.

```typescript
import { useEffect, useRef, useCallback } from 'react'

type FetchFunction<T> = (coords: { lat: number; lon: number }) => Promise<T>
type DispatchFunction<T> = (data: T) => void

interface UseFetchOnLocationOptions<T> {
  location: { value: { lat: number; lon: number } } | null
  fetchFn: FetchFunction<T>
  onSuccess: DispatchFunction<T>
  onLoaded?: () => void
}

export function useFetchWeather<T>({ location, fetchFn, onSuccess, onLoaded }: UseFetchOnLocationOptions<T>) {
  const hasFetched = useRef(false)

  const fetchData = useCallback(async () => {
    if (!location || hasFetched.current) return
    hasFetched.current = true

    try {
      const result = await fetchFn(location.value)
      onSuccess(result)
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      onLoaded?.()
    }
  }, [location, fetchFn, onSuccess])

  useEffect(() => {
    if (location) fetchData()
  }, [location, fetchData])
}
```

##### Usage Example

```typescript
useFetchWeather({
  location,
  fetchFn: (coords) => trigger({ query: coords }).unwrap(),
  onSuccess: (data) => {
    setIsLoading(true)
    dispatch(setLocationData(data?.[0]))
  },
  onLoaded: () => setIsLoading(false)
})
```

---

## 🌍 API Fetching

### Weather API

- Uses [OpenWeather API](https://openweathermap.org/api) to fetch:
  - Current weather
  - 5-day forecast
  - Location autocomplete

## Technology Used

- React + Vite
- TypeScript
- Redux Toolkit + RTK Query
- SCSS Module
- OpenWeather API
