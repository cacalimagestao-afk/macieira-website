'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/config'

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-brand-green to-brand-gold min-h-[90vh] flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Organizamos o presente financeiro. <br />
          Abrimos o caminho para crescimento.
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Diagnóstico financeiro-tributário, captação de recursos e proteção contínua para empresas que querem crescer com inteligência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={SITE_CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand-green font-bold px-8 py-4 rounded hover:bg-gray-100 transition transform hover:scale-105"
          >
            <span>📅</span>
            Agendar Consulta
          </a>

          <a
            href="#contato"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded hover:bg-white hover:text-brand-green transition"
          >
            <span>📥</span>
            Baixar Guia
          </a>
        </div>

        <p className="text-white/70 text-sm mt-8">
          Consulta inicial gratuita e sem compromisso
        </p>
      </div>
    </section>
  )
}
