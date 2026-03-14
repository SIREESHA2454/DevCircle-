import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/Logo'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [received, setReceived] = useState([])
  const [sent, setSent] = useState([])
  const [activeTab, setActiveTab] = useState('received')
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const [receivedRes, sentRes] = await Promise.all([
        axios.get('http://localhost:5000/api/collab/received', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/collab/sent', { headers: { Authorization: `Bearer ${token}` } })
      ])
      setReceived(receivedRes.data)
      setSent(sentRes.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRespond = async (requestId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/collab/respond/${requestId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReceived(prev => prev.map(r =>
        r._id === requestId ? { ...r, status } : r
      ))
    } catch (error) {
      console.log(error)
    }
  }

  const statusBadge = (status) => {
    const styles = {
      pending: { background: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.2)' },
      accepted: { background: 'rgba(16,185,129,0.1)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.2)' },
      rejected: { background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }
    }
    return (
      <span style={{ ...styles[status], fontSize: 11, padding: '3px 10px', borderRadius: 100, fontWeight: 500 }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: -150, left: -100, pointerEvents: 'none', zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,10,15,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <Logo size="md" />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/feed')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>← Feed</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Collaborations</p>
          <h1 style={{ fontSize: 32, fontWeight: 600, color: '#fff', letterSpacing: '-1px' }}>Dashboard</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 4, border: '1px solid rgba(255,255,255,0.07)', width: 'fit-content' }}>
          {['received', 'sent'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit', border: 'none',
                background: activeTab === tab ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'none',
                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)'
              }}>
              {tab === 'received' ? `Received (${received.length})` : `Sent (${sent.length})`}
            </button>
          ))}
        </div>

        {loading && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Loading...</p>}

        {/* Received Requests */}
        {!loading && activeTab === 'received' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {received.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>No collab requests yet</p>
              </div>
            ) : received.map(r => (
              <div key={r._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff' }}>
                      {r.from?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{r.from?.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.from?.branch} · Year {r.from?.year}</div>
                    </div>
                  </div>
                  {statusBadge(r.status)}
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>On project: <span style={{ color: '#a5b4fc' }}>{r.project?.title}</span></p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{r.message}</p>
                </div>

                {r.status === 'pending' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleRespond(r._id, 'accepted')}
                      style={{ flex: 1, padding: '9px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#6ee7b7', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Accept ✓
                    </button>
                    <button onClick={() => handleRespond(r._id, 'rejected')}
                      style={{ flex: 1, padding: '9px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, color: '#fca5a5', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Reject ✗
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sent Requests */}
        {!loading && activeTab === 'sent' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {sent.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📤</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>No sent requests yet</p>
              </div>
            ) : sent.map(r => (
              <div key={r._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{r.project?.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Sent to: {r.to?.name}</div>
                  </div>
                  {statusBadge(r.status)}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{r.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}