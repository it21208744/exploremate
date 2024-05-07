
import { Router } from 'express'

const router = Router()
import budget from '../models/BudgetModel.js'
import hotel from '../models/Cof.js'
import { budgetPlanning } from '../components/openAI.js'

router.route('/add').post(async (req, res) => {
  console.log(`hehe working :)`)

  const Location = req.body.Location
  const Budget = Number(req.body. Budget )
  const NumDays = Number(req.body.NumDays)


  const newBudget = new budget({
    Location,
    Budget,
    NumDays,
  })

  console.log(newBudget)

  newBudget
    .save()
    .then(() => {
      res.send('Request Success')
    })
    .catch((err) => {
      console.log(err)
      res.send('error occured')
    })
})

router.route('/').get((req, res) => {
  
  budget
    .find()
    .then((budget) => {
      res.json(budget)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route('/update/:id').put(async (req, res) => {
  let BudgtId = req.params.id
  const {
    Location,
    Budget,
    NumDays,
  
  } = req.body

  const UpdateBudget = {
    Location,
    Budget,
    NumDays,
  }

  const update = await budget
    .findByIdAndUpdate(BudgtId, UpdateBudget)
    .then(() => {
      res.status(200).send({ status: 'successfully updated' })
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: 'Error with updating data', error: err.message })
    })
})

router.route('/delete/:id').delete(async (req, res) => {
  let BudgtId = req.params.id
  await budget
    .findByIdAndDelete(BudgtId)
    .then(() => {
      res.status(200).send({ status: 'Details deleted' })
    })
    .catch((err) => {
      console.log(err.message)
      res
        .status(500)
        .send({ status: 'Error with delete sale', error: err.message })
    })
})

router.route('/get/:id').get(async (req, res) => {
  let BudgtId = req.params.id
  const plan = await budget
    .findById(BudgtId)
    .then((budget) => {
      res.status(200).send({ status: 'Details fetched', budget })
    })
    .catch((err) => {
      console.log(err.message)
      res
        .status(500)
        .send({ status: 'Error with get sale', error: err.message })
    })
})

//---------budget------------------------------------------------------
// Middleware to parse incoming JSON requests
// router.use(express.json());

// Route to get a list of hotels based on user input
router.post('/find-hotels', async (req, res) => {
  try {
    const { Location, Budget, NumDays } = req.body;

    // Query to find hotels matching location and within cost range
    const hotels = await hotel.find({
      Location,
      Amenties: { $lte: Budget },
    });

    if(hotels.length == 0){
      return res.status(404).json({msg:'no hotels were found'})
    }

    const plan = await budgetPlanning(NumDays,hotels)


  //   if (hotels.length === 0) {
  //     res.status(404).json({ message: 'No hotels found matching your criteria.' });
  //   } else {
  //     res.status(200).json(hotels);
      
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: 'Error retrieving hotels.', error });
  // }

  if (plan.length === 0) {
    res.status(404).json({ message: 'No hotels and plans found matching your criteria.' });
  } else {
    res.status(200).json({plan});
    
  }
} catch (error) {
  res.status(500).json({ message: 'Error retrieving hotels.', error });
}
});










export default router
