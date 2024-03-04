import Wrapper from '../../../assets/wrappers/travelersWrappers/HorizaontalNavBar'
import { NavLink } from 'react-router-dom'
const HorizontalBar = () => {
  return (
    <Wrapper>
      <ul className="navBar">
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
export default HorizontalBar
