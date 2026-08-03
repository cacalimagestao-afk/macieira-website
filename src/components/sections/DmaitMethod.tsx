import { DmaitStep } from '../common/DmaitStep'
import { DMAIC_STEPS } from '@/lib/config'

export const DmaitMethod = () => {
  return (
    <section id="metodo" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-black mb-4">
            Método DMAIC Financeiro
          </h2>
          <p className="text-lg text-brand-text max-w-2xl mx-auto">
            Cinco etapas comprovadas para organizar suas finanças e crescer com inteligência.
          </p>
        </div>

        <div className="hidden lg:flex items-center justify-between gap-4">
          {DMAIC_STEPS.map((item, index) => (
            <div key={item.step} className="flex-1 flex flex-col items-center">
              <DmaitStep
                step={item.step}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
              {index < DMAIC_STEPS.length - 1 && (
                <div className="text-3xl text-brand-gold mt-4">→</div>
              )}
            </div>
          ))}
        </div>

        <div className="lg:hidden space-y-8">
          {DMAIC_STEPS.map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0">
                <DmaitStep
                  step={item.step}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-semibold text-brand-black italic">
            "Definimos o ponto de partida, medimos a oportunidade, analisamos o melhor caminho, <br className="hidden md:block" />
            melhoramos a estrutura de capital e controlamos o risco em cada etapa do crescimento."
          </p>
        </div>
      </div>
    </section>
  )
}
