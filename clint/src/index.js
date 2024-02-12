import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App';
import HomeApp from './page/Home';
import UserProfile from './page/User';

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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{ backgroundColor: "#D4EFCF" }}>    {/* เพื่อทำให้ทุกหน้าใน router มีสีตามนี้ */}
    <RouterProvider router={router} />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
