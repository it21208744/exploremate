import Wrapper from '../../assets/wrappers/travelersWrappers/travelpedia'
import GoogleMap from '../../components/GoogleMap/GoogleMap'

const Travelpedia = ({ location, weather }) => {
  console.log(weather)
  return (
    <Wrapper>
      <div className="travelpediaContainer">
        <GoogleMap location={location} />
        {weather && (
          <div>
            <h1>{weather.main.temp}C</h1>
            <h1>{weather.weather[0].description}</h1>
            <h1>{weather.wind.speed}</h1>
          </div>
        )}
      </div>
    </Wrapper>
  )
}
export default Travelpedia
