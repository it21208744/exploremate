import { Form, useNavigation, useActionData } from 'react-router-dom'
import axios from 'axios'
import PlannerOutputGuide from './PlannerOutputGuide'
import { useState, useEffect } from 'react'
import Travelpedia from '../pages/travelers/Travelpedia'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const planAndWeather = await (
      await axios.post('/api/v1/travelers/', data)
    ).data
    return planAndWeather
  } catch (error) {
    return error
  }
}

const PlannerFormElements = () => {
  const [isGuide, changeGuide] = useState(true)
  const [outputSituation, setSituation] = useState('default')
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const planAndWeather = useActionData()

  const location = planAndWeather?.weather?.coord
  const weather = planAndWeather?.weather
  const packingList = planAndWeather?.packingList

  useEffect(() => {
    if (weather) setSituation('outPutPresents')
  }, [weather])

  return (
    <div>
      <h1>Plan your next adventure</h1>
      <Form method="post" className="form">
        <div>
          <label htmlFor="location" className="form-label">
            Where to go?
          </label>
          <input
            type="text"
            name="location"
            className="formInput"
            id="location"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="form-label">
            When?
          </label>
          <input type="date" name="date" className="formInput-date" id="date" />
        </div>
        <div>
          <label htmlFor="days" className="form-label">
            How many days?
          </label>
          <input
            type="days"
            name="days"
            className="formInput"
            id="days"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="form-label">
            Type?
          </label>
          <input type="text" name="type" className="formInput" id="type" />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating a plan...' : 'Lets travel'}
        </button>
      </Form>
      {/* {outputSituation === 'default' ? <h1>default</h1> : null} */}
      {outputSituation === 'outPutPresents' ? (
        <ul>
          <li>
            <button type="button" onClick={() => changeGuide(true)}>
              GUIDE
            </button>
          </li>
          <li>
            <button type="button" onClick={() => changeGuide(false)}>
              TRAVELPEDIA
            </button>
          </li>
        </ul>
      ) : null}
      {outputSituation === 'outPutPresents' ? (
        isGuide ? (
          <PlannerOutputGuide
            planAndWeather={planAndWeather}
            packingList={packingList}
          />
        ) : (
          <Travelpedia location={location} weather={weather} />
        )
      ) : (
        <h1>Here goes some bullshit</h1>
      )}
    </div>
  )
}
export default PlannerFormElements
