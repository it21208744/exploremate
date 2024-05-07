import styled from 'styled-components'

const Wrapper = styled.div`
  .servicesContainer {
    position: relative;
    left: 300px;
  }

  .hotelCard {
    border: 2px solid #ccc; /* Add a solid border with a light gray color */
    border-radius: 10px; /* Add rounded corners */
    padding: 20px; /* Add some padding for better spacing */
    margin-bottom: 20px; /* Add margin at the bottom for spacing between cards */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
    transition: box-shadow 0.3s ease; /* Add transition effect for the shadow */
  }

  .hotelCard:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }

  .hotelCard h1 {
    font-size: 24px; /* Increase font size for hotel name */
    margin-bottom: 10px; /* Add margin at the bottom for spacing */
  }

  .hotelCard h2 {
    font-size: 18px; /* Set font size for description */
    color: #666; /* Set text color to a dark gray */
    margin-bottom: 10px; /* Add margin at the bottom for spacing */
  }

  .hotelCard h3 {
    font-size: 16px; /* Set font size for location */
    font-style: italic; /* Make location italic */
    color: #888; /* Set text color to a lighter gray */
  }
`

export default Wrapper
