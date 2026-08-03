'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { newsletterFormSchema, type NewsletterFormInput } from '@/lib/validation'
import { submitNewsletterForm } from '@/lib/api-client'
import { useState } from 'react'

export const NewsletterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormInput>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      sendGuide: true,
    },
  })

  const onSubmit = async (data: NewsletterFormInput) => {
    setIsLoading(true)
    try {
      await submitNewsletterForm(data)
      toast.success('Email confirmado! Verifique seu inbox.')
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao inscrever')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-sm">
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

      <div className="flex items-center gap-2">
        <input
          {...register('sendGuide')}
          type="checkbox"
          id="sendGuide"
          className="w-4 h-4 text-brand-gold rounded focus:ring-2 focus:ring-brand-gold"
        />
        <label htmlFor="sendGuide" className="text-sm text-brand-text">
          Enviar "Guia 5 Passos para Organizar suas Finanças"
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-gold text-white font-bold py-2 rounded hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Inscrevendo...' : 'Inscrever-se'}
      </button>
    </form>
  )
}
