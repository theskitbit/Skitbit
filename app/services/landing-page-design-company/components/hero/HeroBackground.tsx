export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - very subtle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(600px at 50% 30%, rgba(0, 0, 0, 0.03), transparent 80%)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Radial light accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(0, 0, 0, 0.02), transparent 70%)',
        }}
      />
    </div>
  )
}
