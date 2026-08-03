interface DmaitStepProps {
  step: number
  title: string
  description: string
  icon: string
}

export const DmaitStep = ({ step, title, description, icon }: DmaitStepProps) => {
  const iconEmoji: Record<string, string> = {
    target: '🎯',
    ruler: '📏',
    'magnifying-glass': '🔍',
    'trending-up': '📈',
    'shield-check': '🛡️',
  }

  return (
    <div className="flex flex-col items-center group">
      {/* Step circle with gradient */}
      <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center text-brand-black font-bold text-2xl mb-6 shadow-gold-lg group-hover:shadow-gold group-hover:scale-110 transition-all duration-300">
        {step}
      </div>

      {/* Icon */}
      <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
        {iconEmoji[icon] || '✨'}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-brand-white mb-3 text-center group-hover:text-brand-gold transition-colors">
        {title}
      </h3>
      <p className="text-brand-text-muted text-center text-sm leading-relaxed">
        {description}
      </p>
