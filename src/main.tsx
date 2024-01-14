import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterUser from './componets/RegisterUser.tsx';
import LoginUser from './componets/LoginUser.tsx';
import { Provider } from 'react-redux';
import store from './stores/store.ts';
import Room from './componets/Room.tsx';
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
  {
    path: "room",
    element: <Room/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>

     <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
