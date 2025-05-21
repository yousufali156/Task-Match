import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import AddTask from './components/Pages/AddTask.jsx';
import BrowseTasks from './components/Pages/BrowseTasks.jsx';
import MyPostedTask from './components/Pages/MyPostedTask.jsx';
import Error404 from './components/Error404.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/SignUP/Signup.jsx';
import ContextProvider from './Provider/ContextProvider.jsx';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import TaskDetails from './components/Pages/TaskDetails.jsx';
import MyPostedTasks from './components/Pages/MyPostedTask.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    errorElement:<Error404></Error404>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'add-task',
        Component:AddTask
      },
      {
        path:'browse-tasks',
        Component:BrowseTasks
      },
      {
        path:'task-details/:id',
        Component:TaskDetails
      },
      {
        path:'my-posted-tasks',
        Component:MyPostedTasks
      },
      {
        path:'login',
        Component:Login
      },
      {
        path:'signup',
        Component:Signup
      },
      {
        path:'reset-password',
        Component:ResetPassword
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
