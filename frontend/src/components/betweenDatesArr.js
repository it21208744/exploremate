export function getDatesBetween(startDate, endDate) {
  const dates = []
  let currentDate = new Date(startDate.getTime())

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export function getBookedDates(bookedDates) {
  const allBookedDates = []

  for (const bookedDate of bookedDates) {
    const startDate = new Date(bookedDate.startDate)
    const endDate = new Date(bookedDate.endDate)
    const bookedDays = getDatesBetween(startDate, endDate)

    allBookedDates.push(...bookedDays.map((date) => new Date(date.getTime())))
  }

  return allBookedDates
}
