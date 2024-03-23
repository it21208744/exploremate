const apiKey = '5fc825d88b67c9e4641832203d5da2c2'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'

export const checkWeather = async (city) => {
  const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`)
  const weather = response.json()
  return weather
}

//for weather forcast
//https://api.openweathermap.org/data/2.5/forecast?q=Kadawatha&appid=5fc825d88b67c9e4641832203d5da2c2&units=metric
