import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_CONFIG } from '@/lib/config'
import './globals.css'

export const metadata: Metadata = {
  title: 'Macieira Consultoria | Inteligência Financeira e Fomento',
  description: 'Diagnóstico financeiro-tributário, captação de recursos e proteção contínua para empresas que querem crescer com inteligência.',
  openGraph: {
    title: 'Macieira Consultoria | Inteligência Financeira',
    description: 'Inteligência Financeira, Tributária e Fomento para Empresas Brasileiras',
    url: SITE_CONFIG.url,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Macieira Consultoria',
    description: 'Organizamos o presente financeiro. Abrimos o caminho para crescimento.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Macieira Consultoria',
              description: 'Inteligência Financeira, Tributária e Fomento para Empresas',
              url:
