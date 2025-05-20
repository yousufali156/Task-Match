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

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
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
      
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
