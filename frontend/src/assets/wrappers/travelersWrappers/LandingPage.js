import styled from 'styled-components'
import img from '../../../assets/images/beautiOfEarth.webp'
import img2 from '../../../assets/images/landingBackground.webp'

const Wrapper = styled.div`
  .landingPageContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    position: relative;
    font-style: bold;
    font-size: 18em;
    text-align: center;
    background: url(${img});
    /* background-repeat: no-repeat; */
    /* background-size: cover; */
    background-position: center;
    color: transparent;
    background-clip: text;
  }

  h1 {
    position: relative;
    font-style: bold;
    font-size: 18em;
    text-align: center;
    background: url(${img});
    /* background-repeat: no-repeat; */
    /* background-size: cover; */
    background-position: center;
    color: transparent;
    background-clip: text;
    transition: font-size 0.2s ease;

    &:hover {
      font-size: 18.5em;
    }
  }
`

export default Wrapper
