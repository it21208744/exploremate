import Wrapper from '../../../assets/wrappers/travelersWrappers/TravelerSideNavBar'
import { NavLink } from 'react-router-dom'
import { CiMenuBurger } from 'react-icons/ci'
import { useState } from 'react'

const TravelerSideNavBar = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
    console.log(showSidebar)
  }

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'ShowSidebarContainer' : 'HideSidebarContainer'
        }
      >
        <ul className="sidebar">
          <li className="menuBtn">
            <button
              type="button"
              className="closeMenuBtn"
              onClick={toggleSidebar}
            >
              <CiMenuBurger />
            </button>
          </li>
          <li className="navLink">
            <NavLink to=".">Planner</NavLink>
          </li>
          <li className="navLink">
            <NavLink to="planOnYourBudget">Plan on your budget</NavLink>
          </li>
          <li className="navLink">
            <NavLink to="services">Services</NavLink>
          </li>
          <li className="navLink">
            <NavLink to="profile">Profile</NavLink>
          </li>

          {/* temporary */}
          <li className="navLink">
            <NavLink to="guide">guide</NavLink>
          </li>
          <li className="navLink">
            <NavLink to="travelpedia">travelpedia</NavLink>
          </li>

          {/* temporary */}
        </ul>
      </div>
    </Wrapper>
  )
}
export default TravelerSideNavBar
