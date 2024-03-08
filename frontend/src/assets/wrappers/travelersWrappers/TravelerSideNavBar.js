import styled from 'styled-components'

const Wrapper = styled.div`
  .ShowSidebarContainer,
  .HideSidebarContainer {
    position: fixed;
    top: 0;
    height: 100%;
    width: 300px;
    transition: left 0.3s ease, background 0.3s ease;
  }

  .ShowSidebarContainer {
    left: 0;
    background: #0b0c10;
  }

  .HideSidebarContainer {
    left: -225px;
    background: transparent;
  }

  .navLink {
    position: relative;
    right: 35px;
    margin: 10px;
    padding: 10px;
    width: 250px;
    border-radius: 10px;
    text-align: center;

    color: #0b0c10;
    transition: color 0.3s;
  }

  /* hover effect doesnt work */
  .navLink:hover {
    color: #1f2833;
  }

  .menuBtn {
    position: relative;
    margin-bottom: 40px;
    left: 190px;
  }

  ul {
    list-style: none;
  }
`

export default Wrapper
