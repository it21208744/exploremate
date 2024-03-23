import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/travelersWrappers/Planner'
import PlannerFormElements from '../../components/PlannerFormElements'

const Planner = () => {
  return (
    <Wrapper>
      <div className="plannerContainer">
        <PlannerFormElements />
        <Outlet />
      </div>
    </Wrapper>
  )
}
export default Planner
