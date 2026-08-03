'use client'

import Link from 'next/link'
import { Logo } from './common/Logo'
import { useState } from 'react'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-gold/10">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm text-brand-text hover:text-brand-gold transition duration-300">
              Serviços
            </a>
            <a href="#metodo" className="text-sm text-brand-text hover:text-brand-gold transition duration-300">
              Método DMAIC
            </a>
            <a href="#depoimentos" className="text-sm text-brand-text hover:text-brand-gold transition duration-300">
              Depoimentos
            </a>
            <a
              href="#contato"
              className="btn-gold text-sm"
            >
              Contato
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-brand-gold hover:text-brand-gold-light transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            <a href="#servicos" className="block text-sm text-brand-text hover:text-brand-gold transition">
              Serviços
            </a>
            <a href="#metodo" className="block text-sm text-brand-text hover:text-brand-gold transition">
              Método DMAIC
            </a>
            <a href="#depoimentos" className="block text-sm text-brand-text hover:text-brand-gold transition">
              Depoimentos
            </a>
            <a href="#contato" className="btn-gold text-sm w-full text-center">
              Contato
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
