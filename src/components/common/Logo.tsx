export const Logo = () => {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 bg-brand-black rounded-sm flex items-end justify-center gap-0.5 p-1.5 group-hover:shadow-gold transition-all duration-300">
        {/* Bar 1 - White */}
        <div className="w-1 bg-white rounded-t" style={{ height: '40%' }}></div>
        {/* Bar 2 - Green */}
        <div className="w-1 bg-brand-green rounded-t" style={{ height: '60%' }}></div>
        {/* Bar 3 - Red (tallest) */}
        <div className="w-1 bg-brand-red rounded-t" style={{ height: '100%' }}></div>
        {/* Bar 4 - Green */}
        <div className="w-1 bg-brand-green rounded-t" style={{ height: '60%' }}></div>
        {/* Bar 5 - Gold */}
        <div className="w-1 bg-brand-gold rounded-t" style={{ height: '40%' }}></div>
      </div>
      <span className="text-lg font-bold text-brand-white group-hover:text-brand-gold transition-colors duration-300">Macieira</span>
    </div>
  )
}
