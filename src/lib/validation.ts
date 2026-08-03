import { z } from 'zod';

/**
 * Schemas de validação dos formulários do site.
 * Usados tanto no cliente (react-hook-form) quanto nas rotas de API.
 */

/** Aceita telefones brasileiros com ou sem máscara, fixo ou celular. */
const PHONE_REGEX = /^(\+55\s?)?\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Informe seu e-mail.')
    .email('Informe um e-mail válido.')
    .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),
  company: z
    .string()
    .trim()
    .max(120, 'O nome da empresa deve ter no máximo 120 caracteres.')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, 'Informe um telefone válido, com DDD.')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .trim()
    .min(3, 'O assunto deve ter no mínimo 3 caracteres.')
    .max(150, 'O assunto deve ter no máximo 150 caracteres.'),
  message: z
    .string()
    .trim()
    .min(20, 'A mensagem deve ter no mínimo 20 caracteres.')
    .max(2000, 'A mensagem deve ter no máximo 2000 caracteres.'),
  scheduleConsultation: z.boolean().default(false),
});

export const newsletterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Informe seu e-mail.')
    .email('Informe um e-mail válido.')
    .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),
  sendGuide: z.boolean().default(true),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type NewsletterFormInput = z.infer<typeof newsletterFormSchema>;
