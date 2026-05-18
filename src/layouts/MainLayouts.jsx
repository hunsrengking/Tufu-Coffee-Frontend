import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { motion } from 'framer-motion'

const MainLayouts = () => {
  const location = useLocation()

  // Default: open on desktop (≥1024px), closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 1024)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        // On desktop, always open sidebar
        setIsSidebarOpen(true)
      } else {
        // On mobile, close sidebar when switching to mobile
        setIsSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [location.pathname])

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  return (
    <div className="min-h-screen bg-neutral-50 font-sans leading-relaxed text-neutral-800">
      {/* Mobile backdrop overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Persistent Sidebar */}
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <main
        className={`min-h-screen pt-20 transition-all duration-300 ${
          isSidebarOpen && !isMobile ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        {/* Dynamic Header */}
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />

        {/* Page Content with Framer Motion transitions */}
        <section className="px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mx-auto w-full max-w-screen-2xl"
          >
            <Outlet />
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default MainLayouts
