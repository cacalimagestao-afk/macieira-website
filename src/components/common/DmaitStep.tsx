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
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-green to-brand-gold flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
        {step}
      </div>

      <div className="text-4xl mb-3">{iconEmoji[icon] || '✨'}</div>

      <h3 className="text-xl font-bold text-brand-black mb-2 text-center">{title}</h3>
      <p className="text-brand-text text-center text-sm">{description}</p>
    </div>
  )
}
