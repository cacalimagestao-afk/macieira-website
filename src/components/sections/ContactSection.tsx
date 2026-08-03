'use client'

import { ContactForm } from '@/components/forms/ContactForm'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { SITE_CONFIG } from '@/lib/config'

export const ContactSection = () => {
  return (
    <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-black/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="section-title">Vamos Conversar?</h2>
          <p className="text-brand-text-muted text-lg max-w-2xl mx-auto">
            Estamos prontos para ajudar sua empresa a crescer com inteligência financeira.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2 card border-brand-gold/20">
            <h3 className="text-2xl font-bold text-brand-white mb-6">Envie uma Mensagem</h3>
            <ContactForm />
          </div>

          <div className="space-y-8">
            {/* Newsletter */}
            <div className="card border-brand-gold/20">
              <h3 className="text-xl font-bold text-brand-white mb-2">Guia Gratuito</h3>
              <p className="text-brand-text-muted text-sm mb-6">
                Receba nosso guia de diagnóstico financeiro direto no seu e-mail.
              </p>
              <NewsletterForm />
            </div>

            {/* Contato direto */}
            <div className="card border-brand-gold/20">
              <h3 className="text-xl font-bold text-brand-white mb-6">Fale Direto</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <span className="block text-brand-text-muted mb-1">E-mail</span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-brand-gold hover:text-brand-gold-light transition break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>
                  <span className="block text-brand-text-muted mb-1">Telefone</span>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                    className="text-brand-gold hover:text-brand-gold-light transition"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </li>
              </ul>
              <a
                href={SITE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full justify-center mt-8"
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
