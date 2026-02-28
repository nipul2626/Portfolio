'use client'

import Link from 'next/link'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-purple-500/20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-black font-serif text-purple-300 mb-4">
              NR
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Space Explorer & Full Stack Developer crafting immersive digital experiences through innovative technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Social</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://x.com/nipul9678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  X
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/nipul-rathod-7294053a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/nipul2626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Updates</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest projects and insights.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-white/5 border border-purple-500/30 text-white text-sm placeholder-gray-500 rounded-l-lg focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 text-white text-sm font-bold rounded-r-lg hover:bg-purple-600 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/10 pt-8">
          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs md:text-sm">
              © {currentYear} Nipul Pramod Rathod. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors text-xs md:text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors text-xs md:text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/40 transition-all duration-300 flex items-center justify-center z-40"
        aria-label="Scroll to top"
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
          <path d="M19 14l-7-7m0 0l-7 7m7-7v12"></path>
        </svg>
      </button>
    </footer>
  )
}
