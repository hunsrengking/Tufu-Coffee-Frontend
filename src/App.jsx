import React from 'react'
import { BrowserRouter, ScrollRestoration } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AppRoute from './routes/AppRoute'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

/**
 * Main App Component
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <AppRoute />
            </motion.div>
          </AnimatePresence>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
