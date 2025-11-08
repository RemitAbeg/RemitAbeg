import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

export default function TestimonialCard({ name, role, content, avatar, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed italic">"{content}"</p>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={`${name} avatar`}
          className="w-12 h-12 rounded-full object-cover"
          width={48}
          height={48}
        />
        <div>
          <div className="font-bold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  )
}