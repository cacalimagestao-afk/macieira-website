import type { DmaitStepData, ServiceData, TestimonialData } from '@/lib/types';

/**
 * Constantes de configuração do site.
 * Valores sensíveis (chaves de API, tokens) NUNCA devem ficar aqui —
 * usar variáveis de ambiente (.env.local).
 */

export const SITE_CONFIG = {
  name: 'Macieira Consultoria',
  description:
    'Consultoria em gestão para pequenas e médias empresas: diagnóstico empresarial, captação de fomento e planejamento estratégico com metodologia DMAIC.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://macieiraconsultoria.com.br',
  ogImage: '/images/og-image.jpg',
  email: 'contato@macieiraconsultoria.com.br',
  phone: '+55 (48) 99999-9999',
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/macieiraconsultoria/diagnostico',
} as const;

export const COLORS = {
  preto: '#1a1a1a',
  verde: '#2d5a3d',
  dourado: '#b8860b',
  branco: '#ffffff',
  gray: '#6b7280',
  text: '#1a1a1a',
} as const;

export const SERVICES: ServiceData[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Empresarial',
    description:
      'Análise completa da sua operação para identificar gargalos, desperdícios e oportunidades de ganho. Você recebe um retrato claro da empresa e um plano de ação priorizado.',
    icon: 'search',
  },
  {
    id: 'fomento',
    title: 'Captação de Fomento',
    description:
      'Estruturação e apoio na captação de recursos junto a linhas de fomento, bancos de desenvolvimento e editais de incentivo, do enquadramento à prestação de contas.',
    icon: 'coins',
  },
  {
    id: 'planejamento',
    title: 'Planejamento Estratégico',
    description:
      'Construção do plano estratégico com metas, indicadores e rotina de acompanhamento, para que a estratégia saia do papel e vire resultado no dia a dia.',
    icon: 'target',
  },
];

export const DMAIC_STEPS: DmaitStepData[] = [
  {
    step: 1,
    title: 'Definir',
    description:
      'Delimitamos o problema, o escopo e os objetivos do projeto junto à liderança, alinhando expectativas e critérios de sucesso.',
    icon: '/images/dmaic-icons/definir.svg',
  },
  {
    step: 2,
    title: 'Medir',
    description:
      'Levantamos dados reais da operação e estabelecemos a linha de base dos indicadores que serão acompanhados.',
    icon: '/images/dmaic-icons/medir.svg',
  },
  {
    step: 3,
    title: 'Analisar',
    description:
      'Investigamos as causas raiz dos desvios com ferramentas estatísticas e de gestão, separando sintoma de causa.',
    icon: '/images/dmaic-icons/analisar.svg',
  },
  {
    step: 4,
    title: 'Melhorar',
    description:
      'Desenhamos e implantamos as soluções priorizadas por impacto e esforço, com responsáveis e prazos definidos.',
    icon: '/images/dmaic-icons/melhorar.svg',
  },
  {
    step: 5,
    title: 'Controlar',
    description:
      'Padronizamos os ganhos com rotinas, indicadores e governança, garantindo que o resultado se sustente no tempo.',
    icon: '/images/dmaic-icons/controlar.svg',
  },
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 'testimonial-1',
    clientName: 'Ana Paula Ribeiro',
    company: 'Metalúrgica Ribeiro',
    quote:
      'O diagnóstico mostrou em poucas semanas gargalos que a gente convivia há anos sem enxergar. A rotina de indicadores mudou a forma como tomamos decisão.',
    result: 'Redução de 22% no custo operacional em 6 meses',
    photoUrl: '/images/testimonials/ana-paula-ribeiro.jpg',
  },
  {
    id: 'testimonial-2',
    clientName: 'Marcos Andrade',
    company: 'Distribuidora Andrade',
    quote:
      'A consultoria estruturou nosso planejamento e ainda viabilizou a captação de fomento para o investimento. Saímos do improviso para um plano com metas claras.',
    result: 'R$ 1,8 milhão captados em linha de fomento',
    photoUrl: '/images/testimonials/marcos-andrade.jpg',
  },
];

/** Limites de envio por IP, em janela de 24 horas. */
export const RATE_LIMITS = {
  contactForm: {
    maxRequests: 5,
    windowMs: 24 * 60 * 60 * 1000,
  },
  newsletter: {
    maxRequests: 3,
    windowMs: 24 * 60 * 60 * 1000,
  },
} as const;
