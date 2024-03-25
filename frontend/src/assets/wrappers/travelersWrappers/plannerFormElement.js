import styled from 'styled-components'

const colors = {
  background: '#d0d6d6',
  title: '#041421',
  texts: '#042630',
  tile: '#86b9b0',
  light: '#d0d6d6',
}

const Wrapper = styled.div`
  .pageTitle {
    color: ${colors.title};
    position: absolute;
    top: -50vh;
    left: 25vw;
  }

  .form {
    position: absolute;
    top: -30vh;
    /* left: 25vw; */
  }

  .form-label {
    font-size: 16px;
    font-weight: bold;
    color: ${colors.texts};
    margin-bottom: 8px;
  }

  .formInput {
    width: 30vw;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
  }

  .formInput:focus {
    outline: none;
    border-color: #007bff;
  }

  .selectInput {
    width: 30.5vw;
    height: 3.9vh;
  }

  .Nicebutton {
    position: absolute;
    left: 35vw;
    top: 40vh;
  }

  .output {
    position: absolute;
    color: ${colors.texts};
    top: 12vw;
    width: 100vw;
    border-top: 20px solid black;
    background: transparent;
  }

  .horizontalNav {
    position: absolute;
    top: 2vh;
    left: 28vw;
    list-style: none;
  }

  .test {
    position: absolute;
    left: 50vh;
  }

  .output .horizontalNav li {
    display: inline-block;
    margin-top: 10px;
    margin-left: 1vw;
  }

  .output .horizontalNav li button {
    border-color: transparent;
    width: 9vw;
  }

  button:focus,
  button:focus-visible {
    outline: transparent;
  }

  .activeBtn {
    background: #86b9b0;
    color: black;
    transition: background 0.6s ease; /* Transition background over 0.3 seconds with ease timing function */
  }

  .defaultContent {
    position: absolute;
    /* left: 25vw; */
    width: 100%;
    height: 100vh;
    background: grey;
  }

  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(100%); /* Start off the screen from the right */
    }
    100% {
      opacity: 1;
      transform: translateX(0); /* End at the original position */
    }
  }

  .travelpedia {
    position: absolute;
    top: 6vw;
    left: 14vw; /* Start position */
    opacity: 0; /* Initially hidden */
    animation: slideInRight 0.2s ease forwards; /* Apply slide-in animation */
  }

  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-100%); /* Start off the screen from the left */
    }
    100% {
      opacity: 1;
      transform: translateX(0); /* End at the original position */
    }
  }

  .guide {
    opacity: 0; /* Initially hidden */
    animation: slideInLeft 0.2s ease forwards; /* Apply slide-in animation */
    position: relative;
    top: 20vh;
  }

  .saveBtn {
    position: relative;
    top: 5vh;
    left: 35vw;
  }
`

//colors
// #041421
// #042630
// #4c7273
// #86b9b0
// #d0d6d6

export default Wrapper
