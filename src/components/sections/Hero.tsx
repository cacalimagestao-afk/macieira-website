'use client'

import { SITE_CONFIG } from '@/lib/config'

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background with gradient pattern */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 bg-pattern"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-gold opacity-5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-brand-red opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">
            Bem-vindo à Macieira
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-brand-white mb-6 leading-tight">
          Organizamos o presente <span className="text-gradient">financeiro</span>.
          <br />
          Abrimos o caminho para <span className="text-gradient">crescimento</span>.
        </h1>

        <p className="text-lg md:text-xl text-brand-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
          Diagnóstico financeiro-tributário, captação de recursos e proteção contínua para empresas que querem crescer com inteligência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
            href={SITE_CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <span>📅</span>
            Agendar Consulta
          </a>

          
            href="#contato"
            className="btn-outline"
          >
            <span>📥</span>
            Baixar Guia
          </a>
        </div>

        <p className="text-brand-text-muted text-sm mt-8">
          Consulta inicial gratuita e sem compromisso
        </p>
      </div>
    </section>
  )
}
