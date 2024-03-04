export const addTaxi = (req, res) => {
  res.send(`add a taxi`)
}

export const getAllTaxies = (req, res) => {
  res.send(`get all taxies`)
}

export const getSingleTaxies = (req, res) => {
  res.json(req.params)
}

export const updateTaxi = (req, res) => {
  res.send(`update a taxi`)
}

export const deleteTaxi = (req, res) => {
  res.send(`delete a taxi`)
}
