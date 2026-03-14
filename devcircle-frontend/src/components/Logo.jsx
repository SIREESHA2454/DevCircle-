export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 24, font: 14 },
    md: { icon: 32, font: 18 },
    lg: { icon: 48, font: 26 },
  }
  const s = sizes[size]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      {/* Icon */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer hexagon ring */}
        <polygon
          points="20,2 35,10.5 35,29.5 20,38 5,29.5 5,10.5"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Inner code brackets */}
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fontFamily="monospace"
          fill="url(#logoGrad)"
        >
          {'</>'}
        </text>
        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text */}
      <span style={{
        fontSize: s.font,
        fontWeight: 700,
        letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #fff 60%, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Dev<span style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Circle</span>
      </span>
    </div>
  )
}