import { Outlet } from 'react-router-dom';
import {Link, Form, useNavigate, useActionData} from 'react-router-dom';
const HotelOwnerDashBoardLayout = () => {
  // const lableStyle1 = { 
  //   color:"#042630" , 
  //   fontSize: "20px", 
  // };
  const navbarStyle = {
    backgroundColor: '#4c7273',
    overflow: 'hidden',
  };

  const navbarLinkStyle = {
    float: 'left',
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 20px',
    textDecoration: 'none',
  };
  return (
    <div>
       <div style={navbarStyle} className="navbar">
       <Link to ="/HotelOwnerDashBoardLayout" style={navbarLinkStyle}>Dashboard</Link>
       <Link to ="addhotel" style={navbarLinkStyle}>Add Hotels</Link>
       <Link to ="allhotels" style={navbarLinkStyle}>Manage hotels</Link>
       <Link to ="#" style={navbarLinkStyle}>View Bookings</Link>
      </div>
      <Outlet />
    </div>
  )
}
export default HotelOwnerDashBoardLayout
