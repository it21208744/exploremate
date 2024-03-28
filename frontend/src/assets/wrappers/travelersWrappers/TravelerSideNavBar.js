import styled from 'styled-components'

const Wrapper = styled.div`
  .ShowSidebarContainer,
  .HideSidebarContainer {
    position: fixed;
    top: 0;
    height: 100%;
    width: 300px;
    transition: left 0.3s ease, background 0.3s ease;
    background: black;
  }

  //   .ShowSidebarContainer {
  //     left: 0;
  //     background: grey;
  //   }

  //   .HideSidebarContainer {
  //     left: -225px;
  //     background: transparent;
  //   }

  //   .navLink {
  //     position: relative;
  //     right: 35px;
  //     margin: 10px;
  //     padding: 10px;
  //     width: 250px;
  //     border-radius: 10px;
  //     text-align: center;
  //     color: #0b0c10;
  //     transition: color 0.3s;
  //   }

  //   /* hover effect doesnt work */
  //   .navLink:hover {
  //     color: #1f2833;
  //   }

  //   .menuBtn {
  //     position: relative;
  //     margin-bottom: 40px;
  //     left: 190px;
  //   }

  //   ul {
  //     list-style: none;
  //   }

  //   .text {
  //     color: #4c7273;
  //     font-size: 1.2em;
  //     /* text-align: left !important; */
  //   }

  //   .navLink .text {
  //     display: inline-block;
  //     vertical-align: middle;
  //     /* margin-left: 10px;  */
  //   }

  //   .icon {
  //     color: red;
  //     font-size: 30px;
  //     padding: 20px;

  //   }

  .sidebar {
    list-style-type: none;
    padding: 2vw;
    text-align: left; /* Aligns the items inside the ul to the right */
  }

  .navLink {
    margin-bottom: 10px; /* Adjust as needed */
  }

  .navLink .icon {
    display: inline-block;
    width: 30px; /* Adjust as needed */
    text-align: center;
    font-size: 2em;
  }

  .navLink .text {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px; /* Adjust as needed */
    font-size: 1.5em;
  }
`

export default Wrapper
