// Import React and useState hook
import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import getTokenFromHeader from '../components/getTokenFromHeader'
import axios from 'axios'
import DatePicker1 from './DatePicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getBookedDates } from './betweenDatesArr'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default NiceModal.create((hotel) => {
  const allBookedDates = getBookedDates(hotel.bookedDates)

  const modal = useModal()

  const handleBooking = async (startDate, endDate, id) => {
    const conf = getTokenFromHeader()
    const bookingInfo = {
      startDate,
      endDate,
    }

    try {
      await axios.put(`/api/v1/bookings/update/${id}`, bookingInfo, conf)
    } catch (error) {}
  }

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const getTomorrow = () => {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    return tomorrow
  }

  const isDateDisabled = (date) => {
    const tomorrow = getTomorrow()
    return date < tomorrow
  }

  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Modal
      title={`${hotel.HotelName} - ${hotel.Location}`}
      onOk={() => modal.hide()}
      open={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <p>{hotel.Description}</p>
      <h3>Location - {hotel.Location}</h3>
      <h3>Room details - {hotel.RoomDetail}</h3>
      <h3>Package details - {hotel.PackDetail}</h3>
      <h3>Cost per night - {hotel.Amenties}</h3>
      <h2>Phone No - {hotel.PhoneNum}</h2>
      <h2>Email - {hotel.Email}</h2>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={allBookedDates}
        selectsRange
        selectsDisabledDaysInRange
        inline
        minDate={getTomorrow()}
        disabled={isDateDisabled}
      />
      <button onClick={() => handleBooking(startDate, endDate, hotel._id)}>
        Book
      </button>
    </Modal>
  )
})
