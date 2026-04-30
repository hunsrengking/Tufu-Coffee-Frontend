import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { motion } from 'framer-motion'

const MainLayouts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-neutral-50 font-sans leading-relaxed text-neutral-800">
      {/* Persistent Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <main className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} min-h-screen pt-20 transition-all duration-300`}>
        {/* Dynamic Header */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

        {/* Page Content with Framer Motion transitions */}
        <section className="px-6 lg:px-8 py-8">
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
