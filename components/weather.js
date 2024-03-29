const apiKey = '5fc825d88b67c9e4641832203d5da2c2'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const ForecastUrl =
  'https://api.openweathermap.org/data/2.5/forecast?units=metric'
import { getFirstItemByDate } from './getObjectByDate.js'

export const checkWeather = async (city) => {
  const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`)
  const weather = response.json()
  return weather
}

export const weatherForecast = async (city, date) => {
  const response = await fetch(ForecastUrl + `&q=${city}` + `&appid=${apiKey}`)
  const allWeather = await response.json()
  let futureWeather = {}

  if (allWeather !== undefined) {
    const weather = getFirstItemByDate(allWeather, date)
    if (weather)
      futureWeather = {
        temp: weather.main.temp,
        desc: weather.weather[0].description,
        wind: weather.wind.speed,
      }
  }
  return futureWeather
}

//for weather forcast
//https://api.openweathermap.org/data/2.5/forecast?q=Kadawatha&appid=5fc825d88b67c9e4641832203d5da2c2&units=metric
