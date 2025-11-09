'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

export default function PricingSection() {
  const [amount, setAmount] = useState(1000)

  const calculateFees = (amount: number) => {
    const remitAbegFee = amount * 0.005 // 0.5%
    const westernUnionFee = amount * 0.08 // 8%
    const moneyGramFee = amount * 0.075 // 7.5%
    
    return {
      remitAbeg: remitAbegFee,
      westernUnion: westernUnionFee,
      moneyGram: moneyGramFee,
      savings: westernUnionFee - remitAbegFee
    }
  }

  const fees = calculateFees(amount)

  const comparisons = [
    {
      service: 'RemitAbeg',
      fee: `$${fees.remitAbeg.toFixed(2)}`,
      percentage: '0.5%',
      speed: '< 2 minutes',
      features: ['Instant settlement', 'Transparent fees', 'No hidden charges', 'Blockchain secured'],
      gradient: 'from-green-500 to-green-600',
      recommended: true
    },
    {
      service: 'Western Union',
      fee: `$${fees.westernUnion.toFixed(2)}`,
      percentage: '8%',
      speed: '1-3 days',
      features: ['Traditional service', 'Physical locations', 'Higher fees', 'Slower processing'],
      gradient: 'from-gray-400 to-gray-500',
      recommended: false
    },
    {
      service: 'MoneyGram',
      fee: `$${fees.moneyGram.toFixed(2)}`,
      percentage: '7.5%',
      speed: '1-3 days',
      features: ['Traditional service', 'Physical locations', 'High fees', 'Slower processing'],
      gradient: 'from-gray-400 to-gray-500',
      recommended: false
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how much you save with RemitAbeg compared to traditional services
          </p>
        </div>

        {/* Interactive Calculator */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Calculate Your Savings
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Send (USD)
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">$100</span>
                <span className="text-3xl font-bold text-green-600">${amount}</span>
                <span className="text-sm text-gray-600">$10,000</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
              <p className="text-sm font-medium mb-2">You Save</p>
              <p className="text-5xl font-bold mb-2">${fees.savings.toFixed(2)}</p>
              <p className="text-sm opacity-90">with RemitAbeg vs Western Union</p>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                item.recommended ? 'border-green-500 shadow-xl' : 'border-green-200'
              }`}
            >
              {item.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Recommended
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.service}</h3>
                <div className={`inline-block bg-gradient-to-r ${item.gradient} text-white px-4 py-1 rounded-full text-sm font-bold mb-4`}>
                  {item.percentage} fee
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{item.fee}</div>
                <p className="text-sm text-gray-600">on ${amount} transfer</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="font-medium">Speed:</span>
                  <span>{item.speed}</span>
                </div>
              </div>

              <div className="space-y-3">
                {item.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {item.recommended ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            * Fees are estimates and may vary. Traditional service fees include transfer fees and exchange rate markups.
          </p>
        </div>
      </div>
    </section>
  )
}