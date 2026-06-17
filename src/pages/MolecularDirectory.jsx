import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const MODULES = [
  {
    icon: '⚗️',
    title: 'Chemistry Fundamentals',
    subtitle: '化学基础',
    desc: '原子结构 · 化学键 · 分子形状',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.4)',
    gradient: 'linear-gradient(145deg,#080f22 0%,#0d1f44 55%,#1e3a8a 100%)',
    to: '/learn/ch1-atomic-structure',
    chapters: 3,
    formula: 'H₂O',
  },
  {
    icon: '🔬',
    title: 'Cheminformatics',
    subtitle: '化学信息学',
    desc: '功能基团 · SMILES · 分子表示',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.4)',
    gradient: 'linear-gradient(145deg,#100520 0%,#1a0838 55%,#4c1d95 100%)',
    to: '/learn/ch2-functional-groups',
    chapters: 2,
    formula: 'CH₄',
  },
  {
    icon: '💊',
    title: 'AI Drug Discovery',
    subtitle: 'AI 药物发现',
    desc: '分子性质 · 药物管线 · 反应机制',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.4)',
    gradient: 'linear-gradient(145deg,#011410 0%,#022820 55%,#065f46 100%)',
    to: '/learn/ch3-molecular-properties',
    chapters: 3,
    formula: 'C₆H₆',
  },
  {
    icon: '🧪',
    title: 'Computational Chemistry',
    subtitle: '计算化学',
    desc: 'RDKit · 分子指纹 · QSAR建模',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.4)',
    gradient: 'linear-gradient(145deg,#120600 0%,#1c0a00 55%,#78350f 100%)',
    to: '/learn/ch4-rdkit-basics',
    chapters: 3,
    formula: 'C₂H₅OH',
  },
]

const N = MODULES.length
const STEP = 360 / N   // 90 degrees per card
const RADIUS = 360     // px from center to card

// Animated molecular network background canvas
function MolBg() {
  const cvs = useRef(null)
  useEffect(() => {
    const c = cvs.current
    const ctx = c.getContext('2d')
    let raf
    const fit = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    fit()
    window.addEventListener('resize', fit)

    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.4,
    }))

    const frame = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > c.width) p.vx *= -1
        if (p.y < 0 || p.y > c.height) p.vy *= -1
      })
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 140) {
            ctx.strokeStyle = `rgba(70,155,235,${(1 - d / 140) * 0.22})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        })
        ctx.fillStyle = 'rgba(100,185,255,0.55)'
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      })
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', fit) }
  }, [])
  return <canvas ref={cvs} style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#04091a' }} />
}

// Benzene-ring (double hexagon + bonds) card decoration
function Hex({ color }) {
  return (
    <svg
      style={{ position: 'absolute', top: -28, left: -28, width: 195, height: 195, opacity: 0.11, pointerEvents: 'none' }}
      viewBox="0 0 195 195"
    >
      <polygon points="97,12 168,52 168,135 97,175 26,135 26,52" stroke={color} strokeWidth="2" fill="none" />
      <polygon points="97,43 132,63 132,103 97,123 62,103 62,63" stroke={color} strokeWidth="2" fill="none" />
      <line x1="97" y1="12" x2="97" y2="43" stroke={color} strokeWidth="1.5" />
      <line x1="168" y1="52" x2="132" y2="63" stroke={color} strokeWidth="1.5" />
      <line x1="168" y1="135" x2="132" y2="103" stroke={color} strokeWidth="1.5" />
      <line x1="97" y1="175" x2="97" y2="123" stroke={color} strokeWidth="1.5" />
      <line x1="26" y1="135" x2="62" y2="103" stroke={color} strokeWidth="1.5" />
      <line x1="26" y1="52" x2="62" y2="63" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

// Atom with three electron orbit ellipses
function Orbit({ color }) {
  return (
    <svg
      style={{ position: 'absolute', bottom: -20, right: -20, width: 165, height: 165, opacity: 0.11, pointerEvents: 'none' }}
      viewBox="0 0 165 165"
    >
      <circle cx="82" cy="82" r="9" fill={color} />
      <ellipse cx="82" cy="82" rx="66" ry="20" stroke={color} strokeWidth="1.5" fill="none" />
      <ellipse cx="82" cy="82" rx="66" ry="20" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(60 82 82)" />
      <ellipse cx="82" cy="82" rx="66" ry="20" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(120 82 82)" />
    </svg>
  )
}

function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 46, height: 46, borderRadius: '50%', cursor: 'pointer', flexShrink: 0,
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
        color: 'rgba(255,255,255,0.8)', fontSize: '1.9rem', lineHeight: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
    >
      {dir === 'prev' ? '‹' : '›'}
    </button>
  )
}

export default function MolecularDirectory() {
  const [rot, setRot] = useState(0)
  const autoRef = useRef(null)
  const drag = useRef(null)
  const navigate = useNavigate()

  // Current front-facing card index derived from accumulated rotation
  const cur = ((-Math.round(rot / STEP)) % N + N) % N

  const next = useCallback(() => setRot(r => r - STEP), [])
  const prev = useCallback(() => setRot(r => r + STEP), [])

  const goTo = useCallback((idx) => {
    setRot(r => {
      const c = ((-Math.round(r / STEP)) % N + N) % N
      const diff = ((idx - c) % N + N) % N
      const step = diff > N / 2 ? diff - N : diff  // shortest-path rotation
      return r - step * STEP
    })
  }, [])

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(next, 4200)
  }, [next])

  useEffect(() => {
    autoRef.current = setInterval(next, 4200)
    return () => clearInterval(autoRef.current)
  }, [next])

  const onDown = (e) => {
    const x = e.clientX ?? e.touches?.[0]?.clientX
    drag.current = { x, moved: false }
  }
  const onMove = (e) => {
    if (!drag.current) return
    const x = e.clientX ?? e.touches?.[0]?.clientX
    if (Math.abs(x - drag.current.x) > 8) drag.current.moved = true
  }
  const onUp = (e) => {
    if (!drag.current) return
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX
    const dx = x - drag.current.x
    if (drag.current.moved && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev()
      resetAuto()
    }
    drag.current = null
  }

  const handleCardClick = (mod, i) => {
    if (drag.current?.moved) return
    if (i !== cur) { goTo(i); resetAuto() }
    else navigate(mod.to)
  }

  return (
    <div
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
      onMouseLeave={() => { drag.current = null }}
      onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', userSelect: 'none' }}
    >
      <MolBg />

      {/* Header */}
      <header style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '5.5vh' }}>
        <h1 style={{
          margin: 0, fontWeight: 800, letterSpacing: '0.05em',
          fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
          background: 'linear-gradient(90deg, #93c5fd 0%, #a5f3fc 45%, #818cf8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 25px rgba(96,165,250,0.35))',
        }}>
          Digital Chemistry Hub
        </h1>
        <p style={{ color: 'rgba(148,195,255,0.55)', fontSize: '0.88rem', marginTop: '0.45rem', letterSpacing: '0.03em' }}>
          点击卡片开始学习 · Click a card to begin
        </p>
      </header>

      {/* 3D Carousel Stage */}
      <div style={{
        position: 'relative', zIndex: 5,
        height: '57vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '1100px',
      }}>
        <div style={{
          width: 300, height: 380,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rot}deg)`,
          transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {MODULES.map((m, i) => {
            const active = i === cur
            return (
              <div
                key={i}
                onClick={() => handleCardClick(m, i)}
                style={{
                  position: 'absolute',
                  width: 300, height: 380,
                  left: -150, top: -190,
                  transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
                  background: m.gradient,
                  borderRadius: 22,
                  border: `1.5px solid ${active ? m.color : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: active
                    ? `0 0 60px ${m.glow}, 0 30px 80px rgba(0,0,0,0.75)`
                    : '0 8px 30px rgba(0,0,0,0.55)',
                  cursor: active ? 'pointer' : 'default',
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  padding: '1.75rem',
                  backfaceVisibility: 'hidden',
                  transition: 'box-shadow 0.4s, border-color 0.4s',
                }}
              >
                <Hex color={m.color} />
                <Orbit color={m.color} />

                {/* Chemical formula badge */}
                <span style={{
                  position: 'absolute', top: '1.2rem', right: '1.25rem',
                  color: m.color, fontSize: '0.95rem', fontWeight: 700, opacity: 0.6,
                  letterSpacing: '0.03em',
                }}>
                  {m.formula}
                </span>

                <span style={{ color: m.color, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {m.subtitle}
                </span>
                <div style={{ fontSize: '3.2rem', margin: '0.55rem 0 0.8rem' }}>{m.icon}</div>
                <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.6rem' }}>
                  {m.title}
                </div>
                <div style={{ color: 'rgba(190,215,255,0.55)', fontSize: '0.82rem', lineHeight: 1.8, flex: 1 }}>
                  {m.desc}
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>{m.chapters} 章节</span>
                  {active && (
                    <span style={{
                      color: m.color, border: `1px solid ${m.color}`, borderRadius: 20,
                      padding: '0.28rem 0.9rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em',
                    }}>
                      开始学习 →
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <ArrowBtn dir="prev" onClick={() => { prev(); resetAuto() }} />

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {MODULES.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); resetAuto() }}
                style={{
                  width: i === cur ? 26 : 8, height: 8, borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer',
                  background: i === cur ? MODULES[cur].color : 'rgba(255,255,255,0.22)',
                  transition: 'all 0.35s', flexShrink: 0,
                }}
              />
            ))}
          </div>

          <ArrowBtn dir="next" onClick={() => { next(); resetAuto() }} />
        </div>

        <p style={{ margin: 0, color: 'rgba(185,210,255,0.5)', fontSize: '0.83rem', letterSpacing: '0.04em' }}>
          {MODULES[cur].subtitle} — {MODULES[cur].title}
        </p>
      </div>
    </div>
  )
}
