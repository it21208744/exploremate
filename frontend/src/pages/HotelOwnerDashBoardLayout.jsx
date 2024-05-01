import { Outlet } from 'react-router-dom';
import {Link, Form, useNavigate, useActionData} from 'react-router-dom';
const HotelOwnerDashBoardLayout = () => {
  return (
    <div>
      <ul >       
            
            <li >
            <Link to ="addhotel" className="nav-link"  >Dashboard |</Link>
            <Link to ="addhotel" className="nav-link"  >Add New Hotels |</Link>
            <Link to ="allhotels" className="nav-link"  >Manage Hotels |</Link>
            <Link to ="allhotels" className="nav-link" >View Bookings</Link>
            </li>
            
           <br/>
            
          </ul>
      <Outlet />
    </div>
  )
}
export default HotelOwnerDashBoardLayout
