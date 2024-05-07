import { useEffect, useState } from 'react'
import getTokenFromHeader from '../../components/getTokenFromHeader'
import axios from 'axios'
import { Card, Col, Row } from 'antd'
import { Button, Popconfirm } from 'antd'
import { MdDeleteOutline } from 'react-icons/md'

const GetMyBookings = () => {
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    const conf = getTokenFromHeader()

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

  console.log(bookings)

  return (
    <div style={{ position: 'absolute', left: '20vw' }}>
      <Row gutter={20}>
        {bookings.map((hotel, index) => (
          <Col span={8}>
            <Card title={hotel.hotelName} bordered={true}>
              <h5>You booked {hotel.hotelName} for these days</h5>
              <>
                {hotel.bookings.map((bookingDates) => (
                  <span>
                    <b>{bookingDates.startDate.substring(0, 10)}</b> to{' '}
                    <b>{bookingDates.endDate.substring(0, 10)}</b>
                    {'  '}
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this booking?"
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger size="small">
                        <MdDeleteOutline />
                      </Button>
                    </Popconfirm>
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
