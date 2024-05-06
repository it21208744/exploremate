import { Outlet } from 'react-router-dom'
import TravelerSideNavBar from '../../components/navBars/travelersComp/TravelerSideNavBar'
import NewNav from '../../components/Menu'

const TravelerDashBoardLayout = () => {
  return (
    <div>
      {/* <TravelerSideNavBar /> */}
      <NewNav />
      <Outlet />
    </div>
  )
}
export default TravelerDashBoardLayout
