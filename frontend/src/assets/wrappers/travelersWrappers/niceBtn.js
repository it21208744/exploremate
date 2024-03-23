import styled from 'styled-components'

const Wrapper = styled.div`
  .btn {
    width: 180px;
    height: 60px;
    cursor: pointer;
    background: transparent;
    border: 1px solid #91c9ff;
    outline: none;
    transition: 1s ease-in-out;
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    fill: none;
    stroke: #d0d6d6;
    stroke-dasharray: 150 480;
    stroke-dashoffset: 150;
    transition: 1s ease-in-out;
  }

  .btn:hover {
    transition: 1s ease-in-out;
    background: #042630;
  }

  .btn:hover svg {
    stroke-dashoffset: -480;
  }

  .btn span {
    color: white;
    font-size: 15px;
    font-weight: 300;
  }
`
export default Wrapper
