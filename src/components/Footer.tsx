import { SITE_CONFIG } from '@/lib/config'

export const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-brand-gold/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-brand-gold mb-4">Macieira</h3>
            <p className="text-brand-text-muted text-sm leading-relaxed">
              Inteligência Financeira, Tributária e Fomento para Empresas Brasileiras.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-brand-white mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li><a href="#servicos" className="text-brand-text-muted hover:text-brand-gold transition text-sm">Serviços</a></li>
              <li><a href="#metodo" className="text-brand-text-muted hover:text-brand-gold transition text-sm">Método DMAIC</a></li>
              <li><a href="#depoimentos" className="text-brand-text-muted hover:text-brand-gold transition text-sm">Depoimentos</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold
