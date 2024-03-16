//const router = require("express").Router();
import { Router } from 'express'
const router = Router ()

//let Planting = require("../models/Planting");
import PlantingSS from "../models/Planting.js";


router.route("/add").post((req,res) => {

    const date = req.body.date;
    const divisionName = req.body.divisionName;
    const plantType = req.body.plantType;
    const  numOfPlants = Number(req.body. numOfPlants);
    const numOfWorkers = Number(req.body.numOfWorkers);
    const discription = req.body.discription;

    const newPlanting = new PlantingSS({
         
        date,
        divisionName,
        plantType,
        numOfPlants,
        numOfWorkers,
        discription

    }) 

    newPlanting.save().then(()=>{
        res.json("Planting Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    PlantingSS.find().then((planting) => {
        res.json(planting)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res) =>{
    let userId = req.params.id;
    const{date, divisionName, plantType, numOfPlants, numOfWorkers, discription} = req.body;
    

    const updatePlanting = {
        date,
        divisionName,
        plantType,
        numOfPlants,
        numOfWorkers,
        discription

    }
    const update = await PlantingSS.findByIdAndUpdate(userId, updatePlanting ).then(()=>{
        res.status(200).send({status : "Updated Sucssecfully"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })

    
})

router.route("/delete/:id").delete(async(req, res)=>{
    let userId = req.params.id;

    await PlantingSS.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "Delete Sucssecfully"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })
})

router.route("/get/:id").get(async(req, res)=>{
    let userId = req.params.id;
    const user = await PlantingSS.findById(userId).then((planting)=>{
        res.status(200).send({status : "Delete fetched",planting})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});
    })
})

export default router ;