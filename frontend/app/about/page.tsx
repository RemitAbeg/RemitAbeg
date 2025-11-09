import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient-green">RemitAbeg</span>
            </h1>
            <p className="text-xl text-gray-600">
              Empowering the African diaspora with borderless remittances
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              RemitAbeg was born from a simple frustration: sending money home shouldn't be expensive, slow, or complicated. 
              Traditional remittance services charge exorbitant fees and take days to process transfers, making it difficult 
              for millions of Africans abroad to support their families back home.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We're changing that. By leveraging blockchain technology and Web3 infrastructure, we've created a platform 
              that enables instant, low-cost money transfers across borders. Our mission is to empower the African diaspora 
              with financial tools that are fast, transparent, and affordable.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2024 by a team of Nigerian developers and entrepreneurs, RemitAbeg started as a side project 
              to help friends and family send money home more efficiently. What began as a simple solution quickly grew 
              into a full-fledged platform serving thousands of users across the globe.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to be at the forefront of the Web3 remittance revolution, processing millions of dollars 
              in transfers and helping families stay connected across continents.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-2">🚀 Innovation</h3>
                <p className="text-gray-700">
                  We embrace cutting-edge technology to solve real-world problems.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-2">🤝 Community</h3>
                <p className="text-gray-700">
                  We're built by Africans, for Africans. Community comes first.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-2">💎 Transparency</h3>
                <p className="text-gray-700">
                  No hidden fees, no surprises. Everything is clear and upfront.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-2">🔒 Security</h3>
                <p className="text-gray-700">
                  Your funds and data are protected with industry-leading security.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl font-bold transition-all duration-200 shadow-xl hover:scale-105"
            >
              Start Sending Money
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}