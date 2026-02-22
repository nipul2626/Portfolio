'use client'

import { useState } from 'react'
import Link from 'next/link'

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [characterCount, setCharacterCount] = useState(0)

  const validateField = (name: string, value: string) => {
    let error = ''

    if (name === 'name') {
      if (!value || value.length < 2) {
        error = 'Please identify yourself, space traveler'
      } else if (/\d/.test(value)) {
        error = 'Name should not contain numbers'
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value || !emailRegex.test(value)) {
        error = 'Invalid frequency detected'
      }
    }

    if (name === 'message') {
      if (!value || value.length < 10) {
        error = 'Transmission too short'
      }
    }

    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === 'message') {
      setCharacterCount(value.length)
    }

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (['name', 'email', 'message'].includes(name)) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
    setFocusedField(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate all fields
    const nameError = validateField('name', formData.name)
    const emailError = validateField('email', formData.email)
    const messageError = validateField('message', formData.message)

    setErrors({
      name: nameError,
      email: emailError,
      message: messageError,
    })

    if (nameError || emailError || messageError) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setCharacterCount(0)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white mb-4 text-balance">
            Space Station Control Panel
          </h2>
          <p className="text-purple-300 text-lg md:text-xl max-w-2xl mx-auto">
            Initiate contact protocol. Your transmission will be received and processed within 24-48 Earth hours.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-24">
          {/* Contact Info Cards */}
          <div className="glass rounded-2xl p-8 border border-blue-500/30 text-center group hover:border-blue-400 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📧</div>
            <h3 className="text-xl font-bold text-blue-300 mb-2 font-serif">TRANSMISSION LINK</h3>
            <p className="text-gray-400 text-sm md:text-base">
              <Link href="mailto:hello@nipul.dev" className="hover:text-blue-400 transition-colors">
                hello@nipul.dev
              </Link>
            </p>
          </div>

          <div className="glass rounded-2xl p-8 border border-purple-500/30 text-center group hover:border-purple-400 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💼</div>
            <h3 className="text-xl font-bold text-purple-300 mb-2 font-serif">PROFESSIONAL NETWORK</h3>
            <p className="text-gray-400 text-sm md:text-base">
              <Link
                href="https://linkedin.com/in/nipulpramod"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                Connect on LinkedIn
              </Link>
            </p>
          </div>

          <div className="glass rounded-2xl p-8 border border-pink-500/30 text-center group hover:border-pink-400 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🐙</div>
            <h3 className="text-xl font-bold text-pink-300 mb-2 font-serif">CODE REPOSITORY</h3>
            <p className="text-gray-400 text-sm md:text-base">
              <Link
                href="https://github.com/nipul2626"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors"
              >
                Explore on GitHub
              </Link>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          {submitStatus === 'success' ? (
            /* Success Card */
            <div className="glass rounded-2xl p-12 border-2 border-green-500 text-center space-y-6 animate-in">
              <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
                <span className="text-5xl relative z-10">✓</span>
              </div>
              <h3 className="text-3xl font-bold font-serif text-white">TRANSMISSION RECEIVED</h3>
              <p className="text-green-300 text-lg">
                Thank you for reaching out! Your message has been successfully transmitted to Mission Control.
              </p>
              <p className="text-gray-400">
                Response expected within 24-48 Earth hours.
              </p>
              
              {/* Confetti particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-ping"
                    style={{
                      backgroundColor: ['#a855f7', '#3b82f6', '#ec4899', '#fbbf24'][i % 4],
                      top: '50%',
                      left: '50%',
                      animationDelay: `${i * 0.1}s`,
                      transform: `translate(${Math.cos(i * 18) * 100}px, ${Math.sin(i * 18) * 100}px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Form */
            <form 
              onSubmit={handleSubmit} 
              className="glass rounded-2xl p-8 md:p-12 border border-purple-500/30 space-y-6 relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(168, 85, 247, 0.03) 0px, transparent 1px, transparent 20px, rgba(168, 85, 247, 0.03) 21px), repeating-linear-gradient(90deg, rgba(168, 85, 247, 0.03) 0px, transparent 1px, transparent 20px, rgba(168, 85, 247, 0.03) 21px)',
              }}
            >
              {/* Form Title */}
              <div className="text-center pb-4 border-b border-purple-500/30">
                <h3 className="text-2xl font-bold font-serif text-purple-300">TRANSMISSION PROTOCOL</h3>
                <p className="text-sm text-gray-400 mt-2 font-mono">[ SECURE CHANNEL ACTIVE ]</p>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-purple-300 mb-2 uppercase tracking-wider font-mono">
                  SENDER IDENTIFICATION
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">👤</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={handleBlur}
                    placeholder="Enter your name"
                    className={`w-full pl-14 pr-4 py-4 bg-white/5 border-2 ${
                      errors.name
                        ? 'border-red-500 animate-shake'
                        : focusedField === 'name'
                        ? 'border-purple-400 shadow-lg shadow-purple-500/50'
                        : 'border-purple-500/30'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2 animate-slideIn">
                    <span>⚠</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-purple-300 mb-2 uppercase tracking-wider font-mono">
                  TRANSMISSION FREQUENCY
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📡</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={handleBlur}
                    placeholder="your.email@galaxy.com"
                    className={`w-full pl-14 pr-4 py-4 bg-white/5 border-2 ${
                      errors.email
                        ? 'border-red-500 animate-shake'
                        : focusedField === 'email'
                        ? 'border-purple-400 shadow-lg shadow-purple-500/50'
                        : 'border-purple-500/30'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2 animate-slideIn">
                    <span>⚠</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-purple-300 mb-2 uppercase tracking-wider font-mono">
                  MESSAGE PROTOCOL
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📻</span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Subject (optional)"
                    className={`w-full pl-14 pr-4 py-4 bg-white/5 border-2 ${
                      focusedField === 'subject'
                        ? 'border-purple-400 shadow-lg shadow-purple-500/50'
                        : 'border-purple-500/30'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300`}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-purple-300 mb-2 uppercase tracking-wider font-mono">
                  TRANSMISSION CONTENT
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-xl">💬</span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={handleBlur}
                    placeholder="Your message to the cosmos..."
                    rows={6}
                    maxLength={500}
                    className={`w-full pl-14 pr-4 py-4 bg-white/5 border-2 ${
                      errors.message
                        ? 'border-red-500 animate-shake'
                        : focusedField === 'message'
                        ? 'border-purple-400 shadow-lg shadow-purple-500/50'
                        : 'border-purple-500/30'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none`}
                  />
                  <div className="absolute bottom-3 right-3 text-xs font-mono text-gray-500">
                    {characterCount}/500
                  </div>
                </div>
                {errors.message && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2 animate-slideIn">
                    <span>⚠</span>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 group ${
                  isSubmitting
                    ? 'opacity-70 cursor-wait'
                    : 'hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                }`}
                style={{
                  animation: isSubmitting ? 'none' : 'glowPulse 2s ease-in-out infinite',
                }}
              >
                <span className={`text-2xl transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:-translate-y-1'}`}>
                  {isSubmitting ? '⏳' : '🚀'}
                </span>
                <span className="font-serif text-lg">
                  {isSubmitting ? 'TRANSMITTING...' : 'LAUNCH TRANSMISSION'}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
