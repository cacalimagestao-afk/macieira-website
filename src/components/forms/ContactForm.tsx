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
        <label htmlFor="company" className="block text-sm font-semibold text-brand-white
