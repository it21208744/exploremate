import styled from 'styled-components'
import nightSky from '../../images/nightSky.png'

const colors = {
  background: '#d0d6d6',
  title: '#041421',
  texts: '#042630',
  tile: '#86b9b0',
  light: '#d0d6d6',
}

const Wrapper = styled.div`
  /* background-color: black !important; */

  .pageTitle {
    color: #042630;
    position: absolute;
    top: -50vh;
    left: 25vw;
  }

  .form {
    position: absolute;
    top: 1vh;
    left: 25vw;
  }

  .form-label {
    font-size: 16px;
    font-weight: bold;
    color: #4c7273;
    margin-bottom: 8px;
  }

  .formInput {
    width: 30vw;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #86b9b0;
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
    left: 10vw;
    top: 40vh;
  }

  .output {
    position: absolute;
    color: white;
    left: -3vw;
    top: 25vw;
    padding-left: 20px;
    width: 83vw;
    height: 150vh;
    border-top: 5px solid black;
    background: url(${nightSky});
  }

  .horizontalNav {
    position: absolute;
    top: 2vh;
    left: 28vw;
    list-style: none;
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

  /* .defaultContent {
    position: absolute;
    left: -10vw;
    width: 10vw;
    height: 100vh;
    background: grey;
  } */

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
    padding: 15px 30px; /* Increased padding for a more spacious feel */
    background: #f7dfd6; /* Light beige background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Defined shadow for depth */
    border-radius: 20px; /* Generous rounding for a smooth look */
    color: #333; /* Dark text for readability */
    font-weight: bold; /* Emphasize the button text */
    text-transform: uppercase; /* Create a bolder presence */
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .saveBtn:hover {
    background: #e0c3b0; /* Warm, peachy tone on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
    color: #fff; /* White text for clear contrast */
  }
`

//colors
// #041421
// #042630
// #4c7273
// #86b9b0
// #d0d6d6

export default Wrapper
