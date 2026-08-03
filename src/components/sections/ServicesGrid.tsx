import { ServiceCard } from '../common/ServiceCard'
import { SERVICES } from '@/lib/config'

export const ServicesGrid = () => {
  return (
    <section id="servicos" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-50"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4 inline-block">
            <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">
              Áreas de Atuação
            </span>
          </div>
          <h2 className="section-title">
            O que a <span className="text-gradient">Macieira</span> faz
          </h2>
          <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
            Três pilares de atuação para estruturar suas finanças e abrir caminhos para crescimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
