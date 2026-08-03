import { DMAIC_STEPS } from '@/lib/config'

interface DmaitStepProps {
  step: (typeof DMAIC_STEPS)[number]
  index: number
}

export const DmaitStep = ({ step, index }: DmaitStepProps) => {
  const { title, description } = step

  const stepIcons = ['🎯', '📈', '📊', '⚙️', '✓']
  const stepColors = ['bg-brand-white', 'bg-brand-green', 'bg-brand-red', 'bg-brand-green', 'bg-brand-gold']

  return (
    <div className="group text-center">
      <div className="flex flex-col items-center">
        {/* Step Icon - Mini bar chart */}
        <div className="mb-6 relative">
          <div className={`w-16 h-16 rounded-lg ${stepColors[index]} flex items-center justify-center text-2xl shadow-gold group-hover:shadow-gold-lg transition-all duration-300 transform group-hover:scale-110`}>
            {stepIcons[index] || '✨'}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-brand-white">{title}</h3>
          <p className="text-brand-text-muted text-sm leading-relaxed max-w-xs">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
