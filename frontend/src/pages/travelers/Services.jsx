import Wrapper from '../../assets/wrappers/travelersWrappers/services'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Services = () => {
  const [hotel, setHotel] = useState([])
  const fetchHotelData = async () => {
    try {
      const response = await axios.get('/api/v1/bookings/')
      setHotel(response.data)
    } catch (error) {
      console.error('Error fetching hotel data:', error)
    }
  }

  useEffect(() => {
    fetchHotelData()
  }, [])

  return (
    <Wrapper>
      {console.log(hotel)}
      <div className="servicesContainer">
        {hotel.map((hotel) => {
          return (
            <div
              key={hotel._id}
              className="hotelCard"
              onClick={() => console.log(hotel.HotelName)}
            >
              <h1>{hotel.HotelName}</h1>
              <h2>{hotel.Description}</h2>
              <h3>{hotel.Location}</h3>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}
export default Services
