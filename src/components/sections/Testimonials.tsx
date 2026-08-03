import { TestimonialCard } from '../common/TestimonialCard'
import { TESTIMONIALS } from '@/lib/config'

export const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red opacity-5 rounded-full blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4 inline-block">
            <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">
              Resultados Reais
            </span>
          </div>
          <h2 className="section-title">
            O que nossos <span className="text-gradient">clientes</span> falam
          </h2>
          <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
            Histórias de empresas que confiaram na Macieira e transformaram seus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
