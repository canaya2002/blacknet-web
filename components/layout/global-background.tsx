export function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* Base color reinforcement */}
      <div className="absolute inset-0 bg-[color:var(--color-bg)]" />

      {/* Aurora orb top-left */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.22), rgba(168,85,247,0) 60%)',
        }}
      />

      {/* Aurora orb top-right */}
      <div
        className="absolute -top-[15%] -right-[15%] h-[800px] w-[800px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(96,165,250,0.22), rgba(96,165,250,0) 60%)',
        }}
      />

      {/* Aurora orb center for depth */}
      <div
        className="absolute left-1/2 top-[15%] h-[600px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.08), rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Continuous grid pattern across the whole viewport, radially faded so it never hard-cuts on edges */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 100% 70% at 50% 0%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 70% at 50% 0%, black 30%, transparent 80%)',
        }}
      />

      {/* Secondary subtle grid lower in the page */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 70%, black 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 70%, black 0%, transparent 70%)',
        }}
      />

      {/* Conic shimmer up top */}
      <div
        className="absolute left-1/2 -top-[30%] h-[900px] w-[1200px] -translate-x-1/2 opacity-30 mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 230deg at 50% 50%, rgba(120,180,255,0) 0deg, rgba(120,180,255,0.10) 45deg, rgba(200,120,255,0.12) 90deg, rgba(255,255,255,0) 180deg, rgba(120,180,255,0) 360deg)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
}
