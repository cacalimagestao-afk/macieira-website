interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

export const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  const iconEmoji: Record<string, string> = {
    'magnifying-glass': '🔍',
    'chart-line': '📈',
    'shield-check': '🛡️',
  }

  return (
    <div className="bg-white border border-gray-200 p-8 rounded-lg hover:shadow-lg transition transform hover:-translate-y-2">
      <div className="text-4xl mb-4">{iconEmoji[icon] || '✨'}</div>
      <h3 className="text-xl font-bold text-brand-black mb-3">{title}</h3>
      <p className="text-brand-text mb-4 leading-relaxed">{description}</p>
      <a href="#contato" className="text-brand-green font-semibold hover:underline">
        Saiba mais →
      </a>
    </div>
  )
}
