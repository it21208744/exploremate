import React, { useState } from 'react' // Import React and useState hook
import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import getTokenFromHeader from '../components/getTokenFromHeader'
import axios from 'axios'

export default NiceModal.create((hotel) => {
  const modal = useModal()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  function getMinimumDate() {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  function handleStartDateChange(event) {
    setStartDate(event.target.value)
    setEndDate(null)
  }

  function handleEndDateChange(event) {
    const selectedEndDate = event.target.value
    if (selectedEndDate && selectedEndDate < startDate) {
      alert(
        'End date cannot be before start date. Please choose a date after ' +
          startDate
      )
      return
    }
    setEndDate(selectedEndDate)
  }

  const isBookButtonDisabled = !startDate || !endDate

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
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          min={getMinimumDate()}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          min={startDate}
          disabled={!startDate}
          onChange={handleEndDateChange}
        />
      </div>
      <button
        onClick={() => handleBooking(startDate, endDate, hotel._id)}
        disabled={isBookButtonDisabled}
      >
        Book
      </button>
    </Modal>
  )
})
