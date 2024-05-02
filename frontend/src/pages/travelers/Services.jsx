import Wrapper from '../../assets/wrappers/travelersWrappers/services'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NiceModal from '@ebay/nice-modal-react'
import BookingHotelInfo from '../../components/BookingHotelInfo'
import getTokenFromHeader from '../../components/getTokenFromHeader'

const Services = () => {
  const [hotel, setHotel] = useState([])
  const conf = getTokenFromHeader()
  const fetchHotelData = async () => {
    try {
      const response = await axios.get('/api/v1/bookings/', conf)
      setHotel(response.data)
    } catch (error) {
      console.error('Error fetching hotel data:', error)
    }
  }

  useEffect(() => {
    fetchHotelData()
  }, [])

  const viewHotel = (hotel) => {
    NiceModal.show(BookingHotelInfo, hotel)
  }

  return (
    <Wrapper>
      {console.log(hotel)}
      <div className="servicesContainer">
        {hotel.map((hotel) => {
          return (
            <div
              key={hotel._id}
              className="hotelCard"
              onClick={() => {
                viewHotel(hotel)
              }}
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
