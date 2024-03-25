import styled from 'styled-components'

const colors = {
  background: '#d0d6d6',
  title: '#041421',
  texts: '#042630',
  secTexts: '#86b9b0',
  light: '#d0d6d6',
}

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
    stroke: ${colors.title};
    stroke-dasharray: 150 480;
    stroke-dashoffset: 150;
    transition: 1s ease-in-out;
  }

  .btn:hover {
    transition: 1s ease-in-out;
    background: ${colors.secTexts};
  }

  .btn:hover svg {
    stroke-dashoffset: -480;
  }

  .btn span {
    color: ${colors.texts};
    font-size: 15px;
    font-weight: bolder;
  }
`
export default Wrapper
