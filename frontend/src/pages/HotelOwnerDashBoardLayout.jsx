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
    //marginLeft:'80px',
    padding: '14px 20px',
    textDecoration: 'none',
    fontFamily: "Inter, systemUi, Avenir, Helvetica, Arial, sansSerif",
  };
  return (
    <div>
       <div>
  <header style={{
    position: 'absolute', 
    top: 0, 
    width: '100%', 
    background: 'rgba(255, 255, 255, 0.5)', //rgba(255, 255, 255, 0.5)
    display: 'flex', 
    justifyContent: 'space-between', // Align left and center sections
    alignItems: 'center',
    
    padding: '10px 20px' // Adds padding for visual balance
  }}>
    <nav style={{ width: '100%' }}>
      <ul style={{
        display: 'flex', 
        listStyleType: 'none', 
        margin: 0, 
        padding: 0, 
        justifyContent: 'space-between', // Spreads content to utilize full width
      }}>
        {/* Left-aligned item */}
        <li style={{ padding: '0 15px', color:'#414654', fontWeight: "800",marginTop:'10px' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#041421',  fontFamily: "Cursive,Brush Script MT", marginTop:'10px' }}>EXPLOREMATE</a>
        </li>
        
        {/* Center-aligned section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flex: 1, // Ensures it takes the rest of the space 
        }}>
  
  {/* <Link to ="/HotelOwnerDashBoardLayout" style={navbarLinkStyle}>Dashboard</Link>
       <Link to ="addhotel" style={navbarLinkStyle}>Add Hotels</Link>
       <Link to ="allhotels" style={navbarLinkStyle}>Manage hotels</Link>
       <Link to ="#" style={navbarLinkStyle}>View Bookings</Link> */}



          <li style={{ padding: '0 15px', marginTop:'10px',}}>
            <Link to ="addhotel" style={{ textDecoration: 'none', color: '#041421',fontFamily: "Inter, systemUi, Avenir, Helvetica, Arial, sansSerif", }}>Add hotels</Link>
          </li>
          <li style={{ padding: '0 15px',marginTop:'10px', }}>
          <Link to ="allhotels" style={{ textDecoration: 'none', color: '#041421' ,fontFamily: "Inter, systemUi, Avenir, Helvetica, Arial, sansSerif",}}>Manage hotels</Link>
          </li>
          <li style={{ padding: '0 15px' ,marginTop:'10px',}}>
          <Link to ="#" style={{ textDecoration: 'none', color: '#041421' ,fontFamily: "Inter, systemUi, Avenir, Helvetica, Arial, sansSerif",}}>LogIn</Link>
          </li>




        </div>
      </ul>
    </nav>
  </header>
</div>


      <Outlet />
    </div>
  )
}
export default HotelOwnerDashBoardLayout
