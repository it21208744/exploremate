import { Outlet } from 'react-router-dom'
import HorizontalBar from '../../components/navBars/travelersComp/HorizontalBar'

const Planner = () => {
  return (
    <div>
      <HorizontalBar />
      <Outlet />
    </div>
  )
}
export default Planner
