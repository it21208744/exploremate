import axios from "axios";
import React,{useState,useEffect} from "react";
//import { DatePickerDialogRjsf } from "../../utils/DatePicker";
import { useNavigate } from "react-router-dom";

const PlantUpdate = () => {
    const[id,setid] = useState(" ");
    const[date,setdate] = useState("");
    const[divisionName,setdivisionName] = useState("");
    const[plantType,setplantType] = useState("");
    const[numOfPlants,setnumOfPlants] = useState("");
    const[numOfWorkers,setnumOfWorkers] = useState("");
    const[discription,setdiscription] = useState("");
    console.log("date"+date);

    const navigate = useNavigate();


    useEffect(() => {
        setid(localStorage.getItem("id"));
        setdate(localStorage.getItem("date"));
        setdivisionName(localStorage.getItem("divisionName"));
        setplantType(localStorage.getItem("plantType"));
        setnumOfPlants(localStorage.getItem("numOfPlants"));
        setnumOfWorkers(localStorage.getItem("numOfWorkers"));
        setdiscription(localStorage.getItem("discription"));
     },[])


     const handleUpdate = (e)=>{
      e.preventDefault();
      console.log("Id...",id);
      axios.put(`http://localhost:8070/planting/update/${id}`,
      {
        
        date : date,
        divisionName : divisionName,
        plantType :plantType,
        numOfPlants:numOfPlants,
        numOfWorkers :numOfWorkers,
        discription:discription,
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
    <b><center><h1 style={lableStyle1}>Update Planting Records....</h1></center> </b>
     <form onSubmit = {handleUpdate} >
  <div className="form-group">
  <b><label for="Date" style={lableStyle}>Date</label></b>
    {/*<input type="text" className="form-control" id="date"  placeholder="Enter Date" 
      value={date}
      onChange={(e)=>{

        setdate(e.target.value);


      }}
    
    
    />*/}

{/* <DatePickerDialogRjsf  onChange={(e)=>{setdate(e) }}/> */}
    
  </div>

  <div className="form-group">
  <b><label for="divisionName" style={lableStyle}>Division Name</label>
    <input type="text" className="form-control" id="divisionName"  placeholder="Enter Division Name" style={inputStyle}
    value={divisionName}
    onChange={(e)=>{

        setdivisionName(e.target.value);


      }}
      /></b>
    
  </div>


  <div className="form-group">
  <b><label for="plantType" style={lableStyle}>CoffeePlantType</label>
    <input type="text" className="form-control" id="plantType"  placeholder="Enter coffeePlant Type" style={inputStyle}
    value={plantType}
    onChange={(e)=>{

        setplantType(e.target.value);


      }}
      /></b>
    
  </div>
  
    <div className="form-group">
    <b><label for="numOfPlants" style={lableStyle}>Number Of Coffee Plants</label>
    <input type="text" className="form-control" id="numOfPlants"  placeholder="Enter Number Of CoffeePlants" style={inputStyle}
   value={numOfPlants}
    onChange={(e)=>{

        setnumOfPlants(e.target.value);


      }}
     /></b>
    
  </div>

  <div className="form-group">
  <b><label for="numOfWorkers" style={lableStyle}>Number Of Workers</label>
    <input type="text" className="form-control" id="numOfWorkers"  placeholder="Enter Number Of Workers" style={inputStyle}
    value={numOfWorkers}
    onChange={(e)=>{

        setnumOfWorkers(e.target.value);


      }}
      /></b>
    
  </div>

  <div className="form-group">
  <b><label for="discription" style={lableStyle}>Discription</label>
    <textarea className="form-control" id="discription" rows="3" style={inputStyle}
    value={discription}
    onChange={(e)=>{

        setdiscription(e.target.value);


      }}
      /></b>
  </div>
 


  <b><center><button className="btn btn-secondary" style={buttonStyle}onClick={handleUpdate}>Update</button></center></b>
</form>
</div>  </div> 
    </>
   )

}

export default PlantUpdate