import { SITE_CONFIG } from '@/lib/config'

export const Footer = () => {
  return (
    <footer className="bg-brand-black text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Macieira Consultoria</h3>
            <p className="text-gray-400 text-sm">
              Inteligência Financeira, Tributária e Fomento para Empresas Brasileiras.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#servicos" className="hover:text-brand-gold transition">Serviços</a></li>
              <li><a href="#metodo" className="hover:text-brand-gold transition">Método DMAIC</a></li>
              <li><a href="#depoimentos" className="hover:text-brand-gold transition">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-brand-gold transition">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-brand-gold transition">
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Macieira Consultoria. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-brand-gold transition">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-brand-gold transition">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
