import type { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient: string
}

export default function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="group bg-white/60 backdrop-blur-sm border border-green-200 hover:border-green-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/80">
      <div className={`w-16 h-16 ${gradient} rounded-xl flex items-center justify-center mb-6 text-4xl group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}