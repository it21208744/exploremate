import styled from 'styled-components'

const Wrapper = styled.div`
  .sidebar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 300px;
    background-color: grey;
    position: absolute;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
  }

  .sidebar a {
    display: block;
    padding: 16px;
    text-decoration: none;
    color: #000;
  }

  .sidebar a {
    text-decoration: none;
    color: white;
    position: relative;
  }

  .sidebar a:hover {
    background-color: #ddd;
    transition: background-color 1.5s ease; /* Adjust the duration as needed */
    box-shadow: 0 0 10px rgba(221, 221, 221, 0.8); /* Adjust the shadow color and size */
  }

  .closeMenuBtn {
    position: relative;
    left: 230px;
  }

  /* .sidebar a.active {
    background-color: #4caf50;
    color: white;
  } */
`

export default Wrapper
