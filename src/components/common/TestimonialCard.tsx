interface TestimonialCardProps {
  clientName: string
  company: string
  quote: string
  result: string
  photoUrl?: string
  index?: number
}

export const TestimonialCard = ({
  clientName,
  company,
  quote,
  result,
  photoUrl,
  index = 0,
}: TestimonialCardProps) => {
  return (
    <div className="group card border-brand-gold/20 hover:border-brand-gold/50 flex flex-col"
      style={{ animationDelay: `${index * 150}ms` }}>
      {/* Quote */}
      <p className="text-brand-text-muted italic mb-6 text-sm leading-relaxed flex-1">
        "{quote}"
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-brand-gold/20 to-transparent mb-6"></div>

      {/* Client info */}
      <div className="flex items-center gap-4 mb-6">
        {photoUrl && (
          <img
            src={photoUrl}
            alt={clientName}
            className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold/30"
          />
        )}
        <div>
          <p className="font-semibold text-brand-white">{clientName}</p>
          <p className="text-xs text-brand-text-muted">{company}</p>
        </div>
      </div>

      {/* Result highlight */}
      <div className="pt-4 border-t border-brand-gold/20">
        <p className="text-brand-gold font-semibold text-sm">✨ {result}</p>
      </div>
    </div>
  )
}
