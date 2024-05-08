import Wrapper from '../assets/wrappers/travelersWrappers/LandingPage'
import LandingPageCard from '../components/LandingPageCard'
import artificial_intelligence from '../assets/images/LandingPage/artificial_intelligence.svg'
import { NavLink } from 'react-router-dom'
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
          <NavLink className="btnLogin" to="Login">
            Login
          </NavLink>
          <NavLink className="btnRegister" to="register">
            Register
          </NavLink>
        </div>

        {/* need to make this a seperate function and customize this more with css and add other stuffs too, like scrolling animations */}
        <div className="websiteInfo">
          <LandingPageCard
            img={artificial_intelligence}
            introduction={
              'Let artificial intelligence guide your trip planning process.'
            }
          />
          <LandingPageCard
            img={artificial_intelligence}
            introduction={'Book your preferred Hotel'}
          />
          <LandingPageCard
            img={artificial_intelligence}
            introduction={'Register your business here'}
          />
        </div>
      </div>
    </Wrapper>
  )
}
export default LandingPage
