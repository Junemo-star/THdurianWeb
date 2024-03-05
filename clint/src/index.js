import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './componet/AuthContext';
import useWindowWidth from './componet/Check_size'
// import { Route } from 'react-router-dom';

import App from './App';
import HomeApp from './page/Home';
import AdminPage from './page/Admin'
import UserProfile from './page/User/User';
import PostGarden from './page/PostGarden/Postgardener';
import Gardener from './page/User/Usergarden';
import Register from './page/Register/Register';
import StatusPage from './page/Status/Status';
import Detail from './page/Detailitem';
import UsergardenPc from './page/User/UsergardenPc';
import PostgardenPC from './page/PostGarden/PostgardenrPC';
import RegisterPc from './page/Register/RegisterPc';
import UserPc from './page/User/UserPc';

import Delivery from './page/Delivery/Delivery';
import DeliveryPc from './page/Delivery/DeliveryPC';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeApp />
  },
  {
    path: "/AdminPage",
    element: <AdminPage />
  },
  {
    path: "/Login",
    element: <App />
  },
  {
    path: "/User",
    element: <UserProfile />
  },
  {
    path: "/Users",
    element: <UserPc />
  },
  {
    path: "/Post",
    element: <PostGarden />
  },
  {
    path: "/Gardener",
    element: <Gardener /> 
  },
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "/Delivery",
    element: <Delivery />
  },
  {
    path: "/Deliverys",
    element: <DeliveryPc />
  },
  {
    path: "/Status",
    element: <StatusPage/>
  },
  {
    path: "/Detail/:durian/:id",
    element: <Detail />
  },
  {
    path: "/Gardeners",
    element: <UsergardenPc />
  },
  {
    path: "/Posts",
    element: <PostgardenPC />
  },
  {
    path: "/Registers",
    element: <RegisterPc />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
