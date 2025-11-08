'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: "How fast are transfers with RemitAbeg?",
      answer: "Transfers typically complete in under 2 minutes. Once you send, the recipient can access their funds almost instantly, unlike traditional services that can take 3-5 business days."
    },
    {
      question: "What are the fees?",
      answer: "We charge a flat 0.5% fee on all transfers, with no hidden costs. Traditional remittance services often charge 5-10% in fees and unfavorable exchange rates."
    },
    {
      question: "Is RemitAbeg secure?",
      answer: "Yes! RemitAbeg is built on blockchain technology, which provides transparent, immutable transaction records. Your funds are secured by smart contracts, and you maintain full control of your wallet."
    },
    {
      question: "Do I need a crypto wallet?",
      answer: "Yes, you'll need a Web3 wallet like MetaMask, Trust Wallet, or any WalletConnect-compatible wallet. Don't worry - we'll guide you through the setup process!"
    },
    {
      question: "How does the recipient get their money?",
      answer: "Recipients can receive funds directly to their wallet or convert to local currency (NGN) through our trusted off-ramp partners. We're working on more direct bank transfer options."
    },
    {
      question: "Which countries can I send to?",
      answer: "Currently, we focus on Nigeria, but we're expanding to other African countries. You can send from anywhere in the world to supported destinations."
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about RemitAbeg
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-green-50/50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-green-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}