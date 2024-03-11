import styled from 'styled-components'
import img from '../../../assets/images/beautiOfEarth.webp'
import img2 from '../../../assets/images/landingBackground.webp'

const Wrapper = styled.div`
  .btnLogin {
    z-index: 5;
    position: fixed;
    top: 2%;
    right: 1%;
    margin-right: 10px;
    background: #c04dff;
  }

  .btnRegister {
    z-index: 5;
    position: fixed;
    top: 2%;
    right: 6%;
    margin-right: 10px;
    background: #c04dff;
  }

  h1 {
    z-index: 4;
    position: fixed;
    width: 100%;
    top: 40px;
    font-style: bold;
    font-size: 20em;
    text-align: center;
    background: url(${img});

    background-position: center;
    color: transparent;
    background-clip: text;
    transition: font-size 0.2s ease, background-position 0.2s ease;
  }

  h1.small {
    z-index: 4;
    top: -110px;
    font-size: 8em;
    color: white;
    background: #242424;
  }

  .websiteInfo {
    z-index: 2;
    position: absolute;
    top: 600px;
    height: 10000px;
  }
`

export default Wrapper
