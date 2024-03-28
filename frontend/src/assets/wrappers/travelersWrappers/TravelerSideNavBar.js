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

  .sidebar {
    list-style-type: none;
    padding: 2vw;
    text-align: left; /* Aligns the items inside the ul to the right */
  }

  .navLink {
    margin-bottom: 10px; /* Adjust as needed */
  }

  .navLink .text {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    font-size: 1em;
    color: grey;
    transition: font-size 0.3s ease;
  }

  .navLink .text:hover {
    font-size: 20px;
  }
`

export default Wrapper
