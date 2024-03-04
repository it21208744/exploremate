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
import Opt1 from './pages/travelers/Opt1'

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
          { index: true, element: <Opt1 /> },
          { path: 'opt2', element: <h1>TravelerOpt2</h1> },
          { path: 'opt3', element: <h1>TravelerOpt3</h1> },
          { path: 'opt4', element: <h1>TravelerOpt4</h1> },
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
