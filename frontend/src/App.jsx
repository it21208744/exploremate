import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  ErrorPage,
  HomeLayout,
  HotelOwnerDashBoardLayout,
  LandingPage,
  Login,
  Register,
  TaxiOwnerDashBoard,
  TravelerDashBoardLayout,
} from './pages'
import Planner from './pages/travelers/Planner'
import PlanOnYourBudget from './pages/travelers/PlanOnYourBudget'
import Services from './pages/travelers/Services'
import Profile from './pages/travelers/Profile'
import Guide from './pages/travelers/Guide'
import Travelpedia from './pages/travelers/Travelpedia'
import SalesHeader from './pages/Accomadation/SalesHeader'
import AddHotel from './pages/Accomadation/AddHotel'
import AllHotels from './pages/Accomadation/AllHotels'
import UpdateHotels from './pages/Accomadation/UpdateHotels'

import { action as AddhotelAction } from './pages/Accomadation/AddHotel'
//import { action as AllHotelsAction } from './pages/Accomadation/AllHotels'
//import { action as AllhotelAction } from './pages/Accomadation/AllHotels'



import { action as RegisterAction } from './pages/Register'
import { action as addPlan } from './components/PlannerFormElements'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'landing', element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register />, action: RegisterAction },
      {
        path: 'travelerDashBoard',
        element: <TravelerDashBoardLayout />,
        children: [
          {
            index: true,
            element: <Planner />,
            action: addPlan,
          },
          { path: 'planOnYourBudget', element: <PlanOnYourBudget /> },
          { path: 'services', element: <Services /> },
          { path: 'profile', element: <Profile />,  },

          //temporary
          { path: 'guide', element: <Guide /> },
          { path: 'travelpedia', element: <Travelpedia /> },
          //temporary
        ],
      },
      {
        path: 'HotelOwnerDashBoardLayout',
        element: <HotelOwnerDashBoardLayout />,
        children: [
          { index: true, element: <SalesHeader/> },
          { path: 'addhotel', element: <AddHotel/>, action: AddhotelAction },
          { path: 'allhotels', element: <AllHotels/>  },
          { path: 'uphotels', element: <UpdateHotels/>  },
        
        ],
      },
      {
        path: 'TaxiOwnerDashBoard',
        element: <TaxiOwnerDashBoard />,
        children: [
          { index: true, element: <h1>TaxiOwnerOpt1</h1> },
          { path: 'opt1', element: <h1>TaxiOwnerOpt1</h1> },
          { path: 'opt2', element: <h1>TaxiOwnerOpt2</h1> },
          { path: 'opt3', element: <h1>TaxiOwnerOpt3</h1> },
          { path: 'opt4', element: <h1>TaxiOwnerOpt4</h1> },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App

//hehee
