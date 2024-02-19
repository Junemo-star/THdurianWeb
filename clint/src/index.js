import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './componet/AuthContext';

import App from './App';
import HomeApp from './page/Home';
import UserProfile from './page/User';
import PostGarden from './page/Postgardener';
import Gardener from './page/Usergarden';
import Register from './page/Register';
import Delivery from './page/Delivery';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeApp />
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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ backgroundColor: "#D4EFCF" }}>    {/* เพื่อทำให้ทุกหน้าใน router มีสีตามนี้ */}
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
