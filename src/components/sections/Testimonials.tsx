import { TestimonialCard } from '../common/TestimonialCard'
import { TESTIMONIALS } from '@/lib/config'

export const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-20 bg-brand-gray">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-black mb-4">
            O que nossos clientes falam
          </h2>
          <p className="text-lg text-brand-text max-w-2xl mx-auto">
            Resultados reais de empresas que confiaram na Macieira.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
