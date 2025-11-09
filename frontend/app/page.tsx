'use client'

import { useEffect } from 'react'
import Navbar from "@/components/Navbar"
import StatsSection from "@/components/landing/StatsSection"
import FeatureCard from "@/components/landing/FeatureCard"
import TestimonialCard from "@/components/landing/TestimonialCard"
import FAQSection from "@/components/landing/FAQSection"
import PricingSection from "@/components/landing/PricingSection"
import SecuritySection from "@/components/landing/SecuritySection"
import NewsletterSection from "@/components/landing/NewsletterSection"
import { useAccount, useBalance } from 'wagmi'
import { useAppKitAccount, useAppKit } from '@reown/appkit/react'
import { toast } from 'react-toastify'

export default function Home() {
  // AppKit hooks
  const { address: appkitAddress, isConnected: appkitIsConnected } = useAppKitAccount()
  const { open } = useAppKit()
  
  // Wagmi hooks
  const { address: wagmiAddress, isConnected: wagmiIsConnected, chain } = useAccount()
  
  const address = wagmiAddress || appkitAddress
  const isConnected = appkitIsConnected || wagmiIsConnected
  
  const { data: balance } = useBalance({
    address: wagmiAddress
  })

  const handleConnect = async () => {
    try {
      await open()
    } catch (error) {
      console.error("Connection error:", error)
    }
  }

  useEffect(() => {
    if (isConnected) {
      toast.success(`Connected to ${chain?.name || 'Wallet'}!`, {
        autoClose: 3000,
      })
    }
  }, [isConnected])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            {/* Main Heading */}
            <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                Send am, abeg
              </span>
              <br />
              <span className="text-gray-900">
                Borderless Remittance
              </span>
              <br />
              <span className="text-4xl sm:text-5xl text-green-600">
                for Nigerians 🇳🇬
              </span>
            </h1>
            
            <p className="text-2xl text-gray-700 mb-4 max-w-2xl mx-auto">
              Fast, cheap, borderless money transfers
            </p>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              No middlemen. No delays. Just send am, abeg.
              <br />
              Powered by Web3. Built for Naija. 💸
            </p>
          </div>

          {/* Call to Action */}
          {!isConnected && (
            <div className="text-center mb-20">
              <button
                onClick={handleConnect}
                className="px-12 py-5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl transition-all duration-200 font-bold text-xl shadow-2xl shadow-green-500/50 hover:shadow-green-600/50 hover:scale-105"
              >
                Connect Wallet to Start
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Connect MetaMask, Trust Wallet, or 100+ other wallets
              </p>
            </div>
          )}

          {/* Wallet Status Dashboard */}
          {isConnected && (
            <div className="bg-white/60 backdrop-blur-sm border border-green-200 rounded-2xl p-8 mb-16 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Wallet Connected
                </h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Ready to Send</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6">
                  <p className="text-sm text-gray-600 mb-2">Wallet Address</p>
                  <p className="text-base font-mono text-gray-900 break-all">
                    {address?.slice(0, 8)}...{address?.slice(-6)}
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6">
                  <p className="text-sm text-gray-600 mb-2">Network</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {chain?.name || 'Unknown'}
                  </p>
                </div>

                {balance && (
                  <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6">
                    <p className="text-sm text-gray-600 mb-2">Balance</p>
                    <p className="text-xl font-bold text-gray-900">
                      {parseFloat(balance.formatted).toFixed(4)}
                    </p>
                    <p className="text-sm text-gray-500">{balance.symbol}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why RemitAbeg?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Sending money home shouldn't be hard. Traditional remittance services are slow and expensive. 
            <br /><br />
            RemitAbeg cuts out the middleman, giving you <strong className="text-green-600">speed</strong>, 
            low fees powered by DeFi rails, trustless transfers, and a community-first approach — built for the 
            <strong className="text-green-600"> Naija and African diaspora</strong>.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fast, cheap, and transparent remittances powered by blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="⚡"
              title="Instant Settlements"
              description="Transactions settle in under 2 minutes. No more waiting days for your money to arrive."
              gradient="bg-gradient-to-br from-green-500 to-green-600"
            />
            <FeatureCard
              icon="💸"
              title="Ultra-Low Fees"
              description="Just 0.5% per transaction. Save up to 90% compared to traditional services."
              gradient="bg-gradient-to-br from-yellow-500 to-yellow-600"
            />
            <FeatureCard
              icon="🔍"
              title="Full Transparency"
              description="Track every transaction on the blockchain. Real-time confirmations and complete visibility."
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon="🌍"
              title="Borderless Transfers"
              description="Send money anywhere, anytime. No geographical restrictions or banking hours."
              gradient="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <FeatureCard
              icon="🔒"
              title="Bank-Grade Security"
              description="Smart contracts audited by leading firms. Your funds are protected 24/7."
              gradient="bg-gradient-to-br from-red-500 to-red-600"
            />
            <FeatureCard
              icon="📱"
              title="Mobile-First Design"
              description="Optimized for mobile devices. Send money on the go with ease."
              gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
            />
            <FeatureCard
              icon="🤝"
              title="Community Driven"
              description="Built for Naija and the African diaspora. By us, for us."
              gradient="bg-gradient-to-br from-green-600 to-green-700"
            />
            <FeatureCard
              icon="💱"
              title="Multi-Currency Support"
              description="Support for stablecoins and major cryptocurrencies. More options coming soon."
              gradient="bg-gradient-to-br from-orange-500 to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Send money home in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="relative text-center group">
              <div className="absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-green-500 to-yellow-500 hidden md:block -z-10"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl font-bold text-white shadow-2xl shadow-green-500/50 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Connect Your Wallet
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Link your Web3 wallet (MetaMask, Trust Wallet, Coinbase Wallet, or 100+ others). No account creation needed.
              </p>
            </div>

            <div className="relative text-center group">
              <div className="absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-yellow-500 to-blue-500 hidden md:block -z-10"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl font-bold text-white shadow-2xl shadow-yellow-500/50 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Send Instantly
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enter recipient details and amount. Transfer stablecoins (USDT, USDC) or other digital assets with just a few clicks.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl font-bold text-white shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Receive in NGN
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Recipients get money in Nigerian Naira via our trusted off-ramp partners. Direct bank transfers coming soon!
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Average Transaction Time
            </h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl font-bold text-gradient-green">
                &lt; 2
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">minutes</div>
                <div className="text-sm text-gray-600">from send to receive</div>
              </div>
            </div>
            <p className="text-gray-600">
              Compare that to 1-5 business days with traditional services!
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from people sending money home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Chioma Okafor"
              role="Software Engineer, London"
              content="RemitAbeg has been a game-changer! I used to lose so much money on fees with Western Union. Now I send money home in minutes and save hundreds every month."
              avatar="https://i.pravatar.cc/150?img=5"
              rating={5}
            />
            <TestimonialCard
              name="Emeka Nwosu"
              role="Student, Toronto"
              content="As a student, every dollar counts. RemitAbeg's low fees mean I can send more money to my family back home. The speed is incredible too!"
              avatar="https://i.pravatar.cc/150?img=12"
              rating={5}
            />
            <TestimonialCard
              name="Amina Bello"
              role="Nurse, New York"
              content="I was skeptical about crypto at first, but RemitAbeg made it so easy. Now I can't imagine going back to traditional services. Fast, cheap, and reliable!"
              avatar="https://i.pravatar.cc/150?img=9"
              rating={5}
            />
            <TestimonialCard
              name="Tunde Adeyemi"
              role="Business Owner, Dubai"
              content="I send money to Nigeria weekly for my business. RemitAbeg saves me thousands in fees annually. The transparency is amazing - I can track everything."
              avatar="https://i.pravatar.cc/150?img=15"
              rating={5}
            />
            <TestimonialCard
              name="Ngozi Eze"
              role="Doctor, Houston"
              content="The customer support is excellent! They helped me set up my wallet and guided me through my first transaction. Now it's second nature."
              avatar="https://i.pravatar.cc/150?img=47"
              rating={5}
            />
            <TestimonialCard
              name="Oluwaseun Bakare"
              role="Entrepreneur, Berlin"
              content="RemitAbeg is the future of remittances. No more dealing with banks and their ridiculous fees. I recommend it to all my Nigerian friends abroad."
              avatar="https://i.pravatar.cc/150?img=33"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <SecuritySection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      {!isConnected && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Send?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Connect your wallet now and experience borderless remittances
              </p>
              <button
                onClick={handleConnect}
                className="px-12 py-5 bg-white hover:bg-green-50 text-green-600 rounded-xl transition-all duration-200 font-bold text-xl shadow-xl hover:scale-105"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-green-200 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold text-green-600 mb-4">
                🟢 RemitAbeg
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Send am, abeg — borderless remittances powered by Web3. Fast, cheap, and transparent money transfers for the African diaspora.
              </p>
              <div className="flex gap-4">
                <a href="https://twitter.com/remitabeg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors">
                  𝕏
                </a>
                <a href="https://discord.gg/remitabeg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors">
                  💬
                </a>
                <a href="https://t.me/remitabeg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors">
                  ✈️
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">Pricing</a></li>
                <li><a href="#faq" className="text-gray-600 hover:text-green-600 transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-gray-600 hover:text-green-600 transition-colors">Blog</a></li>
                <li><a href="/help" className="text-gray-600 hover:text-green-600 transition-colors">Help Center</a></li>
                <li><a href="/docs" className="text-gray-600 hover:text-green-600 transition-colors">API Docs</a></li>
                <li><a href="/guides" className="text-gray-600 hover:text-green-600 transition-colors">Guides</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-600 hover:text-green-600 transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a></li>
                <li><a href="/careers" className="text-gray-600 hover:text-green-600 transition-colors">Careers</a></li>
                <li><a href="/press" className="text-gray-600 hover:text-green-600 transition-colors">Press Kit</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-green-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2025 RemitAbeg. All rights reserved. Empowering Africans everywhere.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="/terms" className="text-gray-600 hover:text-green-600 transition-colors">Terms</a>
                <a href="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">Privacy</a>
                <a href="/compliance" className="text-gray-600 hover:text-green-600 transition-colors">Compliance</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
