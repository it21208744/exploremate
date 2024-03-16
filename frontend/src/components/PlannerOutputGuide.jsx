const PlannerOutput = (planAndWeather) => {
  const plans = planAndWeather?.planAndWeather?.plansContent
  console.log(plans)
  let plansAsArray = []
  if (plans) {
    plansAsArray = Object.values(plans).map((item) => item.actions)
  }

  const packingList = planAndWeather?.packingList
  console.log(packingList)
  let PackingListAsArray = []
  if (packingList) {
    PackingListAsArray = Object.values(packingList).map((item) => ({
      itemName: item.ItemName,
      reason: item.ReasonToChoose,
    }))

    console.log(PackingListAsArray)
  }

  return (
    <div>
      <h2>Need a guide?</h2>

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
        {PackingListAsArray.map((item, index) => {
          return (
            <li key={index}>
              {item.itemName}
              <ul>
                <li>{item.reason}</li>
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default PlannerOutput
