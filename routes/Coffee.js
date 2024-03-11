//const router = require("express").Router();
import { Router } from 'express'
const router = Router ()
// const router = Router()
// let cof = require("../models/Cof");
import multer from 'multer';
import path from 'path';
 import Cofe from "../models/Cof.js";
 // Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

 router.route("/add").post(upload.single('image'), (req, res) => {
    const HotelName =req.body.HotelName;
    const Email  =req.body.Email;
    const PhoneNum =Number(req.body.PhoneNum);
    const Location =req.body.Location;
    const Amenties = req.body.Amenties;
    const Description = req.body.Description;
    const RoomDetail = req.body.RoomDetail;
    const PackDetail = req.body.PackDetail;
    const imageUrl = `uploads/${req.file.filename}`;

    const newSale = new Cofe({
        HotelName,
        Email,
        PhoneNum,
        Location,
        Amenties,
        Description,
        RoomDetail,
        PackDetail,
        imageUrl
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

// Define your routes
router.route("/update/:id").put(upload.single('image'), async (req, res) => {
  try {
    let salesId = req.params.id;
    const { HotelName, Email, PhoneNum, Location, Amenties, Description, RoomDetail, PackDetail } = req.body;

    // Check if an image was uploaded
    const imageUrl = req.file ? `uploads/${req.file.filename}` : undefined;

    const updateSales = {
      HotelName,
      Email,
      PhoneNum,
      Location,
      Amenties,
      Description,
      RoomDetail,
      PackDetail,
    };

    // Add the image URL to the updateSales object if an image was uploaded
    if (imageUrl) {
      updateSales.imageUrl = imageUrl;
    }

    const updatedSale = await Cofe.findByIdAndUpdate(salesId, updateSales);

    if (!updatedSale) {
      return res.status(404).send({ status: "Sale not found" });
    }

    res.status(200).send({ status: "Sale updated" });
  } catch (err) {
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

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



