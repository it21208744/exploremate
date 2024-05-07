import styled from 'styled-components'

const Wrapper = styled.div`
  .reelNav {
    display: flex;
    justify-content: center;
  }

  ul li {
    display: inline-block;
    /* margin-right: 4vh;
    margin-left: 4vh; */
  }

  .reelNav button {
    background-color: transparent; /* Remove background color */
    border: none;
    padding-right: 2vw;
    padding-left: 2vw;
    transition: background-color border-radius 0.3s; /* Smooth transition for hover effect */
  }

  .reelNav button:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Darker background color on hover */
    border-radius: 10px;
  }

  ul li button {
    font-size: 2em;
  }
`

export default Wrapper

// import styled from 'styled-components'

// const Wrapper = styled.div`
//   .profileContainer {
//     position: relative;

//  //left: 30vw;  //test
//     left: 50vw;
//     width: 20vw;
//     background: transparent;
//     border-style: solid;
//     border-radius: 10px;
//     color: black;

//   }

//   h2 {
//     text-align: center;
//   }

//   /* div p {
//     display:
//   } */
// `

// export default Wrapper
