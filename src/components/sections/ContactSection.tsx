import { ContactForm } from '../forms/ContactForm'
import { NewsletterForm } from '../forms/NewsletterForm'
import { SITE_CONFIG } from '@/lib/config'

export const ContactSection = () => {
  return (
    <section id="contato" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-black mb-4">
            Pronto para estruturar seu crescimento?
          </h2>
          <p className="text-lg text-brand-text max-w-2xl mx-auto">
            Entre em contato conosco e descubra como a Macieira pode ajudar sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-brand-gray p-8 rounded-lg">
            <h3 className="text-xl font-bold text-brand-black mb-6">Enviar Mensagem</h3>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 justify-center">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="bg-brand-green text-white p-6 rounded-lg text-center font-bold hover:bg-opacity-90 transition"
            >
              <div className="text-3xl mb-2">📧</div>
              Enviar Email
              <div className="text-sm font-normal mt-2">{SITE_CONFIG.email}</div>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="bg-brand-black text-white p-6 rounded-lg text-center font-bold hover:bg-opacity-90 transition"
            >
              <div className="text-3xl mb-2">📞</div>
              Ligar
              <div className="text-sm font-normal mt-2">{SITE_CONFIG.phone}</div>
            </a>

            <a
              href={SITE_CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-white p-6 rounded-lg text-center font-bold hover:bg-opacity-90 transition"
            >
              <div className="text-3xl mb-2">📅</div>
              Agendar Consulta
              <div className="text-sm font-normal mt-2">Via Calendly</div>
            </a>
          </div>

          <div className="bg-brand-gray p-8 rounded-lg">
            <h3 className="text-xl font-bold text-brand-black mb-6">
              Receba Atualizações
            </h3>
            <NewsletterForm />
            <p className="text-xs text-brand-text mt-4">
              Não spam. Conteúdo relevante apenas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
