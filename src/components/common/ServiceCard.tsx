interface ServiceCardProps {
  title: string
  description: string
  icon: string
  index?: number
}

export const ServiceCard = ({ title, description, icon, index = 0 }: ServiceCardProps) => {
  const iconEmoji: Record<string, string> = {
    'magnifying-glass': '🔍',
    'chart-line': '📈',
    'shield-check': '🛡️',
  }

  return (
    <div className="group card border-brand-gold/20 hover:border-brand-gold/50 hover:shadow-gold-lg cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="mb-6">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {iconEmoji[icon] || '✨'}
        </div>
        <div className="h-1 w-12 bg-gradient-gold rounded-full group-hover:w-16 transition-all duration-300"></div>
      </div>

      <h3 className="text-xl font-bold text-brand-white mb-3 group-hover:text-brand-gold transition-colors">
        {title}
      </h3>

      <p className="text-brand-text-muted text-sm leading-relaxed mb-6">
        {description}
      </p>

      <a href="#contato" className="text-brand-gold text-sm font-semibold hover:text-brand-gold-light transition-colors inline-flex items-center gap-2">
        Saiba mais
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>
  )
}
