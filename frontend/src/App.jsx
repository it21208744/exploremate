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
import HeaderTaxi from './pages/HeaderTaxi'
import { action as addPlantingAction } from './pages/AddPlanting'

import Feedback from './components/FeedbackForm'
import FeedbackTable from './components/FeedbackTable'
import SalesHeader from './pages/Accomadation/SalesHeader'
import AddHotel from './pages/Accomadation/AddHotel'
import AllHotels from './pages/Accomadation/AllHotels'
import UpdateHotels from './pages/Accomadation/UpdateHotels'

import GetMyBookings from './pages/travelers/GetMyBookings'
import BudgetForm from './components/BudgetForm'
import Budgetdisplay from './components/Budgetdisplay'

import { action as AddhotelAction } from './pages/Accomadation/AddHotel'

import { action as BudgetFormAction } from './components/BudgetForm'
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
      { path: 'register', element: <Register />, action: RegisterAction },
      { path: 'login', element: <Login /> },
      {
        path: 'travelerDashBoard',
        element: <TravelerDashBoardLayout />,
        children: [
          {
            index: true,
            element: <Planner />,
            action: addPlan,
          },
          {
            path: 'planOnYourBudget',
            element: <BudgetForm />,
            action: BudgetFormAction,
          },
          { path: 'budgetdisplay', element: <Budgetdisplay /> },
          { path: 'services', element: <Services /> },
          { path: 'profile', element: <Profile /> },
          { path: 'bookings', element: <GetMyBookings /> },

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
          { index: true, element: <SalesHeader /> },
          { path: 'addhotel', element: <AddHotel />, action: AddhotelAction },
          { path: 'allhotels', element: <AllHotels /> },
          { path: 'uphotels', element: <UpdateHotels /> },
        ],
      },
      {
        path: 'TaxiOwnerDashBoard',
        element: <TaxiOwnerDashBoard />,
        children: [
          { index: true, element: <HeaderTaxi /> },
          {
            path: 'addPlanting',
            element: <AddPlanting />,
            action: addPlantingAction,
          },
          { path: 'allPlanting', element: <AllPlanting /> },
          { path: 'plantUpdate', element: <PlantUpdate /> },
          { path: 'opt4', element: <h1>TaxiOwnerOpt4</h1> },
        ],
      },
      { path: 'feedback', element: <Feedback /> },
      { path: 'feedbackTabel', element: <FeedbackTable /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App
