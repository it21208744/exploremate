import axios from "axios";
import React,{useState,useEffect} from "react";
//import { DatePickerDialogRjsf } from "../../utils/DatePicker";
import { useNavigate } from "react-router-dom";

const PlantUpdate = () => {
    // const[id,setid] = useState(" ");
    // const[date,setdate] = useState("");
    // const[divisionName,setdivisionName] = useState("");
    // const[plantType,setplantType] = useState("");
    // const[numOfPlants,setnumOfPlants] = useState("");
    // const[numOfWorkers,setnumOfWorkers] = useState("");
    // const[discription,setdiscription] = useState("");
    // console.log("date"+date);

    const[id,setid] = useState(" ");
    const[companyName,setcompanyName] = useState(" ");
    const[bussinessRegNo,setbussinessRegNo] = useState("");
    const[companyEmail,setcompanyEmail] = useState("");
    const[comContactNo,setcomContactNo] = useState("");

    const[vehicleType,setvehicleType] = useState("");
    const[vehicleModel,setvehicleModel] = useState("");
    const[licenNo,setlicenNo] = useState(" ");
    const[ inssuranceCompany,setinssuranceCompany] = useState("");

    const[driverName,setdriverName] = useState("");
    const[driverEmail,setdriverEmail] = useState("");
    const[contactNumber,setcontactNumber] = useState("");
    const[driverLiceNo,setdriverLiceNo] = useState("");
    

    const navigate = useNavigate();


    // useEffect(() => {
    //     // setid(localStorage.getItem("id"));
    //     // setdate(localStorage.getItem("date"));
    //     // setdivisionName(localStorage.getItem("divisionName"));
    //     // setplantType(localStorage.getItem("plantType"));
    //     // setnumOfPlants(localStorage.getItem("numOfPlants"));
    //     // setnumOfWorkers(localStorage.getItem("numOfWorkers"));
    //     // setdiscription(localStorage.getItem("discription"));

    //     const[id,setid] = useState(" ");
    //     setcompanyName(localStorage.getItem("companyName"));
    //     setbussinessRegNo(localStorage.getItem("bussinessRegNo"));
    //     setcompanyEmail(localStorage.getItem("companyEmail"));
    //     setcomContactNo(localStorage.getItem("comContactNo"));

    //     setvehicleType(localStorage.getItem("vehicleType"));
    //     setvehicleModel(localStorage.getItem("vehicleModel"));
    //     setlicenNo(localStorage.getItem("licenNo"));
    //     setinssuranceCompany(localStorage.getItem("inssuranceCompany"));

    //     setdriverName(localStorage.getItem("driverName"));
    //     setdriverEmail(localStorage.getItem("driverEmail"));
    //     setcontactNumber(localStorage.getItem("contactNumber"));
    //     setdriverLiceNo(localStorage.getItem("driverLiceNo"));
        






    //  },[])


     const handleUpdate = (e)=>{
      e.preventDefault();
      console.log("Id...",id);
      axios.put(`http://localhost:8070/planting/update/${id}`,
      {
        
        // date : date,
        // divisionName : divisionName,
        // plantType :plantType,
        // numOfPlants:numOfPlants,
        // numOfWorkers :numOfWorkers,
        // discription:discription,

        companyName:companyName,
        bussinessRegNo:bussinessRegNo,
        companyEmail:companyEmail,
        comContactNo:comContactNo,

        vehicleType:vehicleType,
        vehicleModel:vehicleModel,
        licenNo:licenNo,
        inssuranceCompany:inssuranceCompany,

        driverName:driverName,
        driverEmail:driverEmail,
        contactNumber:contactNumber,
        driverLiceNo:driverLiceNo,




      }
      ).then(()=>{
          navigate("/pd");
      });
  };


  const lableStyle1 = { 
    
    color:"#064497" ,
    fontWeight: "500",  
    
  };
  const lableStyle = { 
    color:"#064497"         
  };

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
    


    


   return(


    <>
   <div style={{
                backgroundImage: `url("./img/coffee-beans-2.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: '100vw',
                height: '110vh'

            }}>
    <div className="container" >
    <b><center><h1 style={lableStyle1}>Update Taxies Records....</h1></center> </b>
     <form onSubmit = {handleUpdate} >
  <div className="form-group">
  {/* <b><label htmlFor="Date" style={lableStyle}>Date</label></b> */}
    {/*<input type="text" className="form-control" id="date"  placeholder="Enter Date" 
      value={date}
      onChange={(e)=>{

        setdate(e.target.value);


      }}
    
    
    />*/}

{/* <DatePickerDialogRjsf  onChange={(e)=>{setdate(e) }}/> */}
    
  {/* </div>

  <div className="form-group">
  <b><label htmlFor="divisionName" style={lableStyle}>Division Name</label>
    <input type="text" className="form-control" id="divisionName"  placeholder="Enter Division Name" style={inputStyle}
    value={divisionName}
    onChange={(e)=>{

        setdivisionName(e.target.value);


      }}
      /></b>
    
  </div> */}

  


  {/* <div className="form-group">
  <b><label htmlFor="plantType" style={lableStyle}>CoffeePlantType</label>
    <input type="text" className="form-control" id="plantType"  placeholder="Enter coffeePlant Type" style={inputStyle}
    value={plantType}
    onChange={(e)=>{

        setplantType(e.target.value);


      }}
      /></b>
    
  </div>
   */}
    {/* <div className="form-group">
    <b><label htmlFor="numOfPlants" style={lableStyle}>Number Of Coffee Plants</label>
    <input type="text" className="form-control" id="numOfPlants"  placeholder="Enter Number Of CoffeePlants" style={inputStyle}
   value={numOfPlants}
    onChange={(e)=>{

        setnumOfPlants(e.target.value);


      }}
     /></b>
    
  </div> */}

  {/* <div className="form-group">
  <b><label htmlFor="numOfWorkers" style={lableStyle}>Number Of Workers</label>
    <input type="text" className="form-control" id="numOfWorkers"  placeholder="Enter Number Of Workers" style={inputStyle}
    value={numOfWorkers}
    onChange={(e)=>{

        setnumOfWorkers(e.target.value);


      }}
      /></b>
    
  </div> */}

  {/* <div className="form-group">
  <b><label htmlFor="discription" style={lableStyle}>Discription</label>
    <textarea className="form-control" id="discription" rows="3" style={inputStyle}
    value={discription}
    onChange={(e)=>{

        setdiscription(e.target.value);


      }}
      /></b>
  </div>
  */}

<h2>Company details</h2>
<div className="form-group">
<b><label htmlFor="companyName" style={lableStyle} >CompanyName</label>

    <input type="text" className="form-control" id="companyName"  placeholder=" Company Name" style={inputStyle}
    value={companyName}
    onChange={(e)=>{

        setcompanyName(e.target.value);


      }}
      /></b>
    
  </div> 
  <div className="form-group">
  <b><label htmlFor="bussinessRegNo" style={lableStyle} >BussinessRegNo</label>

    <input type="text" className="form-control" id="bussinessRegNo"  placeholder="Enter bussiness RegNo" style={inputStyle}
    value={bussinessRegNo}
    onChange={(e)=>{

        setbussinessRegNo(e.target.value);


      }} /></b>
    
  </div>
   
  <div className="form-group">
  <b><label htmlFor="companyEmail" style={lableStyle} >CompanyEmail</label>

    <input type="text" className="form-control" id="companyEmail"  placeholder="Enter company Email" style={inputStyle}
    value={companyEmail}
    onChange={(e)=>{

        setcompanyEmail(e.target.value);


      }}/></b>
    
  </div>

  <div className="form-group">
 <label htmlFor="comContactNo" style={lableStyle} >ComContactNo</label>

 <b><input type="text" className="form-control" id="comContactNo"  placeholder="Enter comContactNo" style={inputStyle}
  value={comContactNo}
  onChange={(e)=>{

      setcomContactNo(e.target.value);


    }}/></b>


  <h2>vehicle details</h2>


</div>

<div className="form-group">
<b><label htmlFor="vehicleType" style={lableStyle} >VehicleType</label>

    <input type="text" className="form-control" id="vehicleType"  placeholder="Enter vehicleType" style={inputStyle}
    value={vehicleType}
    onChange={(e)=>{

        setvehicleType(e.target.value);


      }}/></b>
    
  </div>


  <div className="form-group">
  <b><label htmlFor=" vehicleModel" style={lableStyle} > VehicleModel</label>

    <input type="text" className="form-control" id=" vehicleModel"  placeholder="VehicleModel" style={inputStyle}
    value={vehicleModel}
    onChange={(e)=>{

        setvehicleModel(e.target.value);


      }} /></b>
    
  </div>

  <div className="form-group">
  <b><label htmlFor="licenNo" style={lableStyle} >LicenNo</label>

    <input type="text" className="form-control" id="licenNo"  placeholder="Licen Number" style={inputStyle}
    value={licenNo}
    onChange={(e)=>{

        setdivisionName(e.target.value);


      }}/></b>
    
  </div>

  <div className="form-group">
  <b><label htmlFor="inssuranceCompany" style={lableStyle} >InssuranceCompany</label>

  <input type="text" className="form-control" id="inssuranceCompany"  placeholder="Inssurance Company" style={inputStyle}
  value={inssuranceCompany}
  onChange={(e)=>{

      setinssuranceCompany(e.target.value);


    }} /></b>
  
</div>
<h2>Driver info</h2>

<div className="form-group">
<b><label htmlFor="driverName" style={lableStyle} >DriverName</label>

    <input type="text" className="form-control" id="divisionName"  placeholder="Driver Name" style={inputStyle}
    value={'hehe'}
    onChange={(e)=>{

        setdriverName(e.target.value);


      }} /></b>
    
  </div>
  <div className="form-group">
  <b><label htmlFor="driverEmail" style={lableStyle} >DriverEmail</label>

    <input type="text" className="form-control" id="driverEmail"  placeholder="Driver Email" style={inputStyle}
    value={driverEmail}
    onChange={(e)=>{

        setdriverEmail(e.target.value);


      }}/></b>
    
  </div>

  <div className="form-group">
  <b><label htmlFor="contactNumber" style={lableStyle} >ContactNumber</label>

    <input type="text" className="form-control" id="contactNumber"  placeholder="Contact Number" style={inputStyle}
    value={contactNumber}
    onChange={(e)=>{

        setcontactNumber(e.target.value);


      }} /></b>
    
  </div>

  <div className="form-group">
  <b><label htmlFor="driverLiceNo" style={lableStyle} >DriverLiceNo</label>

    <input type="text" className="form-control" id="driverLiceNo"  placeholder="Driver Licen Number" style={inputStyle}
    value={driverLiceNo}
    onChange={(e)=>{

        setdriverLiceNo(e.target.value);


      }}/></b>
    
  </div>





  </div>
  <b><center><button className="btn btn-secondary" style={buttonStyle}onClick={handleUpdate}>Update</button></center></b>
</form>
</div>  </div> 
    </>
   )

}

export default PlantUpdate