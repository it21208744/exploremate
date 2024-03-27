import styled from 'styled-components'

const Wrapper = styled.div`
  .loginContainer {
    color: black;
    background-color: rgba(128, 128, 128, 0.5);
    position: relative;
    left: 36.9vw;
    padding: 50px;
    border-radius: 10px;
  }

  h2 {
    position: relative;
    top: -5vh;
    text-align: center;
  }

  input {
    display: flex;
    justify-content: flex-end;
    width: 20vw;
    height: 3vh;
    border-radius: 10px;
    font-size: 1.2em;
  }

  button {
    position: relative;
    top: 4vh;
    left: 8vw;
  }

  label {
    font-size: 1.5em;
  }
`

export default Wrapper
