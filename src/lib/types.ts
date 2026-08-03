/**
 * Definições de tipos compartilhadas do site Macieira Consultoria.
 */

/** Dados preenchidos no formulário de contato. */
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  scheduleConsultation: boolean;
}

/** Dados preenchidos no formulário de newsletter. */
export interface NewsletterFormData {
  email: string;
  sendGuide: boolean;
}

/** Registro persistido de um envio do formulário de contato. */
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  subject: string;
  message: string;
  scheduleConsultation: boolean;
  createdAt: string;
  userIp: string | null;
}

/** Registro persistido de uma inscrição na newsletter. */
export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: string;
  userIp: string | null;
  confirmed: boolean;
}

/** Depoimento de cliente exibido no site. */
export interface TestimonialData {
  id: string;
  clientName: string;
  company: string;
  quote: string;
  result: string;
  photoUrl: string;
}

/** Serviço oferecido pela consultoria. */
export interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/** Número da etapa dentro da metodologia DMAIC. */
export type DmaicStepNumber = 1 | 2 | 3 | 4 | 5;

/** Etapa da metodologia DMAIC. */
export interface DmaitStepData {
  step: DmaicStepNumber;
  title: string;
  description: string;
  icon: string;
}

/** Alias semântico para `DmaitStepData`. */
export type DmaicStepData = DmaitStepData;

/** Resposta padrão das rotas de API. */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
