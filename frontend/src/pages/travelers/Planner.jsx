import { Outlet } from 'react-router-dom'
import HorizontalBar from '../../components/navBars/travelersComp/HorizontalBar'
import Wrapper from '../../assets/wrappers/travelersWrappers/Planner'
import PlannerFormElements from '../../components/PlannerFormElements'

const Planner = () => {
  return (
    <Wrapper>
      <div className="plannerContainer">
        <HorizontalBar />
        <PlannerFormElements />

        <Outlet />
      </div>
    </Wrapper>
  )
}
export default Planner
