export function GradientBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-[25%] -left-[10%] w-[65vw] h-[65vw]"
        style={{
          background:
            'radial-gradient(circle, oklch(0.52 0.20 160 / 0.055) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute -bottom-[25%] -right-[10%] w-[55vw] h-[55vw]"
        style={{
          background:
            'radial-gradient(circle, oklch(0.70 0.20 55 / 0.042) 0%, transparent 68%)',
        }}
      />
    </div>
  )
}
