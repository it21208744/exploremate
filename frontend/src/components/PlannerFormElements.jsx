import { Form, useNavigation, useActionData } from 'react-router-dom'
import axios from 'axios'
import PlannerOutputGuide from './PlannerOutputGuide'
import { useState, useEffect } from 'react'
import Travelpedia from '../pages/travelers/Travelpedia'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/travelersWrappers/plannerFormElement'
import NiceBtn from './NiceBtn'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const planAndWeather = await (
      await axios.post('/api/v1/travelers/', data)
    ).data
    return planAndWeather
  } catch (error) {
    toast.error('Wrong city name')
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
    <Wrapper>
      <div>
        <h1 className="pageTitle">Plan your next adventure</h1>
        <Form method="post" className="form">
          <div>
            <div>
              <label htmlFor="location" className="form-label">
                Where to go?
              </label>
            </div>
            <input
              type="text"
              name="location"
              className="formInput"
              id="location"
              required
            />
          </div>
          <div>
            <div>
              <label htmlFor="date" className="form-label">
                When?
              </label>
            </div>
            <input type="date" name="date" className="formInput" id="date" />
          </div>
          <div>
            <div>
              <label htmlFor="days" className="form-label">
                How many days?
              </label>
            </div>
            <input
              type="number"
              name="days"
              className="formInput"
              id="days"
              required
            />
          </div>
          <div>
            <div>
              <label htmlFor="type" className="form-label">
                Type?
              </label>
            </div>

            <select
              id="type"
              name="type"
              className="formInput"
              defaultValue={'Family-Friendly'}
            >
              <option value="Cultural">Cultural</option>
              <option value="Adventure ">Adventure </option>
              <option value="Historical ">Historical </option>
              <option value="Family-Friendly">Family-Friendly</option>
              <option value="Food hunting">Food hunting</option>
            </select>
          </div>
          <div className="button">
            <NiceBtn isSubmitting={isSubmitting} />
          </div>
        </Form>
        <div className="output">
          {outputSituation === 'outPutPresents' ? (
            <ul className="horizontalNav">
              <li>
                <button
                  type="button"
                  onClick={() => changeGuide(true)}
                  className={isGuide ? 'activeBtn' : null}
                >
                  GUIDE
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => changeGuide(false)}
                  className={isGuide ? null : 'activeBtn'}
                >
                  TRAVELPEDIA
                </button>
              </li>
            </ul>
          ) : null}

          {outputSituation === 'outPutPresents' ? (
            isGuide ? (
              <div className="guide">
                <PlannerOutputGuide planAndWeather={planAndWeather} />
              </div>
            ) : (
              <div className="travelpedia">
                <Travelpedia location={location} weather={weather} />
              </div>
            )
          ) : (
            <div className="defaultContent">
              <h1>Here goes some bullshit</h1>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
export default PlannerFormElements
