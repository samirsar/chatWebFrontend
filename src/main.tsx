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
import LoginUser from './componets/LoginUser.tsx';
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
  {
    path: "login",
    element: <LoginUser/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
