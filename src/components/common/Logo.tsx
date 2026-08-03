export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <svg width="32" height="32" viewBox="0 0 32 32" className="fill-current">
        <rect x="4" y="16" width="3" height="16" className="text-brand-white" />
        <rect x="9" y="10" width="3" height="22" className="text-brand-green" />
        <rect x="14" y="6" width="3" height="26" className="text-brand-red" />
        <rect x="19" y="10" width="3" height="22" className="text-brand-green" />
        <rect x="24" y="16" width="3" height="16" className="text-brand-gold" />
      </svg>
      <span className="text-lg font-bold text-brand-gold">Macieira</span>
    </div>
  )
}
