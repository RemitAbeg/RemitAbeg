import { Shield, Lock, Eye, FileCheck, AlertCircle, Clock } from 'lucide-react'

export default function SecuritySection() {
  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Smart Contract Audits',
      description: 'Our smart contracts are audited by leading security firms to ensure your funds are protected.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Multi-Signature Wallets',
      description: 'Enhanced security with multi-sig technology requiring multiple approvals for transactions.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Transparent Transactions',
      description: 'Every transaction is recorded on the blockchain, providing complete transparency and traceability.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Regulatory Compliance',
      description: 'We comply with international AML and KYC regulations to ensure legitimate transactions.',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: 'Insurance Coverage',
      description: 'Your funds are protected by insurance coverage against smart contract vulnerabilities.',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Monitoring',
      description: 'Round-the-clock monitoring of all transactions to detect and prevent fraudulent activity.',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Security You Can Trust
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your money is protected by industry-leading security measures and blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-green-200 hover:border-green-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl text-white mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Trusted & Certified
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-2">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Audited</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-2">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Compliant</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-2">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Insured</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-2">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Monitored</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}