import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import RegisterUser from './componets/RegisterUser.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <App/>
    ),
  },
  {
    path: "register",
    element: <RegisterUser/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
