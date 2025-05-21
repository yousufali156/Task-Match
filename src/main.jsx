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
import BrowseTask from './components/Pages/BrowseTask.jsx';
import MyPostTask from './components/Pages/MyPostTask.jsx';
import Error404 from './components/Error404.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/SignUP/Signup.jsx';

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
        path:'addTask',
        Component:AddTask
      },
      {
        path:'browseTask',
        Component:BrowseTask
      },
      {
        path:'myPostTask',
        Component:MyPostTask
      },
      {
        path:'login',
        Component:Login
      },
      {
        path:'signup',
        Component:Signup
      },
      
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
