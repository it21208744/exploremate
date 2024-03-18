//const router = require("express").Router();
import { Router } from 'express'
const router = Router ()
// const router = Router()
// let cof = require("../models/Cof");
 import Cofe from "../models/Cof.js";

router.route("/add").post((req,res)=>{
    const HotelName = req.body.HotelName;
    const Email  =req.body.Email;
    const PhoneNum =Number(req.body.PhoneNum);
    const Location =req.body.Location;
    const Amenties = req.body.Amenties;
    const  Description = req.body.Description;
    const  RoomDetail = req.body.RoomDetail;
    const  PackDetail = req.body.PackDetail;



    const newSale = new Cofe({
      HotelName,
      Email ,
     PhoneNum ,
      Location ,
      Amenties ,
       Description ,
      RoomDetail ,
      PackDetail 

    })

    newSale.save().then(()=>{
      res.json("Sales added")
    }).catch((err)=>{
        console.log(err);
    })



})


router.route("/").get((req,res)=>{

Cofe.find().then((Coffees)=>{
  res.json(Coffees)

}).catch((err)=>{
    console.log(err)
})

})

router.route("/update/:id").put(async (req,res)=>{
    
   let salesId = req.params.id;
   const {HotelName,
    Email ,
   PhoneNum ,
    Location ,
    Amenties ,
     Description ,
    RoomDetail ,
    PackDetail } = req.body;

   const updateSales = {
     
    HotelName,
    Email ,
   PhoneNum ,
    Location ,
    Amenties ,
     Description ,
    RoomDetail ,
    PackDetail 

   }

   const update = await Cofe.findByIdAndUpdate(salesId , updateSales ).then(()=>{
    res.status(200).send({status: "Sales updated" })
   }).catch((err)=>{
    res.status(500).send({status: "Error with updating data" , error: err.message })

   })
    

})

router.route("/delete/:id").delete(async(req,res)=>{
  let salesId = req.params.id;
  await Cofe.findByIdAndDelete(salesId)
  .then(()=>{
     res.status(200).send({status: "Sale deleted"});
  }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status: "Error with delete sale",error:err.message});

  })


    
} )


router.route("/get/:id").get(async(req,res)=>{
    let salesId = req.params.id;
    const sale = await Cofe.findById(salesId)
    .then((Cofe)=>{
       res.status(200).send({status: "Sale fetched" ,Cofe});
    }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get sale",error:err.message});
  
    })
  
  
      
  } )

export default router ;