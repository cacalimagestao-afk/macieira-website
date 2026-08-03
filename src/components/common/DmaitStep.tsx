import { DMAIC_STEPS } from '@/lib/config'

interface DmaitStepProps {
  step: (typeof DMAIC_STEPS)[number]
  index: number
}

export const DmaitStep = ({ step, index }: DmaitStepProps) => {
  const { title, description } = step

  return (
    <div className="group text-center">
      <div className="flex flex-col items-center">
        {/* Step Number */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-2xl font-bold text-brand-black shadow-gold group-hover:shadow-gold-lg transition-all duration-300 transform group-hover:scale-110">
            {index + 1}
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
