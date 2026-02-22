'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Transmission } from '@/types/transmission'
import { loadTransmissions, deleteTransmission, clearAllTransmissions } from '@/lib/transmission-storage'

export default function TransmissionsPage() {
  const [transmissions, setTransmissions] = useState<Transmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false)

  useEffect(() => {
    const loaded = loadTransmissions()
    setTransmissions(loaded)
    setIsLoading(false)
  }, [])

  const handleDeleteTransmission = (id: string) => {
    try {
      deleteTransmission(id)
      setTransmissions((prev) => prev.filter((t) => t.id !== id))
      setShowDeleteConfirm(null)
    } catch {
      console.error('Failed to delete transmission')
    }
  }

  const handleClearAll = () => {
    try {
      clearAllTransmissions()
      setTransmissions([])
      setShowClearAllConfirm(false)
    } catch {
      console.error('Failed to clear transmissions')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-mono">Loading transmissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background elements matching the cosmic theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 -right-1/2 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-96 h-96 bg-pink-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-black font-serif text-purple-300 hover:text-purple-200 transition-colors"
            >
              NR
            </Link>
            <h1 className="text-2xl md:text-3xl font-black font-serif text-center flex-1">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TRANSMISSION ARCHIVE
              </span>
            </h1>
            <div className="w-16" />
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 md:py-20">
          {/* Clear All Button */}
          {transmissions.length > 0 && (
            <div className="mb-12 flex justify-end">
              <button
                onClick={() => setShowClearAllConfirm(true)}
                className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl hover:bg-red-500/30 hover:border-red-400 transition-all duration-300 font-mono text-sm font-bold uppercase tracking-wider"
              >
                🗑️ Clear All Transmissions
              </button>
            </div>
          )}

          {/* Transmissions Grid */}
          {transmissions.length === 0 ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center space-y-6">
                <div className="text-6xl opacity-50">📡</div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-400">
                  No transmissions received yet
                </h2>
                <p className="text-gray-500 text-lg max-w-md mx-auto">
                  Return to the contact section and launch a transmission to see it here.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Send a Transmission
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {transmissions.map((transmission) => (
                <div
                  key={transmission.id}
                  className="glass rounded-2xl border border-purple-500/30 hover:border-purple-400/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 group relative"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-pink-500/5 pointer-events-none transition-all duration-300" />

                  <div className="relative p-6 md:p-8 space-y-4">
                    {/* Date in top-right corner */}
                    <div className="absolute top-4 right-4 text-xs font-mono text-gray-500 bg-black/50 px-3 py-1 rounded-lg">
                      {transmission.date}
                    </div>

                    {/* Sender Name - Highlighted */}
                    <div className="pt-2">
                      <h3 className="text-xl md:text-2xl font-bold font-serif bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {transmission.name}
                      </h3>
                    </div>

                    {/* Email */}
                    <div className="text-sm md:text-base">
                      <p className="text-gray-400 font-mono">
                        <span className="text-purple-300">📧 </span>
                        {transmission.email}
                      </p>
                    </div>

                    {/* Subject - only if exists */}
                    {transmission.subject && (
                      <div className="border-t border-purple-500/20 pt-4">
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-mono mb-2">
                          Protocol
                        </p>
                        <p className="text-purple-300 font-medium">
                          {transmission.subject}
                        </p>
                      </div>
                    )}

                    {/* Message */}
                    <div className={`${transmission.subject ? '' : 'border-t border-purple-500/20 pt-4'}`}>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-mono mb-2">
                        Content
                      </p>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base break-words">
                        {transmission.message}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <div className="border-t border-purple-500/20 pt-4 mt-6">
                      {showDeleteConfirm === transmission.id ? (
                        <div className="space-y-3">
                          <p className="text-sm text-yellow-300 font-mono">
                            Delete this transmission?
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteTransmission(transmission.id)}
                              className="flex-1 px-4 py-2 bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/40 transition-all duration-300 font-mono text-sm font-bold"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="flex-1 px-4 py-2 bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/40 transition-all duration-300 font-mono text-sm font-bold"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(transmission.id)}
                          className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 hover:border-red-400 transition-all duration-300 font-mono text-sm font-bold uppercase tracking-wider"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back button */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 border border-purple-500/50 text-purple-300 rounded-xl hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 font-mono font-bold uppercase tracking-wider"
            >
              ← Return to Portfolio
            </Link>
          </div>
        </main>
      </div>

      {/* Clear All Confirmation Dialog */}
      {showClearAllConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl border border-red-500/30 p-8 max-w-sm w-full space-y-6 animate-in fade-in scale-in">
            <h2 className="text-2xl font-bold font-serif text-white">
              Clear All Transmissions?
            </h2>
            <p className="text-gray-400 text-lg">
              This action cannot be undone. All {transmissions.length} transmission{transmissions.length !== 1 ? 's' : ''} will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleClearAll}
                className="flex-1 px-6 py-3 bg-red-500/30 border border-red-500/50 text-red-300 rounded-xl hover:bg-red-500/40 transition-all duration-300 font-mono font-bold uppercase tracking-wider"
              >
                Delete All
              </button>
              <button
                onClick={() => setShowClearAllConfirm(false)}
                className="flex-1 px-6 py-3 bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-xl hover:bg-blue-500/40 transition-all duration-300 font-mono font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
