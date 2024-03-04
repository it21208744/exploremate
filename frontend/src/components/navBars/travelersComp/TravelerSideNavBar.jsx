import Wrapper from '../../../assets/wrappers/travelersWrappers/TravelerSideNavBar'
import { NavLink } from 'react-router-dom'
const TravelerSideNavBar = () => {
  return (
    <Wrapper>
      <ul className="sidebar">
        <li>
          <NavLink to=".">opt1</NavLink>
        </li>
        <li>
          <NavLink to="opt2">opt2</NavLink>
        </li>
        <li>
          <NavLink to="opt3">opt3</NavLink>
        </li>
        <li>
          <NavLink to="opt4">opt4</NavLink>
        </li>
      </ul>
    </Wrapper>
  )
}
export default TravelerSideNavBar
