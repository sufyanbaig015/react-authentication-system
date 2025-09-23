import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Layout() {
  const [open, setOpen] = useState(false)
  const isLoggedIn = localStorage.getItem('token')
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">BidCars</Link>
          <button aria-label="Toggle Menu" onClick={() => setOpen(v => !v)} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 4.5a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" />
            </svg>
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {isLoggedIn && (
              <NavLink to="/" end className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>Home</NavLink>
            )}
            {isLoggedIn && (
              <NavLink to="/auctions" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>Auctions</NavLink>
            )}
            {isLoggedIn && (
              <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>About</NavLink>
            )}
            {isLoggedIn && (
              <button onClick={() => { setOpen(false); handleLogout(); }} className="text-gray-700 hover:text-blue-600">Logout</button>
            )}
            {!isLoggedIn && (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>Login</NavLink>
            )}
          </nav>
        </div>


        {open && (
          <div className="md:hidden border-t bg-white">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
              {isLoggedIn && (
                <NavLink onClick={() => setOpen(false)} to="/" end className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Home</NavLink>
              )}
              {isLoggedIn && (
                <NavLink onClick={() => setOpen(false)} to="/auctions" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Auctions</NavLink>
              )}
              {isLoggedIn && (
                <NavLink onClick={() => setOpen(false)} to="/about" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>About</NavLink>
              )}
              {isLoggedIn && (
                <button onClick={() => { setOpen(false); handleLogout(); }} className="text-left text-gray-700">Logout</button>
              )}
              {!isLoggedIn && (
                <NavLink onClick={() => setOpen(false)} to="/login" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}>Login</NavLink>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} BidCars. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout


