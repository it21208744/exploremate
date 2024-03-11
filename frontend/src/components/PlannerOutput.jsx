const PlannerOutput = (planAndWeather) => {
  const plans = planAndWeather?.planAndWeather?.plansContent
  let plansAsArray = []

  if (plans) {
    plansAsArray = Object.values(plans).map((item) => item.actions)
  }

  return (
    <div>
      <h2>Need a guide?</h2>
      <ul>
        <li>Adventure</li>
        <li>Historical</li>
        <li>Family-friendly</li>
        <li>Food hunting</li>
      </ul>

      <ul>
        {plansAsArray.map((plan, index) => {
          return (
            <li key={index}>
              Day {index + 1} - {plan}
            </li>
          )
        })}
      </ul>

      <h2>You might need these things...</h2>

      <ul>
        <li>Cap</li>
        <li>Cap</li>
        <li>Cap</li>
        <li>Cap</li>
        <li>Cap</li>
        <li>Cap</li>
        <li>Cap</li>
        <li>Cap</li>
      </ul>
    </div>
  )
}
export default PlannerOutput
