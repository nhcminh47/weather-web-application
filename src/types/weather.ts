//Geolocation Types
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

//Weather API
export interface WeatherApiRequest {
  lat: number
  lon: number
}

export interface Coordinates {
  lat: number
  lon: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface TemperatureInfo {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface WindInfo {
  speed: number
  deg: number
  gust?: number
}

export interface CloudCoverage {
  all: number
}

export interface SystemInfo {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

export interface WeatherApiResponse {
  coord: Coordinates
  weather: WeatherCondition[]
  base: string
  main: TemperatureInfo
  visibility: number
  wind: WindInfo
  clouds: CloudCoverage
  dt: number
  sys: SystemInfo
  timezone: number
  id: number
  name: string
  cod: number
}

export interface WeatherData {
  temperature: number
  feelsLike: number
  minTemp: number
  maxTemp: number
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: number
  visibility: number
  conditions: string
  description: string
  icon: string
  location: {
    lat: number
    lon: number
    city: string
    country: string
  }
  timestamp: number
  sunrise: number
  sunset: number
}

//Forecast API
export interface ForecastApiRequest {
  lat: number
  lon: number
}

export interface ForecastApiResponse {
  cod: string
  message: number
  cnt: number
  list: ForecastApiEntry[]
  city: ForecastCity
}

export interface ForecastCity {
  id: number
  name: string
  coord: Coordinates
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface ForecastApiEntry {
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
  weather: WeatherCondition[]
  clouds: CloudCoverage
  wind: WindInfo
  visibility: number
  pop: number
  rain?: {
    '3h': number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface ForecastData {
  date: number
  dt_txt: string
  icon: string
  minTemperate: number
  maxTemperate: number
  description: string
}
//Location API
export interface LocationApiRequest {
  query: string | Coordinates
}
export interface LocationApiResponse {
  value: Coordinates
  label: string
  name: string
  country: string
  state?: string
}
