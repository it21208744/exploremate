import styled from 'styled-components'

const Wrapper = styled.div`
  .sidebar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: grey; //background color
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
    color: #000; //text color
  }

  .sidebar a:hover {
    background-color: #ddd; //hover color
  }

  //active sidebar css
  .sidebar a.active {
    background-color: #4caf50;
    color: white;
  }
`

export default Wrapper
