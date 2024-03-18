import styled from 'styled-components'

const Wrapper = styled.div`
  .pageTitle {
    position: relative;
    top: -16vw;
    left: 25vw;
  }

  .form {
    position: relative;
    top: -14vw;
    /* left: 25vw; */
  }

  .form input {
    width: 30vw;
    height: 1.5vw;
  }

  .output {
    position: absolute;
    top: 8vw;
    width: 100vw;
    border-top: 20px solid black;
    /* background: grey; */
  }

  .output .horizontalNav {
    position: relative;
    left: 30vw;
    list-style: none;
    display: inline;
  }

  .output .horizontalNav li {
    display: inline-block;
    margin-top: 10px;
    margin-left: 1vw;
  }

  .defaultContent {
    position: absolute;
    /* left: 25vw; */
    width: 100%;
    height: 100vw;
    background: wheat;
  }

  .travelpedia {
    position: absolute;
    top: 4vw;
  }
`

export default Wrapper
