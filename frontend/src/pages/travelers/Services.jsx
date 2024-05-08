import Wrapper from '../../assets/wrappers/travelersWrappers/services'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NiceModal from '@ebay/nice-modal-react'
import BookingHotelInfo from '../../components/BookingHotelInfo'
import getTokenFromHeader from '../../components/getTokenFromHeader'
import { Card, Space } from 'antd'
import hotelCover from '../../assets/images/hotellz.jpg'
import hotell from '../../assets/images/main.png'

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
      <div style={{
         // background: `url(${hotell})`,
          backgroundColor:"#E3DAC9",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw',
          height: '700vh',
        }}>

      <div className="servicesContainer">
        {hotel.map((hotel) => {
          return (
            <Card
              key={hotel._id}
              onClick={() => {
                viewHotel(hotel)
              }}
              hoverable="true"
             
              cover={<img src={hotelCover} style={{ width: '5vw',height: 'auto' ,display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}} />}
              style={{
                position: 'relative',
                left: '40vw',
                marginBottom: '2vh',

                width: 600,

                border: 'solid',
                borderWidth: '2px',
                
          
              }}
            >
              <h1>{hotel.HotelName}</h1>
              <h3>{hotel.Description}</h3>
              <h4>{hotel.Location}</h4>
            </Card>
          )
        })}
      </div>

      </div>
    </Wrapper>

  )
}
export default Services

//-----------------------
// <div
//   key={hotel._id}
//   className="hotelCard"
//   onClick={() => {
//     viewHotel(hotel)
//   }}
// // >
// <h1>{hotel.HotelName}</h1>
// <h2>{hotel.Description}</h2>
// <h3>{hotel.Location}</h3>
// </div>
