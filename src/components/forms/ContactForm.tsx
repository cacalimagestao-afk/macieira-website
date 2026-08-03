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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-brand-white mb-2">
          Nome *
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="Seu nome"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brand-white mb-2">
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
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
          placeholder="(11) 99999-9999"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label
