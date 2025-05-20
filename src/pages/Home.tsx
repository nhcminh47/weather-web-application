import WeatherForecast from "@components/WeatherForecast"
import WeatherWidget from "@components/WeatherWidget"

const Home: React.FC = () => {
  return (
    <>
      <WeatherWidget />
      <WeatherForecast />
    </>
  )
}

export default Home
