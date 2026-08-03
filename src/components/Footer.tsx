import { SITE_CONFIG } from '@/lib/config'

export const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-brand-gold/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-brand-gold mb-4">Macieira</h3>
            <p className="text-brand-text-muted text-sm leading-relaxed">
              Inteligência Financeira, Tributária e Fomento para Empresas Brasileiras.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand-white mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li><a href="#servicos" className="text-brand-text-muted hover:text-brand-gold transition text-sm">Serviços</a></li>
              <li><a href="#metodo" className="text-brand-text-muted hover:text-brand-gold transition text-sm">Método DMAIC</a></li>
              <li><a href="#depoimentos" className="text-brand-text-muted hover:text-brand-gold transition text-sm">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand-white mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li>
                
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-brand-text-muted hover:text-brand-gold transition"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                
                  href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                  className="text-brand-text-muted hover:text-brand-gold transition"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                
                  href={SITE_CONFIG.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-gold-light transition"
                >
                  Agendar consulta
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-gold/10 pt-8 text-center">
          <p className="text-brand-text-muted text-xs">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
