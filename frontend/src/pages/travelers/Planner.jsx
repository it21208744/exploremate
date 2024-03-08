import { Outlet } from 'react-router-dom'
import HorizontalBar from '../../components/navBars/travelersComp/HorizontalBar'
import Wrapper from '../../assets/wrappers/travelersWrappers/Planner'

const Planner = () => {
  return (
    <Wrapper>
      <div className="plannerContainer">
        <h1>Planner</h1>
        <HorizontalBar />
        <Outlet />
      </div>
    </Wrapper>
  )
}
export default Planner
