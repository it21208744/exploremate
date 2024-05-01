import { Outlet } from 'react-router-dom'
import {Link, Form, useNavigate, useActionData} from 'react-router-dom';
const TaxiOwnerDashBoard = () => {

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
            <Link to ="/TaxiOwnerDashBoard" style={navbarLinkStyle} >Dashboard |</Link>
            <Link to ="addPlanting" style={navbarLinkStyle}  >Add New Taxi |</Link>
            <Link to ="allPlanting" style={navbarLinkStyle} >Manage Taxi |</Link>
            <Link to ="allPlanting" style={navbarLinkStyle}>View Taxies</Link>
            </div>
            
           
            
          
      <Outlet />
    </div>
  )
}
export default TaxiOwnerDashBoard
