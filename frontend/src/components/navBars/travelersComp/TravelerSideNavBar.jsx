import Wrapper from '../../../assets/wrappers/travelersWrappers/TravelerSideNavBar'
import { NavLink } from 'react-router-dom'
import { CiMenuBurger } from 'react-icons/ci'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { AiTwotoneSchedule } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { MdLocalHotel } from 'react-icons/md'
import { FcPlanner } from 'react-icons/fc'
import { useState } from 'react'

const TravelerSideNavBar = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'ShowSidebarContainer' : 'HideSidebarContainer'
        }
      >
        <ul className="sidebar">
          {/* <li className="menuBtn">
            <button
              type="button"
              className="closeMenuBtn"
              onClick={toggleSidebar}
            >
              <CiMenuBurger />
            </button>
          </li> */}
          <li className="navLink">
            <NavLink to="." className="navLink">
              <span className="icon">
                <FcPlanner />
              </span>
              <span className="text">Planner</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="planOnYourBudget">
              <span className="icon">
                <RiMoneyDollarCircleFill />
              </span>
              <span className="text">Plan on your budget</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="services">
              <span className="icon">
                <MdLocalHotel />
              </span>
              <span className="text">Services</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="profile">
              <span className="icon">
                <FaUserAlt />
              </span>
              <span className="text">Profile</span>
            </NavLink>
          </li>

          <li className="navLink">
            <NavLink to="guide">
              <span className="icon">
                <AiTwotoneSchedule />
              </span>
              <span className="text">Plans</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}
export default TravelerSideNavBar
