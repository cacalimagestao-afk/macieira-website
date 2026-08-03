import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    const rateLimit = checkRateLimit(ip, 'contactForm')
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: 'Muitas requisições. Tente novamente em 24 horas.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // TODO: Save to Supabase and send emails via SendGrid
    // For now, just return success

    return NextResponse.json(
      { message: 'Mensagem enviada com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof Error && error.message.includes('Validation error')) {
      return NextResponse.json(
        { message: 'Dados inválidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    )
  }
}
