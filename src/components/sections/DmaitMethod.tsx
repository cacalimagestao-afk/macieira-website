import { DmaitStep } from '../common/DmaitStep'
import { DMAIC_STEPS } from '@/lib/config'

export const DmaitMethod = () => {
  return (
    <section id="metodo" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-pattern opacity-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4 inline-block">
            <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">
              Metodologia Própria
            </span>
          </div>
          <h2 className="section-title">
            Método <span className="text-gradient">DMAIC</span> Financeiro
          </h2>
          <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
            Cinco etapas comprovadas para organizar suas finanças e crescer com inteligência.
          </p>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden lg:flex items-center justify-between gap-4 mb-12">
          {DMAIC_STEPS.map((item, index) => (
            <div key={item.step} className="flex-1 flex flex-col items-center">
              <DmaitStep
                step={item.step}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
              {index < DMAIC_STEPS.length - 1 && (
                <div className="text-3xl text-brand-gold mt-6 mb-6">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Vertical stack */}
        <div className="lg:hidden space-y-8 mb-12">
          {DMAIC_STEPS.map((item) => (
            <div key={item.step}>
              <DmaitStep
                step={item.step}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="text-center bg-brand-gray-light rounded-xl p-8 border border-brand-gold/20">
