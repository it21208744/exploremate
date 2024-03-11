//const router = require("express").Router();
import { Router } from 'express'
const router = Router ()
// const router = Router()
// let cof = require("../models/Cof");
 import Cofe from "../models/Cof.js";

router.route("/add").post((req,res)=>{
    const itemNumber = Number(req.body.itemNumber);
    const itemName  =req.body.itemName;
    const price =Number(req.body.price);
    const quantity =Number(req.body.quantity);
    const discount = Number(req.body.discount);
    const cusType = req.body.cusType;


    const newSale = new Cofe({
        itemNumber,
        itemName,
        price,
        quantity,
        discount,
        cusType

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
   const {itemNumber,itemName,price,quantity,discount,cusType} = req.body;

   const updateSales = {
     
        itemNumber,
        itemName,
        price,
        quantity,
        discount,
        cusType

   }

   const update = await cof.findByIdAndUpdate(salesId , updateSales ).then(()=>{
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
    .then((cof)=>{
       res.status(200).send({status: "Sale fetched" ,cof});
    }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get sale",error:err.message});
  
    })
  
  
      
  } )

export default router ;



