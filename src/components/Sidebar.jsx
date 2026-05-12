import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Sidebar = ({ isOpen = true }) => {
  const { hasPermission } = useAuth()
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = React.useState({})

  const toggleDropdown = (title, e) => {
    e.preventDefault()
    setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }))
  }

  const menuItems = [
    { title: 'Dashboard', icon: 'fa-solid fa-gauge', path: '/dashboard', permission: 'VIEW_DASHBOARD' },
    { title: 'User', icon: 'fa-solid fa-users', path: '/users', permission: 'READ_USER' },
    { title: 'Order', icon: 'fa-solid fa-cart-shopping', path: '/orders', permission: 'READ_ORDER' },
    { title: 'Product', icon: 'fa-solid fa-box', path: '/products', permission: 'READ_PRODUCT' },
    { title: 'CMS', icon: 'fa-brands fa-modx', path: '/cms' },
    {
      title: 'Settings',
      icon: 'fa-solid fa-gear',
      path: '/settings',
      // permission: 'READ_SETTING',
      hasDropdown: true,
      subItems: [
        { title: 'Organization', path: '/settings/organization' },
        { title: 'System', path: '/settings/system' },
        { title: 'Notifications', path: '/settings/notifications' }
      ]
    },
  ]

  const filteredMenuItems = menuItems.filter(item => !item.permission || hasPermission(item.permission))

  const isActive = (path) => location.pathname === path

  const renderNavItems = (items) => (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item.title}>
          {item.hasDropdown ? (
            <button
              onClick={(e) => toggleDropdown(item.title, e)}
              className={`w-full group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(item.path) || expandedMenus[item.title]
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <i className={`${item.icon} text-lg w-5 text-center`}></i>
              <span className="flex-1 text-left">{item.title}</span>
              {item.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-500 bg-emerald-50 rounded-md">
                  NEW
                </span>
              )}
              <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${expandedMenus[item.title] ? 'rotate-180 text-brand-600' : 'text-slate-400'}`}></i>
            </button>
          ) : (
            <Link
              to={item.path}
              className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(item.path) || (item.title === 'Dashboard' && location.pathname === '/')
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <i className={`${item.icon} text-lg w-5 text-center`}></i>
              <span className="flex-1">{item.title}</span>
              {item.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-500 bg-emerald-50 rounded-md">
                  NEW
                </span>
              )}
            </Link>
          )}

          {/* Sub Items Render */}
          {item.hasDropdown && (
            <div className={`flex flex-col gap-1 pl-11 pr-3 overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus[item.title] ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
              {item.subItems?.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(subItem.path)
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white text-slate-500 border-r border-slate-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Branding */}
      <div className="flex h-20 items-center px-8 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
            <i className="fa-solid fa-chart-pie text-sm text-white"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Tufu
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        <div className="mb-6">
          <p className="mb-4 px-4 text-[11px] font-semibold text-slate-400">
            MENU
          </p>
          {renderNavItems(filteredMenuItems)}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar