import { TrendingUp, Users, Globe, Zap } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '$2.5M+',
      label: 'Total Volume',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '12,000+',
      label: 'Active Users',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: '45+',
      label: 'Countries',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: '< 2 min',
      label: 'Avg. Transfer Time',
      gradient: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}