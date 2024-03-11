import Wrapper from '../assets/wrappers/travelersWrappers/LandingPage'

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

        <div className="websiteInfo">
          <h2>
            HEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HE HEH
            HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH
            HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH
            HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH
            HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH
            HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH
            HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH
            HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH
            HE HE HE HEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE
            HE HEHEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE
            HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE
            HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE
            HE HE HEH HEH HE HE HE HEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE
            HEHEH HEH HE HE HEHEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HEHEH HEH HE HE
            HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE
            HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
            HEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH
            HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH
            HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH
            HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH
            HEH HE HE HE HEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE HE HEHEH HEH
            HE HE HEHEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH
            HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH
            HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH
            HE HE HE HEH HEH HE HE HE HEH HEH HE HE HEHEH HEH HE HE HEHEH HEH HE
            HE HEHEH HEH HE HE HEHEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE
            HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE
            HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE
            HE HEH HEH HE HE HE HEH HEH HE HE HE HEH HEH HE HE HE
          </h2>
        </div>
      </div>
    </Wrapper>
  )
}
export default LandingPage
