import React, {useState, useEffect,useRef} from 'react'
import axios from "axios";

import { Alert } from 'react-bootstrap';
import SalesHeader from './SalesHeader';
import { Table, Button, Modal } from 'react-bootstrap';
import ReactToPrint from "react-to-print";

export default function AllSales(){
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

 const[Coffees, setCoffees] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [inputText,setInputText] = useState("");

     function getCoffees(){
        axios.get("http://localhost:8070/Coffee/").then((res) => {
            setCoffees(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const handleDeleteClick = (_id) => {
      setSelectedId(_id);
      setShowModal(true);
    };



    function handleDelete(){

        axios.delete(`http://localhost:8070/Coffee/delete/${selectedId}`).then((res)=>{
            getCoffees();
            setCoffees(Coffees.filter(item => item._id !== selectedId));
            setShowModal(false);
        }).catch((err) => {
            alert(err.message);
            setShowModal(false);
        })
         
        }

        const SetToLocalStorage = (id, itemNumber, itemName, price, quantity,discount, cusType) =>{

          localStorage.setItem("id",id);
          localStorage.setItem("itemNumber",itemNumber);
          localStorage.setItem("itemName",itemName);
          localStorage.setItem("price",price);
          localStorage.setItem("quantity",quantity);
          localStorage.setItem("discount",discount);
          localStorage.setItem("cusType",cusType);
          
   
       };

    

      const calculateMul = (item) => {
        return (item.price - item.discount) * item.quantity;
      };


      useEffect(() => {
        const filteredResults = Coffees.filter(item => {
          return item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredData(filteredResults);
      }, [Coffees, searchTerm]);
    
      const handleSearch = event => {
        setSearchTerm(event.target.value);
      };
    


       

    useEffect(() => {
        getCoffees();
       
     },[] )

  const [totalAmount, setTotalAmount] = useState(0);

  const handleAmountChange = (e) => {
    const newAmount = parseFloat(e.target.value);
    setTotalAmount(totalAmount + newAmount);
  };

  const notification = totalAmount > 100000 ? (
    <div className="notification" style={{color: "red"}}>Total amount exceeds 100,000</div>
  ) : <div className="notification"></div>;
 

  const handleCalculate = () => {
    let total = 0;
    Coffees.forEach((item) => {
      total += calculateMul(item);
    });
    setTotalAmount(total);
  };

  const componentRef = useRef(null);
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

 
  const buttonStyle1 = {
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
      float: "right",
      marginRight: '1200px'
  };


  const lableStyle = { 
    color:"#5543ca"         
  };

  const cardstyle ={
    overflow : "hidden",
    boxShadow:"0 2px 20px ",
    borderRadius: "$radius",
    transition: "transform 200ms ease-in",
    padding:"20px",
    backdropFilter: "blur(50px)",
    background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
    marginLeft:"60px",
    marginRight:"60px"
  }
   

 const searchStyle = {
  
  borderRadius: "25px",
  borderColor:"#5543ca",
    border: "2px solid #3c341f",
    padding: "20px",
    width: '300px',
    height: '15px',
};
    return (
      <>
      
      <div style={{backgroundImage:`url("./images/coffee-beans-2.jpg")`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      width: '100vw',
    height: '100vh'
      
}}>
  <SalesHeader/>
  <div className="d-flex flex-direction-column justify-content-between m-2">
      <h3 style={lableStyle}>Sales Details</h3>
  
      <div class="mb-3" >
      <input type="text" value={searchTerm} style={searchStyle} placeholder="Search Item name ............." onChange={handleSearch} />
      </div>
    </div>
      <div style={{marginLeft:"600px" , fontSize:"20px"}}>
      {notification}
      </div>
    <br></br>
    <div style={cardstyle}>
      <table class="table table-striped" id="my-table" style={{color: "#000"}}>
      <thead>
  <tr>
    
    <th>Item Number</th>
    <th>Item Name</th>
    <th>Price(Rs)</th>
    <th>Quantity(# of Items)</th>
    <th>Discount(per item)</th>
    <th>Customer Type</th>
    <th>Amount</th>
  </tr>
  </thead>
  <tbody>
    {filteredData.map((item)=>(
       <tr key={item._id}>

            
            <td>{item.itemNumber}</td>
            <td>{item.itemName}</td>
            <td >{item.price}</td>
            <td  >{item.quantity}</td>
            <td  >{item.discount}</td>
            <td>{item.cusType}</td>
            <td>{calculateMul(item)}</td>


          <a href = "/updateSle1">
        <td><button className ="btn-success"onClick={() =>SetToLocalStorage(
          item._id,
          item.itemNumber,
          item.itemName,
          item.price,
          item.quantity,
          item.discount,
          item.cusType)}>Edit{" "}</button></td></a>
          <td><button className="btn-danger" onClick={() =>handleDeleteClick(item._id)}>Delete</button></td>
         
  
         
      </tr>))}
    
      </tbody>
      </table>
     
      
      <div style={{marginLeft: "950px" , color: "#000"}}>
      <p  onChange={handleAmountChange}>Total Amount: {totalAmount}</p>
      </div>
      <div style={{marginLeft: "960px"}}>
      <button onClick={handleCalculate} style={{ backgroundColor: '#a6b992', color: 'black' }}>Calculate</button>
      </div>
      
      </div>
      <br></br>
      <div className="content">
    <ReactToPrint
      trigger={() =>(
        <button
          type="button"
          className="btn btn-secondary"
          style={buttonStyle1}
        >
          <i className="fas fa-print mr-2"></i>Generate Reports
        </button>
      )}
      content={() => componentRef.current} //return the current value of the reference
      />
      </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
      
      <div hidden>
        <div ref={componentRef}>
         <center><h1>All Sales Details</h1></center> 
         <br></br>
<table class="table" >
      <thead style={{fontSize:"24px"}}>
        <tr>
          <th scope="col">Item Number</th>
          <th scope="col">Item Name</th>
          <th scope="col">Price(Rs)</th>
          <th scope="col">Quantity(# of Items)</th>
          <th scope="col">Discount(Rs per item)</th>
          <th scope="col">Customer Type</th>
          <th scope="col">Amount</th>
         

          
        </tr>
      </thead>
      {Coffees.filter((el) => {
        if (el === "") {
          return el;
        } else {
          return el.itemName.toLowerCase().includes(inputText) ||
            el.cusType.toLowerCase().includes(inputText);
        }
      })
        .map((item) => {
          return (
            <tbody style={{fontSize:"24px"}}>
              <tr>
                <th scope="row">{item.itemNumber}</th>
            <td>{item.itemName}</td>
            <td >{item.price}</td>
            <td  >{item.quantity}</td>
            <td  >{item.discount}</td>
            <td>{item.cusType}</td>
            <td>{calculateMul(item)}</td>
                
              </tr>

            </tbody>

          )
        })}
     
    </table>
    <br></br>
    <h4> Total Amount: {totalAmount}</h4>
    </div>
</div>
      </>
    );
    

    
 
}