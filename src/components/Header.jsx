import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Header = ({ toggleSidebar, isSidebarOpen, isMobile }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [hasNotification, setHasNotification] = React.useState(true)
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // On mobile, header is always full-width (sidebar is overlaid)
  // On desktop, header shifts right when sidebar is open
  const leftClass = isMobile
    ? 'left-0'
    : isSidebarOpen
      ? 'left-64'
      : 'left-0'

  return (
    <header
      className={`fixed top-0 right-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between shadow-sm transition-all duration-300 ${leftClass}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={toggleSidebar}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <i className="fa-solid fa-bars text-base sm:text-lg"></i>
        </button>
        {/* Search Input — hidden on mobile, visible on lg+ */}
        <div className="relative hidden lg:flex max-w-md flex-1 items-center border border-slate-200 rounded-lg">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 text-sm text-slate-400"></i>
          <input
            type="text"
            placeholder="Search or type command..."
            className="w-full h-10 pl-10 pr-12 rounded-md bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 outline-none"
          />
          <div className="absolute right-3 flex h-5 items-center justify-center rounded border border-slate-200 bg-slate-50 px-1.5 text-[10px] font-medium text-slate-400">
            ⌘K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Search icon on mobile */}
        <button className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800">
          <i className="fa-solid fa-magnifying-glass text-sm"></i>
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800">
          <i className="fa-solid fa-bell text-sm"></i>
          {hasNotification && (
            <span className="absolute top-0 right-0.5 h-2 w-2 rounded-full bg-orange-500 border border-white"></span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex cursor-pointer items-center gap-2 sm:gap-2.5 ml-1 sm:ml-2 hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full bg-slate-200 flex-shrink-0">
              <img src="https://i.pravatar.cc/150?u=musharof" alt="User" className="h-full w-full object-cover" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-medium text-slate-700">{user?.username || 'Admin'}</span>
            </div>
            <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}></i>
          </div>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <>
              {/* Click-outside overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/users/1"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <i className="fa-regular fa-user w-4 text-center"></i>
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <i className="fa-solid fa-gear w-4 text-center"></i>
                  Settings
                </Link>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <i className="fa-solid fa-right-from-bracket w-4 text-center"></i>
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header