import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/Logo'
import { useSocket } from '../context/SocketContext'

export default function SearchPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({ skill: '', branch: '', year: '' })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const { notifications, unreadCount, clearNotifications } = useSocket()

 const handleSearch = async () => {
  setLoading(true)
  setSearched(true)
  try {
    const params = {}
    if (filters.skill) params.skill = filters.skill
    if (filters.branch) params.branch = filters.branch
    if (filters.year) params.year = filters.year

    const response = await axios.get('http://localhost:5000/api/users/search', {
      params,
      headers: { Authorization: `Bearer ${token}` }
    })

    // get current user's connections from backend
    const meResponse = await axios.get(
      `http://localhost:5000/api/users/${user._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    const myConnections = meResponse.data.user.connections || []

    // mark which users are already connected
    const usersWithStatus = response.data.map(u => ({
      ...u,
      isConnected: myConnections.includes(u._id)
    }))

    setUsers(usersWithStatus)

  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
  const handleConnect = async (userId) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/users/connect/${userId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    // update the connected status in UI
    setUsers(prev => prev.map(u =>
      u._id === userId
        ? { ...u, isConnected: response.data.connected }
        : u
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
            <button onClick={() => navigate('/feed')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              Feed
            </button>
            <button onClick={() => navigate('/search')} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              Search
            </button>
            <button onClick={() => navigate('/hackathons')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              Hackathons
            </button>
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
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Discover</p>
          <h1 style={{ fontSize: 32, fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: 8 }}>Find Developers</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Search by skill, branch or year to find your perfect collaborator</p>
        </div>

        {/* Search Filters */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 16, alignItems: 'flex-end' }}>

            {/* Skill */}
            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, display: 'block', letterSpacing: '0.5px' }}>SKILL</label>
              <input
                value={filters.skill}
                onChange={e => setFilters({ ...filters, skill: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. React, Python, ML..."
                style={inputStyle}
              />
            </div>

            {/* Branch */}
            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, display: 'block', letterSpacing: '0.5px' }}>BRANCH</label>
              <select
                value={filters.branch}
                onChange={e => setFilters({ ...filters, branch: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="" style={{ background: '#0D0F16' }}>All branches</option>
                <option value="CSE" style={{ background: '#0D0F16' }}>CSE</option>
                <option value="ECE" style={{ background: '#0D0F16' }}>ECE</option>
                <option value="EEE" style={{ background: '#0D0F16' }}>EEE</option>
                <option value="MECH" style={{ background: '#0D0F16' }}>Mechanical</option>
                <option value="IT" style={{ background: '#0D0F16' }}>IT</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, display: 'block', letterSpacing: '0.5px' }}>YEAR</label>
              <select
                value={filters.year}
                onChange={e => setFilters({ ...filters, year: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="" style={{ background: '#0D0F16' }}>All years</option>
                <option value="1" style={{ background: '#0D0F16' }}>1st Year</option>
                <option value="2" style={{ background: '#0D0F16' }}>2nd Year</option>
                <option value="3" style={{ background: '#0D0F16' }}>3rd Year</option>
                <option value="4" style={{ background: '#0D0F16' }}>4th Year</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
            >
              {loading ? 'Searching...' : 'Search →'}
            </button>
          </div>
        </div>

        {/* Results */}
        {!searched && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)' }}>Search for developers by skill, branch or year</p>
          </div>
        )}

        {searched && !loading && users.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)' }}>No developers found — try different filters!</p>
          </div>
        )}

        {users.length > 0 && (
          <>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
              {users.length} developer{users.length > 1 ? 's' : ''} found
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {users.map((u) => (
                <div key={u._id}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  {/* User header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{u.branch} · Year {u.year}</div>
                    </div>
                  </div>

                  {/* Bio */}
                  {u.bio && (
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {u.bio}
                    </p>
                  )}

                  {/* Skills */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    {u.skills?.slice(0, 4).map((skill, i) => (
                      <span key={i} style={{ fontSize: 11, background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(99,102,241,0.15)' }}>
                        {skill}
                      </span>
                    ))}
                    {u.skills?.length > 4 && (
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>+{u.skills.length - 4} more</span>
                    )}
                  </div>

                  {/* Connect button */}
                  <button
  onClick={() => handleConnect(u._id)}
  style={{
    width: '100%', padding: '9px',
    background: u.isConnected ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)',
    border: u.isConnected ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(99,102,241,0.2)',
    borderRadius: 8,
    color: u.isConnected ? '#6ee7b7' : '#a5b4fc',
    fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
  }}>
  {u.isConnected ? 'Connected ✓' : 'Connect 🤝'}
</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}