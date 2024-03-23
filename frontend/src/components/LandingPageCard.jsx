import Wrapper from '../assets/wrappers/travelersWrappers/LandingPageCard'

const LandingPageCard = ({ img, introduction, description }) => {
  return (
    <Wrapper>
      <div className="content">
        <h2>{introduction}</h2>
        <img src={img} alt="img" />
        <p>Short description about the functionality</p>
      </div>
    </Wrapper>
  )
}
export default LandingPageCard
