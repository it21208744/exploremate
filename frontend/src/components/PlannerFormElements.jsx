import { Form, useNavigation } from 'react-router-dom'
import axios from 'axios'
import PlannerOutput from './PlannerOutput'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const planAndWeather = await (
    await axios.post('/api/v1/travelers/', data)
  ).data
  console.log(planAndWeather)
  return null
}

const PlannerFormElements = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

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

      <PlannerOutput />
    </div>
  )
}
export default PlannerFormElements
