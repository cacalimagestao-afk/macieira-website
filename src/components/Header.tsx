'use client'

import Link from 'next/link'
import { Logo } from './common/Logo'
import { SITE_CONFIG } from '@/lib/config'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm text-brand-text hover:text-brand-green transition">
              Serviços
            </a>
            <a href="#metodo" className="text-sm text-brand-text hover:text-brand-green transition">
              Método DMAIC
            </a>
            <a href="#depoimentos" className="text-sm text-brand-text hover:text-brand-green transition">
              Depoimentos
            </a>
            <a href="#contato" className="text-sm font-semibold text-white bg-brand-green px-4 py-2 rounded hover:bg-opacity-90 transition">
              Contato
            </a>
          </div>

          <button className="md:hidden text-brand-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
