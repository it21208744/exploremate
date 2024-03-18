import React,{useState} from "react"
import axios from "axios";
// import {FutureBlockDatePickerDialogRjsf } from "../../utils/DatePicker";
// import EstateHeader from "./EstateHeader";
import { useNavigate } from "react-router-dom";

// export default function AddPlanting(){
  
 const AddPlanting = () => {



    const[date,setdate] = useState("");
    const[divisionName,setdivisionName] = useState("");
    const[plantType,setplantType] = useState("");
    const[numOfPlants,setnumOfPlants] = useState("");
    const[numOfWorkers,setnumOfWorkers] = useState("");
    const[discription,setdiscription] = useState("");
    console.log("date"+date);
    const navigate = useNavigate();

    function sendData(e){
        e.preventDefault();

        const newplanting ={
            date,
            divisionName,
            plantType,
            numOfPlants,
            numOfWorkers,
            discription,
        }
        

        axios.post("http://localhost:8070/planting/add",newplanting).then(()=>{
          navigate("/pd");
           
            
        }).catch((err)=>{
            alert(err)

        })

        
    }

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
      marginLeft: "100px",
      width: "900px",
      height: "530px",
      boxShadow:"0 2px 20px ",
      borderRadius: "$radius",
      transition: "transform 200ms ease-in",
      padding:"20px",
      backdropFilter: "blur(5px)",
      background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
        
    }
  
    return( 
      <>

        {/* <EstateHeader/> */}

      
        <div style={{
                backgroundImage: `url("./img/coffee-beans-2.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: '100vw',
                height: '100vh'

            }}>
        
        
        <div className="container">
                    <div className=""><br/>
                    <label for="topic" style={lableStyle1}><h1>...Add New Planting Records...</h1> </label> 


        

         <form onSubmit={sendData}>

         <div style={cardstyle}>
                    

  <div className="form-group">
  <label for="Date" style={lableStyle} >Date</label>

    {/*<input type="text" className="form-control" id="date"  placeholder="Enter Date"  style={inputStyle}
      onChange={(e)=>{

        setdate(e.target.value);


      }}
    
    
    />*/}
      {/* <FutureBlockDatePickerDialogRjsf  onChange={(e)=>{setdate(e) }}/> */}
  </div>

  <div className="form-group">
   <label for="divisionName" style={lableStyle} >DivisionName</label>

    <input type="text" className="form-control" id="divisionName"  placeholder="Enter Division Name" style={inputStyle}
    onChange={(e)=>{

        setdivisionName(e.target.value);


      }}required
      pattern="[a-zA-Z\s]+"
    title="Only input strings" />
    
  </div>


  <div className="form-group">
    <label for="plantType" style={lableStyle}>CoffeePlantType</label>
    <input type="text" className="form-control" id="plantType"  placeholder="Enter coffeePlant Type" style={inputStyle}
    onChange={(e)=>{

        setplantType(e.target.value);


      }}required
      pattern="[a-zA-Z\s]+"
    title="Only input strings" />
    
  </div>
  
    <div className="form-group">
    <label for="numOfPlants" style={lableStyle}>Number Of Coffee Plants</label>
    <input type="text" className="form-control" id="numOfPlants"  placeholder="Enter Number Of CoffeePlants" style={inputStyle}
    onChange={(e)=>{

        setnumOfPlants(e.target.value);


      }}required
      pattern="[0-9]+"
      title="Only integer values can be entered"/>
    
  </div>

  <div className="form-group">
   <label for="numOfWorkers" style={lableStyle}>Number Of Workers</label>
    <input type="text" className="form-control" id="numOfWorkers"  placeholder="Enter Number Of Workers" style={inputStyle}
    onChange={(e)=>{

        setnumOfWorkers(e.target.value);


      }}required
      pattern="[0-9]+"
      title="Only integer values can be entered"/>
    
  </div>

  <div className="form-group">
    <label for="discription" style={lableStyle}>Discription</label>
    <textarea className="form-control" id="discription" rows="1"
    onChange={(e)=>{

        setdiscription(e.target.value);


      }}required/>
  </div></div>

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <button type="submit" class="btn btn-primary" style={buttonStyle}>Add</button></div>


</form>





      </div>
      </div>
      </div>
      </>
    )

    }

    export default AddPlanting
