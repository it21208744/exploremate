import React,{useState,useEffect,useRef} from "react";
import axios from "axios";

import { Link } from "react-router-dom";

// import EstateHeader from "./EstateHeader";
import { Table, Button, Modal } from 'react-bootstrap';
import ReactToPrint from "react-to-print";

const AllPlanting = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

    const[Plantings,setPlantings] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inputText,setInputText] = useState("");
    
       function  getPlantings () {
        axios.get("http://localhost:8070/planting/").then((res) =>{
            setPlantings(res.data);

        }).catch((err)=>{
            alert(err.message);
        })
       }

       const handleDeleteClick = (_id) => {
        setSelectedId(_id);
        setShowModal(true);
      };

       function handleDelete(){

        axios.delete(`http://localhost:8070/planting/delete/${selectedId}`).then((res)=>{
            getPlantings();
            setPlantings(Plantings.filter(item => item._id !== selectedId));
            setShowModal(false);

        }).catch((err) => {
            alert(err.message);
            setShowModal(false);
        })
         
        }

        const SetToLocalStorage = (id, date, divisionName, plantType, numOfPlants, numOfWorkers, discription) =>{

           localStorage.setItem("id",id);
           localStorage.setItem("date",date);
           localStorage.setItem("divisionName",divisionName);
           localStorage.setItem("plantType",plantType);
           localStorage.setItem("numOfPlants",numOfPlants);
           localStorage.setItem("numOfWorkers",numOfWorkers);
           localStorage.setItem("discription",discription);
    
        };

       

       

        



        useEffect(() => {
          const filteredResults = Plantings.filter(item => {
            return item.divisionName.toLowerCase().includes(searchTerm.toLowerCase());
          });
          setFilteredData(filteredResults);
        }, [Plantings, searchTerm]);
      
        const handleSearch = event => {
          setSearchTerm(event.target.value);
        };






        useEffect(() => {
       getPlantings();
    },[]);


    const [totalAmount, setTotalAmount] = useState(0);

    const handleCalculate = () => {
      let total = 0;
      Plantings.forEach((item) => {
        total += item.numOfPlants;
      });
      setTotalAmount(total);
    };

    const [totalWorkers, setTotalWorkers] = useState(0);

    const handleCalculat = () => {
      let total = 0;
      Plantings.forEach((item) => {
        total += item.numOfWorkers;
      });
      setTotalWorkers(total);
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

    const iStyle = {
  
      borderRadius: "25px",
        border: "2px solid #3c341f",
        padding: "20px",
        width: '300px',
        height: '15px',
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
        marginRight:"20px",
        marginLeft:"15px"
        
    };
    const buttonStyle1 = {
      display: "inline-block",
      
      backgroundImage: "linear-gradient(125deg,#a72879,#064497)",
      color:"#fff",
      textTransform:"uppercase",
      letterSpacing:"0px",
      fontSize: "8px",
        width:"100px",
        height:"28px",
        border:"none",
        cursor: "pointer",
        float: "right",
        marginLeft: '400px'
    };
  
  
    const lableStyle = { 
      color:"#5543ca"         
    };

    const componentRef = useRef(null);
  
    const cardstyle ={
      overflow : "hidden",
      marginTop: "10px",
      marginLeft: "-40px",
     
      width: "1200px",
      height: "450px",
      boxShadow:"0 2px 20px ",
      borderRadius: "$radius",
      transition: "transform 200ms ease-in",
      padding:"20px",
      backdropFilter: "blur(50px)",
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
                height: '110vh'

            }}>


  <div className="container" >
  <div className="">
           <center> <h1 style={lableStyle}>...All Planting Records...</h1></center> 

           <div style={{  height: '10vh' }}>
      <input type="text" value={searchTerm} style={iStyle} placeholder="Search Division" onChange={handleSearch} />

      </div>
      
      <div style={cardstyle}>
    <table class="table">
      
      
  <thead>
    <tr>
      
      <th scope="col">Date</th>
      <th scope="col">Division Name</th>
      <th scope="col">plant Type</th>
      <th scope="col">Num.OfPlants</th>
      <th scope="col">Num.OfWorkers</th>
      <th scope="col">Discription</th>
      
    </tr>
  </thead>

  {filteredData.map((item) => {
       return(
        <>

<tbody>
    <tr >
      
      <td>{item.date}</td>
      <td>{item.divisionName}</td>
      <td>{item.plantType}</td>
      <td>{item.numOfPlants}</td>
      <td>{item.numOfWorkers}</td>
      <td>{item.discription}</td>

      <Link to = "/updatep">
      <td><button className ="btn-success"onClick={() =>SetToLocalStorage(
        item._id,
        item.date,
        item.divisionName,
        item.plantType,
        item.numOfPlants,
        item.numOfWorkers,
        item.discription)}>Edit{" "}</button></td></Link>


      <td><button className ="btn-danger"onClick={() =>handleDeleteClick(item._id)}>Delete</button></td>
    </tr>
    
  </tbody>
  {<Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this planting details?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal> }
      
        
        </>
       )

  })
}



</table>



<br/><br/>
<div style={{marginLeft: "220px"}}>
      <b><p>Number of plants: {totalAmount}</p></b>
      </div>
      <div style={{marginLeft: "230px"}}>
      <button onClick={handleCalculate} style={{ backgroundColor: '#a6b992', color: 'black' }}>Calculate</button>
      </div>

      <div style={{marginTop: "-70px",marginLeft: "800px"}}>
      <b><p>Number of Workers: {totalWorkers}</p></b>
      </div>
      <div style={{marginTop: "-2px",marginLeft: "820px"}}>
      <button onClick={handleCalculat} style={{ backgroundColor: '#a6b992', color: 'black' }}>Calculate</button>
</div></div><br/>

<div className="content">
    <ReactToPrint
      trigger={() =>(
        <button
          type="button"
          className="btn btn-secondary"
          style={buttonStyle}
        >
          <i className="fas fa-print mr-2"></i>Generate Reports
        </button>
      )}
      content={() => componentRef.current} //return the current value of the reference
      />
      </div>




</div>

<br/>



{/*<div style={{marginLeft: "220px"}}>
      <b><p>Number of plants: {totalAmount}</p></b>
      </div>
      <div style={{marginLeft: "230px"}}>
      <button onClick={handleCalculate} style={{ backgroundColor: '#a6b992', color: 'black' }}>Calculate</button>
      </div>

      <div style={{marginTop: "-70px",marginLeft: "800px"}}>
      <b><p>Number of plants: {totalWorkers}</p></b>
      </div>
      <div style={{marginTop: "-2px",marginLeft: "820px"}}>
      <button onClick={handleCalculat} style={{ backgroundColor: '#a6b992', color: 'black' }}>Calculate</button>
</div>*/}

</div></div>
      
      <div hidden>
        <div ref={componentRef}>
         <center><h1>All Planting Details</h1></center> 
         <br></br>
<table class="table" >
      <thead style={{fontSize:"24px"}}>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Division Name</th>
          <th scope="col">Plant Type</th>
          <th scope="col">NumOf.Plants</th>
          <th scope="col">NumOf.Workers</th>
          <th scope="col">Discription</th>

          
        </tr>
      </thead>
      {Plantings.filter((el) => {
        if (el === "") {
          return el;
        } else {
          return el.date.toLowerCase().includes(inputText) ||
            el.divisionName.toLowerCase().includes(inputText);
        }
      })
        .map((item) => {
          return (
            <tbody style={{fontSize:"24px"}}>
              <tr>
                <th scope="row">{item.date}</th>
            <td>{item.divisionName}</td>
            <td>{item.plantType}</td>
            <td>{item.numOfPlants}</td>
            <td>{item.numOfWorkers}</td>
            <td>{item.discription}</td>
                
              </tr>

            </tbody>

          )
        })}
     
    </table>

    <br></br>
    <h4> Number of Plants: {totalAmount}</h4>

    <br></br>
    <h4> Number of Workers: {totalWorkers}</h4>


</div></div>
    </>
    );
};

export default AllPlanting