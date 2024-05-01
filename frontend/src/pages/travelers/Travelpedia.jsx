import Wrapper from '../../assets/wrappers/travelersWrappers/travelpedia'
import GoogleMap from '../../components/GoogleMap/GoogleMap'

const Travelpedia = ({ location, weather, futureWeather, date }) => {
  // console.log(date)
  return (
    <Wrapper>
      <div className="travelpediaContainer">
        <GoogleMap location={location} />
        {weather && (
          <div>
            <div className="currentWeather">
              <h1>Current weather</h1>
              <h2>temp - {weather.main.temp}C</h2>
              <h2>desc - {weather.weather[0].description}</h2>
              <h2>wind - {weather.wind.speed}</h2>
            </div>
            <div className="foreCastWeather">
              <h1>Weather for {date}</h1>
              <h2>temp - {futureWeather.temp}C</h2>
              <h2>desc - {futureWeather.desc}</h2>
              <h2>wind - {futureWeather.wind}</h2>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  )
}
export default Travelpedia
