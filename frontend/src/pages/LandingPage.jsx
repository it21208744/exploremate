import Wrapper from '../assets/wrappers/travelersWrappers/LandingPage'
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
          <div className="content">
            <h2>Content header</h2>
            <img src={artificial_intelligence} alt="img" />
            <p>Short description about the functionality</p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default LandingPage
