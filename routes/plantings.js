//const router = require("express").Router();
import { Router } from 'express'
import tokenValidate from '../middleware/tokenValidate.js'
const router = Router()

//let Planting = require("../models/Planting");
import taxi from '../models/Planting.js'

router.use(tokenValidate)
router.route('/add').post(async (req, res) => {
  // const {divisionName,plantType,numOfPlants, numOfWorkers, discription} = req.body
  req.body.userEmail = req.user.email
  try {
    await taxi.create(req.body)
    console.log(req.body)
    res.send('taxi added')
  } catch (error) {
    res.send('something went wrong')
  }

  // const date = req.body.date;
  // const divisionName = req.body.divisionName;
  // const plantType = req.body.plantType;
  // const  numOfPlants = Number(req.body. numOfPlants);
  // const numOfWorkers = Number(req.body.numOfWorkers);
  // const discription = req.body.discription;

  // const newPlanting = new PlantingSS({

  //     date,
  //     divisionName,
  //     plantType,
  //     numOfPlants,
  //     numOfWorkers,
  //     discription

  // })

  // newPlanting.save().then(()=>{
  //     res.json("Planting Added")
  // }).catch((err)=>{
  //     console.log(err);
  // })
})

// router.route("/").get((req,res)=>{
//     taxi.find().then((planting) => {
//         res.json(planting)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

router.route('/').get(async (req, res) => {
  const taxies = await taxi.find({ userEmail: req.user.email })
  res.json(taxies)
})

router.route('/update/:id').patch(async (req, res) => {
  try {
    await taxi.findByIdAndUpdate(req.params.id, req.body)
    res.send('taxi updated')
  } catch (error) {
    res.send('Something went wrong')
  }
})

// router.route("/update/:id").put(async(req,res) =>{
//     let userId = req.params.id;
//     const{date, divisionName, plantType, numOfPlants, numOfWorkers, discription} = req.body;

//     const updatePlanting = {
//         date,
//         divisionName,
//         plantType,
//         numOfPlants,
//         numOfWorkers,
//         discription

//     }
//     const update = await PlantingSS.findByIdAndUpdate(userId, updatePlanting ).then(()=>{
//         res.status(200).send({status : "Updated Sucssecfully"})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"Error with updating data",error:err.message});
//     })

// })

// router.route("/delete/:id").delete(async(req, res)=>{
//     let userId = req.params.id;

//     await PlantingSS.findByIdAndDelete(userId).then(()=>{
//         res.status(200).send({status : "Delete Sucssecfully"})
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status:"Error with deleting data",error:err.message});
//     })
// })

router.route('/delete/:id').delete(async (req, res) => {
  try {
    await taxi.findByIdAndDelete(req.params.id)
    res.send('taxi deleted')
  } catch (error) {
    res.send('Something went wrong')
  }
})

router.route('/get/:id').get(async (req, res) => {
  try {
    const theTaxi = await taxi.findById(req.params.id)
    if (theTaxi) res.send(theTaxi)
    res.send('There is no taxi with that id')
  } catch (error) {
    res.send('Something went wrong')
  }
})

// router.route("/get/:id").get(async(req, res)=>{
//     let userId = req.params.id;
//     const user = await PlantingSS.findById(userId).then((planting)=>{
//         res.status(200).send({status : "Delete fetched",planting})
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status:"Error with get user",error:err.message});
//     })
// })

export default router
