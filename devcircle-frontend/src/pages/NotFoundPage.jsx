import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Logo size="md" />
      </nav>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: 80, fontWeight: 700, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-4px', marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: '#fff', marginBottom: 12, letterSpacing: '-0.5px' }}>Page not found</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Looks like this page doesn't exist!</p>
        <button onClick={() => navigate('/')} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
          Go Home →
        </button>
      </div>
    </div>
  )
}