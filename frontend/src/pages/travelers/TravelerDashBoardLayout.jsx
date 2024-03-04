import { Outlet } from 'react-router-dom'
import TravelerSideNavBar from '../../components/navBars/travelersComp/TravelerSideNavBar'

const TravelerDashBoardLayout = () => {
  return (
    <div>
      <TravelerSideNavBar />
      <Outlet />
    </div>
  )
}
export default TravelerDashBoardLayout
