'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterFormSchema, type NewsletterFormInput } from '@/lib/validation'
import { submitNewsletterForm } from '@/lib/api-client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const NewsletterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormInput>({
    resolver: zodResolver(newsletterFormSchema),
  })

  const onSubmit = async (data: NewsletterFormInput) => {
    setIsLoading(true)
    try {
      const response = await submitNewsletterForm(data)
      if (!response.success) throw new Error(response.message)
      
      toast.success('Inscrição realizada com sucesso! Verifique seu e-mail.')
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer inscrição')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brand-white mb-2">
          Seu melhor e-mail *
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

      <div className="flex
