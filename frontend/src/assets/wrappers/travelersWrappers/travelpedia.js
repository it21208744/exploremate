import styled from 'styled-components'

const Wrapper = styled.div`
  .travelpediaContainer {
    position: relative;
    left: 300px;
  }

  .currentWeather {
    background: grey;
    width: 20vw;
    position: relative;
    left: -10vw;
    top: 4vh;
    border-radius: 20px;
    padding: 10px;
  }

  .foreCastWeather {
    background: grey;
    width: 20vw;
    position: relative;
    top: -35vh;
    left: 18vw;
    border-radius: 20px;
    padding: 10px;
  }

  h1 {
    color: brown;
  }
`

export default Wrapper
