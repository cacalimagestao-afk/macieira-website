'use client'

import { DMAIC_STEPS } from '@/lib/config'
import { DmaitStep } from '@/components/common/DmaitStep'

export const DmaitMethod = () => {
  return (
    <section id="metodo" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="section-title">Método DMAIC</h2>
          <p className="text-brand-text-muted text-lg max-w-2xl mx-auto">
            Cinco etapas comprovadas para transformar a saúde financeira da sua empresa.
          </p>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 mb-12">
          {DMAIC_STEPS.map((step, index) => (
            <DmaitStep key={step.title} step={step} index={index} />
          ))}
        </div>

        {/* Mobile Layout - Vertical */}
        <div className="md:hidden space-y-8 mb-12">
          {DMAIC_STEPS.map((step, index) => (
            <DmaitStep key={step.title} step={step} index={index} />
          ))}
        </div>

        {/* Connector Lines (Desktop Only) */}
        <div className="hidden md:block relative h-2 bg-gradient-to-r from-brand-gold/0 via-brand-gold/30 to-brand-gold/0 rounded-full mb-16"></div>

        {/* Tagline Section */}
        <div className="bg-brand-black/50 border border-brand-gold/10 rounded-xl p-8 md:p-12 text-center">
          <p className="text-lg text-brand-white font-semibold mb-2">
            Do diagnóstico ao resultado sustentado.
          </p>
          <p className="text-brand-text-muted text-sm">
            Cada etapa com entregáveis claros, responsáveis definidos e indicadores acompanhados.
          </p>
        </div>
      </div>
    </section>
  )
}
