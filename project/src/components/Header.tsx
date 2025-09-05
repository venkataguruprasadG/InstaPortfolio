'use client'

import { useState } from 'react'
import { User, LogIn, LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">InstaPortfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Templates
            </Link>
            <Link href="/examples" className="text-gray-600 hover:text-gray-900 transition-colors">
              Examples
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoggedIn(true)}
                className="flex items-center space-x-2 btn-primary"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Templates
              </Link>
              <Link href="/examples" className="text-gray-600 hover:text-gray-900 transition-colors">
                Examples
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="btn-primary text-left"
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}