import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker1 = (allBookedDates) => {
  console.log(allBookedDates.bookedDays)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const disabledDates = [new Date(2024, 4, 17), new Date(2024, 4, 20)]

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
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      excludeDates={allBookedDates.bookedDays}
      selectsRange
      selectsDisabledDaysInRange
      inline
      minDate={getTomorrow()}
      disabled={isDateDisabled}
    />
  )
}

export default DatePicker1
