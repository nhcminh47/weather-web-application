export interface WeatherApiResponse {
  coord: {
    lon: number
    lat: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: {
    id: number
    main: string // e.g., "Clouds", "Clear"
    description: string // e.g., "few clouds", "clear sky"
    icon: string
  }[]
  base: string
  visibility: number
  wind: {
    speed: number // m/s
    deg: number // degrees
    gust?: number // m/s
  }
  clouds: {
    all: number // percentage
  }
  dt: number // timestamp
  sys: {
    type: number
    id: number
    country: string // Country code (e.g., "US")
    sunrise: number // timestamp
    sunset: number // timestamp
  }
  timezone: number // Shift in seconds from UTC
  id: number // City ID
  name: string // City name
  cod: number // Internal parameter
}

export interface WeatherData {
  temperature: number // Celsius
  feelsLike: number
  minTemp: number
  maxTemp: number
  humidity: number // Percentage
  pressure: number // hPa
  windSpeed: number // m/s
  windDirection: number // degrees
  visibility: number
  conditions: string // e.g., "Clouds"
  description: string // e.g., "few clouds"
  icon: string
  location: {
    lat: number
    lon: number
    city: string
    country: string
  }
  timestamp: number // Data timestamp
  sunrise: number // Sunrise timestamp
  sunset: number // Sunset timestamp;
}

// Geolocation types
export interface GeoPosition {
  coords: {
    latitude: number
    longitude: number
    accuracy: number
    altitude?: number
    altitudeAccuracy?: number
    heading?: number
    speed?: number
  }
  timestamp: number
}

export interface GeoError {
  code: number
  message: string
}

//Forecast Data
export interface ForecastApiResponse {
  cod: string
  message: number
  cnt: number
  list: ForecastApiDataList[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

interface ForecastApiDataList {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  rain: {
    '3h': number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface ForecastData {
  date: number //timestamp
  dt_txt: string
  icon: string
  minTemperate: number
  maxTemperate: number
  description: string
}
