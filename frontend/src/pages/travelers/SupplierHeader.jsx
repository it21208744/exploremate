import React from "react";
import { Link } from "react-router-dom";

const SupplierHeader = () => {
  const navStyle = {
    // backgroundColor: "#ffffff", // Background color for the navbar
    //backgroundImage: "linear-gradient(125deg,#8c9294,#4c7273)",
    // padding: "10px 0", // Padding for the navbar
    borderBottom: "2px solid #CCCCCC", // Bottom border for the navbar
    position: "relative",
    left: "50vh",
    width:"1000px",
    overflow : "hidden",
    boxShadow:"0 2px 20px ",
    borderRadius: "10px",
    transition: "transform 200ms ease-in",
    padding:"1px",
    backdropFilter: "blur(5px)",
    backgroundColor: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))"
    
  };

  const linkButtonStyle = {
    color: "#FFFFFF", // Text color for the link buttons
    backgroundColor: "#5543ca", // Background color for the link buttons
    fontWeight: "400", // Font weight for the link buttons
    fontSize: "18px", // Font size for the link buttons
    padding: "10px 20px", // Padding for the link buttons
    borderRadius: "5px", // Border radius for the link buttons
    margin: "0 10px", // Margin between link buttons
    textDecoration: "none", // Remove default underline for links
    
  };

  const listItemStyle = {
    display: "inline-block", // Display list items horizontally
  };

  const buttonStyle = {
    // display: "inline-block",
    // backgroundImage: "linear-gradient(125deg,#4e5253,#4c7273)",
    backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    // backgroundColor: "#c46804",
    
    color:"#fff",
    textTransform:"uppercase",
    letterSpacing:"2px",
    fontSize: "16px",
      width:"200px",
      height:"36px",
      border:"none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft:"70px",
      
      
  };
 
  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={listItemStyle}>
              <button className="nav-link" style={buttonStyle}>
                <Link to="/travelerDashBoard/profile" style={{ color: "#ffffff" ,textDecoration: "none"}}>
                  Profile
                </Link>
              </button>
            </li>
            <li className="nav-item" style={listItemStyle}>
              <button className="nav-link" style={buttonStyle}>
                <Link to="/feedbackTabel" style={{ color: "#FFFFFF",textDecoration: "none" }}>
                  FeedBacks
                </Link>
              </button>
            </li>
            <li className="nav-item" style={listItemStyle}>
              <button className="nav-link" style={buttonStyle}>
                <Link to="/deliverdhome" style={{ color: "#FFFFFF",textDecoration: "none" }}>
                  Bookings
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SupplierHeader;
