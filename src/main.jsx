import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Auctions from './pages/Auctions.jsx'
import About from './pages/About.jsx'
import Login from './components/Login.jsx'


export function RequireAuth({ children }) {
  const hasToken = !!localStorage.getItem('token')
  return hasToken ? children : <Navigate to="/login" replace />
}

export function GuestOnly({ children }) {
  const hasToken = !!localStorage.getItem('token')
  return hasToken ? <Navigate to="/" replace /> : children
}

const router = createBrowserRouter([
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/auctions', element: <Auctions /> },
      { path: '/about', element: <About /> },
    ],
  },
  {
    path: '/login',
    element: (
      <GuestOnly>
        <Login />
      </GuestOnly>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
