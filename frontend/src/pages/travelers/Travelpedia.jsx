import Wrapper from '../../assets/wrappers/travelersWrappers/travelpedia'
import GoogleMap from '../../components/GoogleMap/GoogleMap'

const Travelpedia = ({ location }) => {
  return (
    <Wrapper>
      <div className="travelpediaContainer">
        <GoogleMap location={location} />
      </div>
    </Wrapper>
  )
}
export default Travelpedia
