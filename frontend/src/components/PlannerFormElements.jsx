import { Form } from 'react-router-dom'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  return null
}

const PlannerFormElements = () => {
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
            // name="location"
            className="formInput"
            id="location"
          />
        </div>
        <div>
          <label htmlFor="date" className="form-label">
            When?
          </label>
          <input
            type="date"
            name="date"
            // name="date"
            className="formInput-date"
            id="date"
          />
        </div>
        <div>
          <label htmlFor="days" className="form-label">
            How many days?
          </label>
          <input
            type="days"
            name="days"
            // name="days"
            className="formInput"
            id="days"
          />
        </div>

        <button type="submit">Lets travel</button>
      </Form>
    </div>
  )
}
export default PlannerFormElements
