'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormInput } from '@/lib/validation'
import { submitContactForm } from '@/lib/api-client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormInput) => {
    setIsLoading(true)
    try {
      const response = await submitContactForm(data)
      if (!response.success) throw new Error(response.message)
      
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.')
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar mensagem')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-brand-white mb-2">
          Nome Completo *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Seu nome"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brand-white mb-2">
          E-mail *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="seu@email.com"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-brand-white mb-2">
          Empresa *
        </label>
        <input
          {...register('company')}
          type="text"
          id="company"
          placeholder="Nome da sua empresa"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-brand-white mb-2">
          Telefone *
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          placeholder="(11) 99999-9999"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-brand-white mb-2">
          Assunto *
        </label>
        <input
          {...register('subject')}
          type="text"
          id="subject"
          placeholder="Sobre o que deseja falar?"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-white mb-2">
          Mensagem *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          placeholder="Conte um pouco sobre o desafio da sua empresa (mínimo 20 caracteres)"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors resize-y"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          {...register('scheduleConsultation')}
          type="checkbox"
          id="scheduleConsultation"
          className="mt-1 h-4 w-4 rounded border-brand-gold/40 bg-brand-gray-light accent-brand-gold"
        />
        <label htmlFor="scheduleConsultation" className="text-sm text-brand-text-muted">
          Quero agendar uma consulta inicial gratuita
        </label>
      </div>

      <button type="submit" disabled={isLoading} className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  )
}
