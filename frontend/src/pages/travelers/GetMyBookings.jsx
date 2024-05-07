import { useEffect, useState } from 'react'
import getTokenFromHeader from '../../components/getTokenFromHeader'
import axios from 'axios'
import { Card, Col, Row } from 'antd'
import { Button, Popconfirm } from 'antd'
import { MdDeleteOutline } from 'react-icons/md'
import bookingBackground from './../../assets/images/bookingBackground.png'
const GetMyBookings = () => {
  const [bookings, setBookings] = useState([])
  const conf = getTokenFromHeader()
  const getBookings = async () => {
    const userBookings = await axios.get('/api/v1/bookings/getBookings', conf)
    setBookings(userBookings.data)
  }
  useEffect(() => {
    try {
      getBookings()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const deleteBookings = async (hotelID, bookingID) => {
    // console.log(hotelID, bookingID)
    const userBookings = await axios.put(
      `/api/v1/bookings/deleteBookings/${hotelID}`,
      { bookingId: bookingID },
      conf
    )
    getBookings()

    console.log(userBookings)
  }

  console.log(bookings)

  return (
    <div
      style={{
        position: 'absolute',
        left: '16vw',
        background: `url(${bookingBackground})`,
        width: '75vw',
        height: '100%',
        padding: '50px',
      }}
    >
      <Row gutter={20}>
        {bookings.map((hotel, index) => (
          <Col span={65} key={index}>
            <Card
              title={hotel.hotelName}
              bordered={true}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '2vh',
              }}
            >
              <h5>You booked {hotel.hotelName} for these days</h5>
              <>
                {hotel.bookings.map((bookingDates, index) => (
                  <span key={index}>
                    <b>{bookingDates.startDate.substring(0, 10)}</b> to{' '}
                    <b>{bookingDates.endDate.substring(0, 10)}</b>
                    {'  '}
                    <Popconfirm
                      title="Delete the booking"
                      description="Are you sure to delete this booking?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        deleteBookings(hotel.hotelid, bookingDates._id)
                      }}
                    >
                      <Button danger size="small">
                        <MdDeleteOutline />
                      </Button>
                    </Popconfirm>
                    <br />
                    <br />
                  </span>
                ))}
              </>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default GetMyBookings
