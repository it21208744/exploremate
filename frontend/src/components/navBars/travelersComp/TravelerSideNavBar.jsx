import Wrapper from '../../../assets/wrappers/travelersWrappers/TravelerSideNavBar'
import { NavLink } from 'react-router-dom'
const TravelerSideNavBar = () => {
  return (
    <Wrapper>
      <ul className="sidebar">
        <li>
          <NavLink to=".">Planner</NavLink>
        </li>
        <li>
          <NavLink to="planOnYourBudget">Plan on your budget</NavLink>
        </li>
        <li>
          <NavLink to="services">Services</NavLink>
        </li>
        <li>
          <NavLink to="profile">Profile</NavLink>
        </li>

        {/* temporary */}
        <li>
          <NavLink to="guide">guide</NavLink>
        </li>
        <li>
          <NavLink to="travelpedia">travelpedia</NavLink>
        </li>

        {/* temporary */}
      </ul>
    </Wrapper>
  )
}
export default TravelerSideNavBar
