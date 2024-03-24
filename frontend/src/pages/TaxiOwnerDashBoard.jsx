import { Outlet } from 'react-router-dom'
import {Link, Form, useNavigate, useActionData} from 'react-router-dom';
const TaxiOwnerDashBoard = () => {
  return (
    <div>
      <ul >       
            
            <li >
            <Link to ="addPlanting" className="nav-link"  >Dashboard |</Link>
            <Link to ="addPlanting" className="nav-link"  >Add New Taxi |</Link>
            <Link to ="allPlanting" className="nav-link"  >Manage Taxi |</Link>
            <Link to ="allPlanting" className="nav-link" >View Taxies</Link>
            </li>
            
           <br/>
            
          </ul>
      <Outlet />
    </div>
  )
}
export default TaxiOwnerDashBoard
