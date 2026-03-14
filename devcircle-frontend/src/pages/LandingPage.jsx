import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden', position: 'relative' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)', top: -150, left: -150, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', bottom: -100, right: -100, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>

        {/* NAVBAR */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Logo size="md" />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              Login
            </button>
            <button onClick={() => navigate('/signup')} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
              Sign Up Free
            </button>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ padding: '96px 0 80px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc', fontSize: 12, padding: '5px 14px', borderRadius: 100, marginBottom: 32, letterSpacing: '0.3px' }}>
            <span style={{ width: 6, height: 6, background: '#6366f1', borderRadius: '50%', display: 'inline-block' }} />
            Built for college developers
          </div>

          <h1 style={{ fontSize: 'clamp(42px,7vw,76px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-2.5px', color: '#fff', marginBottom: 24 }}>
            Where student<br />
            devs <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#a5b4fc,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>find their</em><br />
            circle
          </h1>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.65 }}>
            Showcase your projects. Connect with builders. Find teammates for your next hackathon — all on one campus-first platform.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}>
              Get Started Free →
            </button>
            <button onClick={() => navigate('/feed')} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '14px 28px', borderRadius: 10, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>
              Explore Projects
            </button>
          </div>

          {/* STATS */}
          <div style={{ display: 'flex', margin: '56px 0 0', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
            {[
              { num: '2.4k+', label: 'Student Developers' },
              { num: '890+', label: 'Projects Shared' },
              { num: '140+', label: 'Hackathons Listed' },
              { num: '60+', label: 'Colleges' },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex: 1, padding: '22px 24px', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontSize: 26, fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: 4 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ padding: '96px 0' }}>
          <p style={{ fontSize: 11, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', marginBottom: 14, fontWeight: 500 }}>Platform Features</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, textAlign: 'center', color: '#fff', letterSpacing: '-1.2px', marginBottom: 12, lineHeight: 1.15 }}>Everything a student<br />dev needs</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', textAlign: 'center', maxWidth: 400, margin: '0 auto 56px', lineHeight: 1.6 }}>From your first side project to your first hackathon win.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { icon: '🧑‍💻', color: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.2)', title: 'Showcase Projects', desc: 'Upload your builds with screenshots, tech stack, and GitHub links.' },
              { icon: '🤝', color: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.2)', title: 'Find Collaborators', desc: 'Search students by skill, branch, or year. Send collab requests instantly.' },
              { icon: '🏆', color: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.2)', title: 'Hackathon Board', desc: 'Discover upcoming hackathons and find open team slots near you.' },
              { icon: '🔔', color: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.2)', title: 'Real-time Alerts', desc: 'Instant notifications when someone wants to collaborate or join your team.' },
              { icon: '🔍', color: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.2)', title: 'Smart Search', desc: 'Filter developers by skill, college, year, or domain in seconds.' },
              { icon: '✨', color: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.2)', title: 'Dev Profiles', desc: 'Your public portfolio page — projects, stack, and contributions in one place.' },
            ].map((f, i) => (
              <div key={i} style={{ background: '#080A0F', padding: '32px 28px' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: f.color, border: `1px solid ${f.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10, letterSpacing: '-0.3px' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECT CARDS */}
        <div style={{ paddingBottom: 96 }}>
          <p style={{ fontSize: 11, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', marginBottom: 14, fontWeight: 500 }}>Live Projects</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, textAlign: 'center', color: '#fff', letterSpacing: '-1.2px', marginBottom: 12 }}>Built by students,<br />for students</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', textAlign: 'center', maxWidth: 400, margin: '0 auto 48px', lineHeight: 1.6 }}>Real projects from real college devs.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { title: 'AI Resume Reviewer', tag: 'Open to collab', desc: 'Analyzes resumes against JD using NLP and gives improvement suggestions with scoring.', tech: ['React', 'Python', 'OpenAI', 'FastAPI'], avatars: ['A', 'R'], colors: ['#6366f1', '#ec4899'], count: '2 collaborators' },
              { title: 'Campus Lost & Found', tag: 'Hackathon project', desc: 'Real-time lost and found system for college campuses with image recognition matching.', tech: ['Next.js', 'MongoDB', 'Cloudinary'], avatars: ['P', 'K', 'S'], colors: ['#ec4899', '#10b981', '#6366f1'], count: '3 collaborators' },
              { title: 'StudySync', tag: 'Looking for team', desc: 'Pomodoro-based collaborative study rooms with live presence and shared todo lists.', tech: ['React', 'Socket.io', 'Node.js'], avatars: ['M'], colors: ['#10b981'], count: 'Needs 2 more' },
              { title: 'PeerPay', tag: 'Deployed ✓', desc: 'Split bills and track shared expenses within college friend groups. UPI integrated.', tech: ['Flutter', 'Firebase', 'Razorpay'], avatars: ['V', 'N'], colors: ['#6366f1', '#ec4899'], count: '2 collaborators' },
            ].map((p, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px' }}>{p.title}</span>
                  <span style={{ fontSize: 11, background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(99,102,241,0.2)', whiteSpace: 'nowrap', marginLeft: 8 }}>{p.tag}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tech.map((t, j) => (
                    <span key={j} style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', padding: '3px 9px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex' }}>
                    {p.avatars.map((a, j) => (
                      <div key={j} style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #080A0F', marginLeft: j === 0 ? 0 : -8, background: p.colors[j] || '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff' }}>{a}</div>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{p.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BOX */}
        <div style={{ paddingBottom: 80 }}>
          <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, padding: '64px 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, color: '#fff', letterSpacing: '-1.2px', marginBottom: 12 }}>Ready to find<br />your circle?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>Join thousands of student devs already building together.</p>
            <button onClick={() => navigate('/signup')} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}>
              Create Your Profile →
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size="sm" />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Built with ❤️ for college developers · 2025</span>
        </footer>

      </div>
    </div>
  )
}