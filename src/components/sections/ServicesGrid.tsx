import { ServiceCard } from '../common/ServiceCard'
import { SERVICES } from '@/lib/config'

export const ServicesGrid = () => {
  return (
    <section id="servicos" className="py-20 bg-brand-gray">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-black mb-4">
            O que a Macieira Faz
          </h2>
          <p className="text-lg text-brand-text max-w-2xl mx-auto">
            Três pilares de atuação para estruturar suas finanças e abrir caminhos para crescimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
