//const router = require("express").Router();
import { Router } from 'express'
const router = Router ()
// const router = Router()
// let cof = require("../models/Cof");
 import hotel from "../models/Cof.js";



 
router.route("/add").post(async (req,res)=>{
  //const {HotelName, Email, PhoneNum,Location,Amenties,Description, RoomDetail, PackDetail} = req.body

    const HotelName = req.body.HotelName;
    const Email  =req.body.Email;
    const PhoneNum =Number(req.body.PhoneNum);
    const Location =req.body.Location;
    const Amenties = req.body.Amenties;
    const  Description = req.body.Description;
    const  RoomDetail = req.body.RoomDetail;
    const  PackDetail = req.body.PackDetail;

    

    const newSale = new hotel({
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
    res.send("Sales added")
     }).catch((err)=>{
        console.log(err);
        res.send("error occured")
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

   const update = await hotel.findByIdAndUpdate(salesId , updateSales ).then(()=>{
    res.status(200).send({status: "Sales updated" })
   }).catch((err)=>{
    res.status(500).send({status: "Error with updating data" , error: err.message })

   })
    

})

router.route("/delete/:id").delete(async(req,res)=>{
  let salesId = req.params.id;
  await hotel.findByIdAndDelete(salesId)
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
    .then((hotel)=>{
       res.status(200).send({status: "Sale fetched" ,hotel});
    }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get sale",error:err.message});
  
    })
  
  
      
  } )

export default router ;