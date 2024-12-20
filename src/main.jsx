import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home'; // Main Parent Component
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Saved from './pages/Saved';
import CryptoDetails from './components/CryptoDetails';

// Define the router with parent and child routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Parent component
    children: [
      {
        path: '/', // Default child route
        element: <Crypto />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails/> // Ensure CryptoDetails is displayed for coinId
          }
        ]
      },
      {
        path: '/trending',
        element: <Trending />,
        children: [
          {
            path: ":coinId", // Correct path for displaying coin details
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: '/saved',
        element: <Saved />,
        children: [
          {
            path: ":coinId", // Correct path for displaying coin details
            element: <CryptoDetails />
          }
        ]
      },
    ],
  },
]);

// Render the RouterProvider with the router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
