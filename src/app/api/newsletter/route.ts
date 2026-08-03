import { NextRequest, NextResponse } from 'next/server'
import { newsletterFormSchema } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    const rateLimit = checkRateLimit(ip, 'newsletter')
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: 'Muitas inscrições. Tente novamente em 24 horas.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = newsletterFormSchema.parse(body)

    // TODO: Save to Supabase and send welcome email via SendGrid
    // For now, just return success

    return NextResponse.json(
      { message: 'Inscrito com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter error:', error)
    
    if (error instanceof Error && error.message.includes('Validation error')) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Erro ao inscrever. Tente novamente.' },
      { status: 500 }
    )
  }
}
