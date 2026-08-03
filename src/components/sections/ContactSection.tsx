import { ContactForm } from '../forms/ContactForm'
import { NewsletterForm } from '../forms/NewsletterForm'
import { SITE_CONFIG } from '@/lib/config'

export const ContactSection = () => {
  return (
    <section id="contato" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-50"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4 inline-block">
            <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">
              Vamos Conversar
            </span>
          </div>
          <h2 className="section-title">
            Pronto para estruturar seu <span className="text-gradient">crescimento</span>?
          </h2>
          <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
            Entre em contato e descubra como a Macieira pode transformar as finanças da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="card border-brand-gold/20">
            <h3 className="text-xl font-bold text-brand-white mb-6">Enviar Mensagem</h3>
            <ContactForm />
          </div>

          {/*
