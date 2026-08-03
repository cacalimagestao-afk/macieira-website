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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
