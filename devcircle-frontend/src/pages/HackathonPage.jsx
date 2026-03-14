import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/Logo'
import { useSocket } from '../context/SocketContext'


export default function HackathonPage() {
  const navigate = useNavigate()
  const [hackathons, setHackathons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', prize: '', link: '' })
  const [posting, setPosting] = useState(false)
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const { notifications, unreadCount, clearNotifications } = useSocket()

  useEffect(() => {
    fetchHackathons()
  }, [])

  const fetchHackathons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hackathons')
      setHackathons(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    setPosting(true)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/hackathons',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setHackathons([response.data.hackathon, ...hackathons])
      setShowForm(false)
      setForm({ title: '', description: '', date: '', location: '', prize: '', link: '' })
    } catch (error) {
      console.log(error)
    } finally {
      setPosting(false)
    }
  }

  const handleInterest = async (hackathonId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/hackathons/${hackathonId}/interest`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setHackathons(prev => prev.map(h =>
        h._id === hackathonId
          ? {
              ...h,
              interested: response.data.interested
                ? [...(h.interested || []), user._id]
                : (h.interested || []).filter(id => id !== user._id)
            }
          : h
      ))
    } catch (error) {
      console.log(error)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
  }

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Ambient blob */}
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: -150, right: -100, pointerEvents: 'none', zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,10,15,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <Logo size="md" />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
  Dashboard
</button>
            <button onClick={() => navigate('/feed')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Feed</button>
            <button onClick={() => navigate('/search')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
            <button onClick={() => navigate('/hackathons')} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Hackathons</button>
          </div>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
 <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => {
  clearNotifications()
  navigate('/dashboard')
}}>
  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
    🔔
  </div>
  {unreadCount > 0 && (
    <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>
      {unreadCount}
    </div>
  )}
</div>
  {notifications.length > 0 && (
    <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>
      {notifications.length}
    </div>
  )}
</div>
          <button onClick={() => navigate('/post-project')} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Post Project
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: 11, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Compete & Win</p>
            <h1 style={{ fontSize: 32, fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: 8 }}>Hackathon Board</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Discover upcoming hackathons and find your team</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Add Hackathon
          </button>
        </div>

        {/* Add Hackathon Form */}
        {showForm && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 16, padding: 28, marginBottom: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 20 }}>Post a Hackathon</h3>
            <form onSubmit={handlePost}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, display: 'block' }}>Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Smart India Hackathon 2025" style={inputStyle} required />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, display: 'block' }}>Date</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} required />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, display: 'block' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What's this hackathon about?" rows={3} style={{ ...inputStyle, resize: 'vertical' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, display: 'block' }}>Location</label>
                  <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Online / City" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, display: 'block' }}>Prize</label>
                  <input value={form.prize} onChange={e => setForm({ ...form, prize: e.target.value })} placeholder="₹1,00,000" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6, display: 'block' }}>Link</label>
                  <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" disabled={posting} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
                  {posting ? 'Posting...' : 'Post Hackathon'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '10px 20px', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Loading hackathons...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && hackathons.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 8 }}>No hackathons yet!</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Be the first to add one</p>
          </div>
        )}

        {/* Hackathon Cards */}
        {!loading && hackathons.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {hackathons.map((h) => {
              const isInterested = h.interested?.includes(user._id)
              return (
                <div key={h._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px', flex: 1 }}>{h.title}</h3>
                    {h.prize && (
                      <span style={{ fontSize: 12, background: 'rgba(245,158,11,0.1)', color: '#fcd34d', padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(245,158,11,0.2)', whiteSpace: 'nowrap', marginLeft: 8 }}>
                        {h.prize}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {h.description}
                  </p>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                    <span>📅 {new Date(h.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>📍 {h.location}</span>
                    <span>👥 {h.interested?.length || 0} interested</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button
                      onClick={() => handleInterest(h._id)}
                      style={{
                        flex: 1, padding: '9px',
                        background: isInterested ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                        border: isInterested ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, color: isInterested ? '#a5b4fc' : 'rgba(255,255,255,0.5)',
                        fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
                      }}>
                      {isInterested ? "Interested ✓" : "I'm Interested"}
                    </button>
                    {h.link && (
                      <a href={h.link} target="_blank" rel="noreferrer"
                        style={{ padding: '9px 16px', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        Visit →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}