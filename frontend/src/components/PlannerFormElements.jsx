const PlannerFormElements = () => {
  return (
    <div>
      <h1>Plan your next adventure</h1>
      <form className="form">
        <div>
          <label htmlFor="location" className="form-label">
            Where to go?
          </label>
          <input
            type="text"
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
            // name="days"
            className="formInput"
            id="days"
          />
        </div>

        <button type="submit">Lets travel</button>
      </form>
    </div>
  )
}
export default PlannerFormElements
