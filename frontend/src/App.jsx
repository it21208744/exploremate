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

import AddPlanting from './pages/AddPlanting'
import AllPlanting from './pages/AllPlanting'
import PlantUpdate from './pages/PlantUpdate'

import { action as addPlantingAction } from './pages/AddPlanting'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'landing', element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'travelerDashBoard',
        element: <TravelerDashBoardLayout />,
        children: [
          {
            index: true,
            element: <Planner />,
          },
          { path: 'planOnYourBudget', element: <PlanOnYourBudget /> },
          { path: 'services', element: <Services /> },
          { path: 'profile', element: <Profile /> },

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
          { index: true, element: <h1>HotelOwnerOpt1</h1> },
          { path: 'opt1', element: <h1>HotelOwnerOpt1</h1> },
          { path: 'opt2', element: <h1>HotelOwnerOpt2</h1> },
          { path: 'opt3', element: <h1>HotelOwnerOpt3</h1> },
          { path: 'opt4', element: <h1>HotelOwnerOpt4</h1> },
        ],
      },
      {
        path: 'TaxiOwnerDashBoard',
        element: <TaxiOwnerDashBoard />,
        children: [
          { index: true, element: <h1>TaxiOwnerOpt1</h1> },
          { path: 'addPlanting', element: <AddPlanting/>, action: addPlantingAction },
          { path: 'allPlanting', element: <AllPlanting/> },
          { path: 'plantUpdate', element: <PlantUpdate/> },
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
