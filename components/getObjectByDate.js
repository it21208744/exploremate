function getObjectByDate(data, targetDate) {
  const dateString = targetDate.toISOString().split('T')[0]

  for (const item of data.list) {
    const itemDate = new Date(item.dt_txt)

    const itemDateString = itemDate.toISOString().split('T')[0]

    if (itemDateString === dateString) {
      return item
    }
  }

  return null
}

// Example usage
const jsonData = {}
const targetDate = new Date('2024-03-22') // Example date
const result = getObjectByDate(jsonData, targetDate)

console.log(result) // Output the first object with the specified date

export default getObjectByDate
