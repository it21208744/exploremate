import { Outlet } from 'react-router-dom'
import HorizontalBar from '../../components/navBars/travelersComp/HorizontalBar'
import Wrapper from '../../assets/wrappers/travelersWrappers/Planner'
import PlannerFormElements from '../../components/PlannerFormElements'
import PlannerOutput from '../../components/PlannerOutput'

const Planner = () => {
  return (
    <Wrapper>
      <div className="plannerContainer">
        <PlannerFormElements />
        <HorizontalBar />
        <PlannerOutput />
        <Outlet />
      </div>
    </Wrapper>
  )
}
export default Planner
