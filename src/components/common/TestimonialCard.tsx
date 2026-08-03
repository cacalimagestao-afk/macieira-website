interface TestimonialCardProps {
  clientName: string
  company: string
  quote: string
  result: string
  photoUrl?: string
}

export const TestimonialCard = ({
  clientName,
  company,
  quote,
  result,
  photoUrl,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm hover:shadow-md transition">
      <p className="text-gray-700 italic mb-4 text-sm">"{quote}"</p>

      <div className="flex items-center gap-4 mb-4">
        {photoUrl && (
          <img
            src={photoUrl}
            alt={clientName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-brand-black">{clientName}</p>
          <p className="text-xs text-brand-text">{company}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-brand-green font-bold text-sm">✨ {result}</p>
      </div>
    </div>
  )
}
