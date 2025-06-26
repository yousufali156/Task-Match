import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import AddTask from './components/Pages/AddTask.jsx';
import BrowseTasks from './components/Pages/BrowseTasks.jsx';
import Error404 from './components/Error404.jsx';
import Login from './components/Login/Login.jsx';
import ContextProvider from './Provider/ContextProvider.jsx';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import TaskDetails from './components/Pages/TaskDetails.jsx';
import MyPostedTasks from './components/Pages/MyPostedTask.jsx';
import Register from './components/Register/Register.jsx';
import About from './components/Pages/About.jsx';
import Update from './components/Update.jsx';
import BidsDetails from './components/BidsDetails.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import FeaturedTask from './components/FeaturedTask.jsx';
import FeaturedTaskDetails from './components/Pages/FeaturedTaskDetails.jsx';
import MyProfile from './components/Pages/MyProfile.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error404></Error404>,
    children: [
      {
        index: true,
        hydrateFallbackElement: <p className='text-center mt-4 text-red-500'>loading...</p>,
        loader: () => fetch('https://assignment-10-grapes-server.vercel.app/tasks'),
        Component: Home
      },
      {
        path: 'add-task',
        element: <PrivateRoute>
          <AddTask></AddTask>
        </PrivateRoute>,

      },
      {
        path: 'browse-tasks',
        Component: BrowseTasks
      },
      {
        path: 'featured-tasks',
        element: <FeaturedTask></FeaturedTask>,
      },
      {
        path: '/featured-tasks-details/:id',
        element: <PrivateRoute>
          <FeaturedTaskDetails></FeaturedTaskDetails>
        </PrivateRoute>,
      },
      {
        path: 'task-details/:id',
        Component: TaskDetails
      },
      // task-details/2
      {
        path: 'my-posted-tasks',
        element: <PrivateRoute>
          <MyPostedTasks></MyPostedTasks>
        </PrivateRoute>,
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'reset-password',
        Component: ResetPassword
      },
      {
        path: 'my-profile',
        Component: MyProfile
      },
      {
        path: 'about',
        element: <PrivateRoute>
          <About></About>
        </PrivateRoute>,
      },
      {
        path: 'dashboard',
        element: <PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>,
      },
      {
        path: '/tasks/:id',
        hydrateFallbackElement: <p className='text-center mt-4 text-red-500'>loading...</p>,
        loader: ({ params }) => fetch(`https://assignment-10-grapes-server.vercel.app/tasks/${params.id}`),
        element: <PrivateRoute>
          <BidsDetails></BidsDetails>
        </PrivateRoute>,
      },
      {
        path: 'update-task/:id',
        hydrateFallbackElement: <p className='text-center mt-4 text-red-500'>loading...</p>,
        loader: ({ params }) => fetch(`https://assignment-10-grapes-server.vercel.app/tasks/${params.id}`),
        Component: Update
      },

    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    <ToastContainer></ToastContainer>
  </StrictMode>,
)
