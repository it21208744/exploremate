export function getFirstItemByDate(data, targetDate) {
  let weatherArr = []

  const list = data.list
  list.forEach((obj) => {
    if (obj.dt_txt.substring(0, 10) === targetDate) {
      weatherArr.push(obj)
    }
  })

  return weatherArr[0]
}
