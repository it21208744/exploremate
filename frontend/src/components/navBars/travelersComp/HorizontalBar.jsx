import Wrapper from '../../../assets/wrappers/travelersWrappers/HorizaontalNavBar'
import { NavLink } from 'react-router-dom'
const HorizontalBar = () => {
  return (
    <Wrapper>
      <ul className="navBar">
        <li>
          <NavLink to="guide">Guide</NavLink>
        </li>
        <li>
          <NavLink to="travelpedia">Travelpedia</NavLink>
        </li>
      </ul>
    </Wrapper>
  )
}
export default HorizontalBar
