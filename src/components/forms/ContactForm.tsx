'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { contactFormSchema, type ContactFormInput } from '@/lib/validation'
import { submitContactForm } from '@/lib/api-client'
import { useState } from 'react'

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormInput) => {
    setIsLoading(true)
    try {
      await submitContactForm(data)
      toast.success('Mensagem enviada! Entraremos em contato em breve.')
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-1">
          Nome *
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="Seu nome"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-1">
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="seu@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-brand-black mb-1">
          Empresa *
        </label>
        <input
          {...register('company')}
          type="text"
          placeholder="Nome da sua empresa"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
        />
        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-1">
          Telefone *
        </label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="(11) 99999-9999"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-brand-black mb-1">
          Assunto *
        </label>
        <select
          {...register('subject')}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
        >
          <option value="">Selecione um assunto</option>
          <option value="consultoria">Consultoria</option>
          <option value="fomento">Captação de Recursos</option>
          <option value="outro">Outro</option>
        </select>
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-1">
          Mensagem *
        </label>
        <textarea
          {...register('message')}
          placeholder="Conte-nos mais sobre sua situação..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-green resize-none"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input
          {...register('scheduleConsultation')}
          type="checkbox"
          id="schedule"
          className="w-4 h-4 text-brand-green rounded focus:ring-2 focus:ring-brand-green"
        />
        <label htmlFor="schedule" className="text-sm text-brand-text">
          Gostaria de agendar uma consulta inicial
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-green text-white font-bold py-3 rounded hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  )
}
