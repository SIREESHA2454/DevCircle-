import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function TermsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Ambient blob */}
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: -150, right: -100, pointerEvents: 'none', zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Logo size="md" />
        </div>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Go Back
        </button>
      </nav>

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '60px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: '#6366f1', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Legal</p>
          <h1 style={{ fontSize: 36, fontWeight: 600, color: '#fff', letterSpacing: '-1.2px', marginBottom: 12 }}>Terms of Service</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>Last updated: March 2025</p>
        </div>

        {/* Sections */}
        {[
          {
            title: '1. Acceptance of Terms',
            content: 'By accessing or using DevCircle, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. DevCircle is designed exclusively for college students and developers.'
          },
          {
            title: '2. User Accounts',
            content: 'You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information during registration including your name, email, branch, and year. You may not create accounts for others without their permission.'
          },
          {
            title: '3. User Content',
            content: 'You retain ownership of all projects and content you post on DevCircle. By posting, you grant DevCircle a non-exclusive license to display your content on the platform. You are solely responsible for the content you share and must ensure it does not violate any third-party rights.'
          },
          {
            title: '4. Collaboration & Conduct',
            content: 'DevCircle is a professional community. Users are expected to treat each other with respect. Harassment, spam, or any form of abusive behavior will result in immediate account termination. Collaboration requests must be genuine and relevant to development work.'
          },
          {
            title: '5. Intellectual Property',
            content: 'All projects showcased on DevCircle remain the intellectual property of their respective creators. DevCircle does not claim ownership over any user-submitted projects, code, or content. The DevCircle name, logo, and platform design are protected intellectual property.'
          },
          {
            title: '6. Privacy',
            content: 'We collect only the information necessary to provide our services — your name, email, branch, year, and skills. We do not sell your personal data to third parties. Your password is always stored in encrypted form and is never accessible to anyone, including our team.'
          },
          {
            title: '7. Termination',
            content: 'DevCircle reserves the right to suspend or terminate accounts that violate these terms. Users may delete their accounts at any time. Upon deletion, all associated data will be permanently removed from our servers within 30 days.'
          },
          {
            title: '8. Changes to Terms',
            content: 'We may update these Terms of Service from time to time. We will notify users of significant changes via email. Continued use of DevCircle after changes constitutes acceptance of the new terms.'
          },
          {
            title: '9. Contact',
            content: 'If you have any questions about these Terms of Service, please reach out to us at support@devcircle.dev. We are committed to being transparent and will respond to all queries within 48 hours.'
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 12, letterSpacing: '-0.3px' }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            I Understand, Go Back 
          </button>
        </div>

      </div>
    </div>
  )
}