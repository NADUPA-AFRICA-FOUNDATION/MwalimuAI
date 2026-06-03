// Fixed full-viewport gradient layer — rendered once in the root layout.
// position: fixed so it never scrolls and is visible on every page.
// z-index: -10 so it sits above the <html> background but below all content.
// No 'use client' needed — purely declarative CSS animation.
export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Top-left — primary green */}
      <div className="absolute -top-80 -left-72 w-[72rem] h-[72rem] rounded-full bg-primary/18 dark:bg-primary/22 blur-[140px] animate-blob" />
      {/* Top-right — accent amber */}
      <div className="absolute -top-48 -right-96 w-[64rem] h-[64rem] rounded-full bg-accent/13 dark:bg-accent/18 blur-[120px] animate-blob animation-delay-3000" />
      {/* Mid-left — primary, drifts slowly */}
      <div className="absolute top-[38%] -left-64 w-[52rem] h-[52rem] rounded-full bg-primary/10 dark:bg-primary/14 blur-[130px] animate-blob animation-delay-6000" />
      {/* Bottom-right — accent amber */}
      <div className="absolute -bottom-72 -right-72 w-[62rem] h-[62rem] rounded-full bg-accent/12 dark:bg-accent/16 blur-[120px] animate-blob animation-delay-3000" />
      {/* Bottom-center — primary */}
      <div className="absolute -bottom-88 left-[18%] w-[56rem] h-[56rem] rounded-full bg-primary/9 dark:bg-primary/12 blur-[140px] animate-blob" />
    </div>
  )
}
