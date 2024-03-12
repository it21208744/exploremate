import styled from 'styled-components'
import img from '../../../assets/images/beautiOfEarth.webp'
import img2 from '../../../assets/images/landingBackground.webp'

const Wrapper = styled.div`
  .btnRegister {
    color: #0b0c10;
    font-size: 0.8vw;
    z-index: 5;
    width: 5vw;
    position: fixed;
    top: 2%;
    /* margin-right: 2vw; */
    background: #45a29e;
    right: 1vw;
    transition: background 0.5s ease, width 0.5s ease;
  }

  .btnLogin {
    font-size: 0.8vw;
    color: #0b0c10;
    z-index: 5;
    width: 5vw;
    position: fixed;
    top: 2%;
    /* margin-right: 2vw; */
    background: #45a29e;
    right: 7vw;
    transition: background 0.5s ease, width 0.5s ease;
  }

  .btnRegister:hover,
  .btnLogin:hover {
    background: #66fcf1;
    /* width: 6vw; */
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
    height: 6vw;
  }

  .websiteInfo {
    z-index: 2;
    position: absolute;
    top: 80%; /* Adjust as needed */
    height: 1000%; /* Adjust as needed */
  }

  .content {
    background: #45a29e;
  }
`

export default Wrapper