'use client'

import { useState } from 'react'
import { Mail, Send, Twitter, MessageCircle, Users } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-500 to-green-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Form */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our community and get the latest updates on features, promotions, and remittance tips.
            </p>
            
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-white hover:bg-green-50 text-green-600 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    'Subscribing...'
                  ) : status === 'success' ? (
                    '✓ Subscribed!'
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Weekly updates</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Exclusive offers</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Remittance tips</span>
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Join Our Community
              </h3>
              
              <div className="space-y-4">
                <a
                  href="https://twitter.com/remitabeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Twitter</div>
                      <div className="text-sm text-white/70">Follow for updates</div>
                    </div>
                  </div>
                  <div className="text-white group-hover:translate-x-1 transition-transform">→</div>
                </a>

                <a
                  href="https://discord.gg/remitabeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Discord</div>
                      <div className="text-sm text-white/70">Join the conversation</div>
                    </div>
                  </div>
                  <div className="text-white group-hover:translate-x-1 transition-transform">→</div>
                </a>

                <a
                  href="https://t.me/remitabeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Telegram</div>
                      <div className="text-sm text-white/70">Get instant support</div>
                    </div>
                  </div>
                  <div className="text-white group-hover:translate-x-1 transition-transform">→</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}