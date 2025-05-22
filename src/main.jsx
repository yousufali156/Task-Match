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
import Users from './components/Pages/Users.jsx';
import Update from './components/Update.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error404></Error404>,
    children: [
      {
        index: true,
        hydrateFallbackElement: <p className='text-center mt-4 text-red-500'>loading...</p>,
        loader: () => fetch('http://localhost:3000/tasks'),
        Component: Home
      },
      {
        path: 'add-task',
        Component: AddTask
      },
      {
        path: 'browse-tasks',
        Component: BrowseTasks
      },
      {
        path: 'task-details/:id',
        Component: TaskDetails
      },
      {
        path: 'my-posted-tasks',
        Component: MyPostedTasks
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
        path: 'about',
        Component: About
      },
      {
        path: 'users',
        hydrateFallbackElement: <p className='text-center mt-4 text-red-500'>loading...</p>,
        loader: () => fetch('http://localhost:3000/users'),
        Component: Users
      },
      {
        path: 'update-task/:id',
        hydrateFallbackElement: <p className='text-center mt-4 text-red-500'>loading...</p>,
        loader: ({ params }) => fetch(`http://localhost:3000/tasks/${params.id}`),
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
