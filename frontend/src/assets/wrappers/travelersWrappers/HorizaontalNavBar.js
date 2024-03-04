import styled from 'styled-components'

const Wrapper = styled.div`
  .navBar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    text-align: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .navBar li {
    display: inline-block;
  }

  .navBar li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  .navBar li a:hover {
    background-color: #ddd;
    color: black;
  }
`

export default Wrapper
