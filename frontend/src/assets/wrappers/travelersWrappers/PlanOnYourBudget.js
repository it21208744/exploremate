import styled from 'styled-components'

const Wrapper = styled.div`
  body {
    margin: 0;
    padding: 0;
  }

  .fixed-div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: lightblue;
    height: 50px; /* Adjust as needed */
    z-index: 100; /* Set a higher z-index value */
  }

  h1 {
    color: red;
    margin-top: 50px; /* Adjust based on the height of the fixed div */
    /* Add any additional styling for your h1 element */
  }
`

export default Wrapper
