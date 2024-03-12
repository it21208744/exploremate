import styled from 'styled-components'
import img from '../../../assets/images/beautiOfEarth.webp'
import img2 from '../../../assets/images/landingBackground.webp'

const Wrapper = styled.div`
  .btnLogin,
  .btnRegister {
    z-index: 5;
    position: fixed;
    top: 2%;
    margin-right: 2%;
    background: #c04dff;
  }

  .btnRegister {
    right: 1%;
  }

  .btnLogin {
    right: 7%;
  }

  h1 {
    z-index: 4;
    position: fixed;
    width: 100%;
    top: 15%;
    font-style: bold;
    font-size: 14vw; /* Responsive font size based on viewport width */
    text-align: center;
    background: url(${img});
    background-position: center;
    color: transparent;
    background-clip: text;
    transition: font-size 0.2s ease, background-position 0.2s ease;
  }

  h1.small {
    z-index: 4;
    top: -4vw;
    font-size: 5vw; /* Responsive font size based on viewport width */
    color: white;
    background: #242424;
  }

  .websiteInfo {
    z-index: 2;
    position: absolute;
    top: 80%; /* Adjust as needed */
    height: 1000%; /* Adjust as needed */
  }
`

export default Wrapper
