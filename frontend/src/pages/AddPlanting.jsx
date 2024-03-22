import React,{useState} from "react"
import axios from "axios";

// import {FutureBlockDatePickerDialogRjsf } from "../../utils/DatePicker";
// import EstateHeader from "./EstateHeader";
import { useNavigate, Form, redirect } from "react-router-dom";
import {toast} from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
 console.log(data)

  try {
    const res = await axios.post('/api/v1/planting/add/', data)
    console.log(res)
    toast.success('Registration successful')
    // return redirect('/login')
    return res
  } catch (error) {
    console.log(error)
    // toast.error(error?.response?.data?.msg)
    toast.error('something went wrong')
 
    return error
  }
}

// export default function AddPlanting(){
  
 const AddPlanting = () => {



    // const[date,setdate] = useState("");
    // const[divisionName,setdivisionName] = useState("");
    // const[plantType,setplantType] = useState("");
    // const[numOfPlants,setnumOfPlants] = useState("");
    // const[numOfWorkers,setnumOfWorkers] = useState("");
    // const[discription,setdiscription] = useState("");
    // console.log("date"+date);
    // const navigate = useNavigate();

    //  function sendData(e){
    //     e.preventDefault();


    // const[companyName,setcompanyName] = useState("");
    // const[bussinessRegNo,setbussinessRegNo] = useState("");
    // const[companyEmail,setcompanyEmail] = useState("");
    // const[comContactNo,setcomContactNo] = useState("");

    // const[vehicleType,setvehicleType] = useState("");
    // const[vehicleModel,setvehicleModel] = useState("");
    // const[ licenNo,setlicenNo] = useState("");
    // const[inssuranceCompany,setinssuranceCompany] = useState("");

    // const[driverName,setdriverName] = useState("");
    // const[driverEmail,setdriverEmail] = useState("");
    // const[contactNumber,setcontactNumber] = useState("");
    // const[driverLiceNo,setdriverLiceNo] = useState("");
    

    //     const newplanting ={
    //         // date,
    //         // divisionName,
    //         // plantType,
    //         // numOfPlants,
    //         // numOfWorkers,
    //         // discription,

    //         companyName,
    //         bussinessRegNo,
    //         companyEmail,
    //         comContactNo,

    //         vehicleType,
    //         vehicleModel,
    //         licenNo,
    //         inssuranceCompany,

    //         driverName,
    //         driverEmail,
    //         contactNumber,
    //         driverLiceNo,
          



    //     }
        

    //     axios.post("http://localhost:8070/planting/add",newplanting).then(()=>{
    //       navigate("/pd");
           
            
    //     }).catch((err)=>{
    //         alert(err)

    //     })

        
    // }

    const inputStyle = {
      display: "block",
        width:"100%",
        height:"36px",
        borderWidth: "0 0 2px 0",
        borderColor: "#5543ca",
        fontSize: "18px",
        fontWeight: "400",
        LineHeight: '26px',
    };

    const buttonStyle = {
      display: "inline-block",
      backgroundImage: "linear-gradient(125deg,#a72879,#064497)",
      color:"#fff",
      textTransform:"uppercase",
      letterSpacing:"2px",
      fontSize: "16px",
        width:"200px",
        height:"36px",
        border:"none",
        cursor: "pointer",
        marginTop: "6px",
    };

    const lableStyle = { 
      color:"#064497"         
    };
    const lableStyle1 = { 
      marginTop: "-50px",
      marginBottom: "-30px",
      marginLeft: "350px",
      color:"#064497" ,
      fontWeight: "500",  
      
    };

    const cardstyle ={
      overflow : "hidden",
      marginTop: "10px",
      marginLeft: "285px",
      width: "900px",
      height: "1000px",
      boxShadow:"0 2px 20px ",
      borderRadius: "$radius",
      transition: "transform 200ms ease-in",
      padding:"20px",
      backdropFilter: "blur(5px)",
      background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
        
    }
  
    return( 
      <>



      
        <div style={{
                backgroundImage: `url("./img/coffee-beans-2.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: '100vw',
                height: '100vh'

            }}>
        
        
        <div className="container">
                    <div className=""><br/>
                    <label htmlFor="topic"  style={lableStyle1}><center><h1>...Add New Taxies...</h1></center> </label> 


        

         <Form method="post">

         <div style={cardstyle}>
                    








 

 



<h2>Company details</h2>

 <div className="form-group">
   <label htmlFor="companyName" style={lableStyle} >CompanyName</label>

    <input type="text" className="form-control" id="companyName" name="companyName"  placeholder=" Company Name" style={inputStyle}
    // onChange={(e)=>{

    //     setcompanyName(e.target.value);


    //   }}
    // required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
 

 <div className="form-group">
   <label htmlFor="bussinessRegNo" style={lableStyle} >BussinessRegNo</label>

    <input type="text" className="form-control" id="bussinessRegNo" name="bussinessRegNo"  placeholder="Enter bussiness RegNo" style={inputStyle}
    // onChange={(e)=>{

    //     setbussinessRegNo(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
 
  <div className="form-group">
   <label htmlFor="companyEmail" style={lableStyle} >CompanyEmail</label>

    <input type="text" className="form-control" id="companyEmail" name="companyEmail"  placeholder="Enter company Email" style={inputStyle}
    // onChange={(e)=>{

    //     setcompanyEmail(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
  <div className="form-group">
 <label htmlFor="comContactNo" style={lableStyle} >ComContactNo</label>

  <input type="number" className="form-control" id="comContactNo" name="comContactNo"  placeholder="Enter comContactNo" style={inputStyle}
  // onChange={(e)=>{

  //     setcomContactNo(e.target.value);


  //   }}
  //   required
  //   pattern="[a-zA-Z\s]+"
  // title="Only input strings" 
  />


  <h2>vehicle details</h2>


</div>

 <div className="form-group">
   <label htmlFor="vehicleType" style={lableStyle} >VehicleType</label>

    <input type="text" className="form-control" id="vehicleType" name="vehicleType" placeholder="Enter vehicleType" style={inputStyle}
    // onChange={(e)=>{

    //     setvehicleType(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
 
  <div className="form-group">
   <label htmlFor=" vehicleModel" style={lableStyle} > VehicleModel</label>

    <input type="text" className="form-control" id=" vehicleModel" name="vehicleModel"  placeholder="VehicleModel" style={inputStyle}
    // onChange={(e)=>{

    //     setvehicleModel(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
 
  <div className="form-group">
   <label htmlFor="licenNo" style={lableStyle} >LicenNo</label>

    <input type="text" className="form-control" id="licenNo" name="licenNo"  placeholder="Licen Number" style={inputStyle}
    // onChange={(e)=>{

    //     setdivisionName(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
  <div className="form-group">
 <label htmlFor="inssuranceCompany" style={lableStyle} >InssuranceCompany</label>

  <input type="text" className="form-control" id="inssuranceCompany" name="inssuranceCompany"  placeholder="Inssurance Company" style={inputStyle}
  // onChange={(e)=>{

  //     setinssuranceCompany(e.target.value);


  //   }}
  //   required
  //   pattern="[a-zA-Z\s]+"
  // title="Only input strings" 
  />
  
</div>


<h2>Driver info</h2>
 <div className="form-group">
   <label htmlFor="driverName" style={lableStyle} >DriverName</label>

    <input type="text" className="form-control" id="driverName" name="driverName"  placeholder="Driver Name" style={inputStyle}
    // onChange={(e)=>{

    //     setdriverName(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
  <div className="form-group">
   <label htmlFor="driverEmail" style={lableStyle} >DriverEmail</label>

    <input type="text" className="form-control" id="driverEmail" name="driverEmail"  placeholder="Driver Email" style={inputStyle}
    // onChange={(e)=>{

    //     setdriverEmail(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
 <div className="form-group">
   <label htmlFor="contactNumber" style={lableStyle} >ContactNumber</label>

    <input type="text" className="form-control" id="contactNumber" name="contactNumber"  placeholder="Contact Number" style={inputStyle}
    // onChange={(e)=>{

    //     setcontactNumber(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings" 
    />
    
  </div>
 <div className="form-group">
   <label htmlFor="driverLiceNo" style={lableStyle} >DriverLiceNo</label>

    <input type="text" className="form-control" id="driverLiceNo" name="driverLiceNo"  placeholder="Driver Licen Number" style={inputStyle}
    // onChange={(e)=>{

    //     setdriverLiceNo(e.target.value);


    //   }}
    //   required
    //   pattern="[a-zA-Z\s]+"
    // title="Only input strings"
     />
    
  </div>
 
</div>



  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <button type="submit" className="btn btn-primary" style={buttonStyle}>Add</button></div>


</Form>





      </div>
      </div>
      </div>
      </>
    )

    }

    export default AddPlanting
