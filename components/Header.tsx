'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-purple-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-black font-serif text-purple-300 hover:text-purple-200 transition-colors"
        >
          NR
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#about" className="text-gray-300 hover:text-purple-300 transition-colors text-sm font-medium">
            About
          </Link>
          <Link href="#projects" className="text-gray-300 hover:text-purple-300 transition-colors text-sm font-medium">
            Projects
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-purple-300 transition-colors text-sm font-medium">
            Contact
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-purple-400 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all duration-300"
          >
            GitHub
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-purple-300 hover:text-purple-200 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-purple-500/20 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-purple-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-purple-300 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-purple-300 transition-colors"
            >
              Contact
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-purple-400 text-purple-300 rounded-lg text-center"
            >
              GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
