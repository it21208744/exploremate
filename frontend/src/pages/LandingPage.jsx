import Wrapper from '../assets/wrappers/travelersWrappers/LandingPage'
import LandingPageCard from '../components/LandingPageCard'
import artificial_intelligence from '../assets/images/LandingPage/artificial_intelligence.svg'
const LandingPage = () => {
  window.addEventListener('scroll', function () {
    var header = document.querySelector('h1')
    var scrollPosition = window.pageYOffset

    if (scrollPosition > 10) {
      header.classList.add('small')
    } else {
      header.classList.remove('small')
    }
  })

  return (
    <Wrapper>
      <div className="landingPageContainer">
        <h1>ExploreMate</h1>
        <div className="btns">
          <button className="btnLogin">Login</button>
          <button className="btnRegister">Register</button>
        </div>

        {/* need to make this a seperate function and customize this more with css and add other stuffs too, like scrolling animations */}
        <div className="websiteInfo">
          <LandingPageCard
            img={artificial_intelligence}
            introduction={
              'Let artificial intelligence guide your trip planning process.'
            }
          />
        </div>
      </div>
    </Wrapper>
  )
}
export default LandingPage
