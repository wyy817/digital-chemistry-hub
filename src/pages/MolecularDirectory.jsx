import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const MODULES = [
  {
    num: '01',
    title: 'Chemistry Fundamentals',
    subtitle: '化学基础',
    tag: 'FUNDAMENTALS',
    desc: 'Atomic Structure · Chemical Bonds · Molecular Shape',
    accent: '#60a5fa',
    glow: '96,165,250',
    bg: 'linear-gradient(145deg,#020818 0%,#0a1628 45%,#1e3a8a 100%)',
    to: '/learn/ch1-atomic-structure',
    chapters: 3,
  },
  {
    num: '02',
    title: 'Cheminformatics',
    subtitle: '化学信息学',
    tag: 'INFORMATICS',
    desc: 'Functional Groups · SMILES · Molecular Representation',
    accent: '#c084fc',
    glow: '192,132,252',
    bg: 'linear-gradient(145deg,#080315 0%,#1a0838 45%,#4c1d95 100%)',
    to: '/learn/ch2-functional-groups',
    chapters: 2,
  },
  {
    num: '03',
    title: 'AI Drug Discovery',
    subtitle: 'AI 药物发现',
    tag: 'AI · PHARMA',
    desc: 'Molecular Properties · Drug Pipeline · Reaction Mechanisms',
    accent: '#34d399',
    glow: '52,211,153',
    bg: 'linear-gradient(145deg,#010f09 0%,#043321 45%,#065f46 100%)',
    to: '/learn/ch3-molecular-properties',
    chapters: 3,
  },
  {
    num: '04',
    title: 'Computational Chemistry',
    subtitle: '计算化学',
    tag: 'COMP · CHEM',
    desc: 'RDKit · Molecular Fingerprints · QSAR Modeling',
    accent: '#fbbf24',
    glow: '251,191,36',
    bg: 'linear-gradient(145deg,#0f0800 0%,#2d1500 45%,#78350f 100%)',
    to: '/learn/ch4-rdkit-basics',
    chapters: 3,
  },
]

const N = 4
const STEP = 90
const RADIUS = 290

// Per-card tilt + vertical stagger for the scattered spiral feel
const TILTS = [
  { rz: -5, dy: -28 },
  { rz:  7, dy:  30 },
  { rz: -3, dy: -18 },
  { rz:  6, dy:  24 },
]

const arrowStyle = {
  width: 42, height: 42, borderRadius: '50%',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.65)', fontSize: '1.55rem', lineHeight: 1,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0,
  transition: 'background 0.2s',
}

export default function MolecularDirectory() {
  const [rot, setRot]     = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const autoRef  = useRef(null)
  const drag     = useRef(null)
  const rootRef  = useRef(null)
  const navigate = useNavigate()

  const cur = ((-Math.round(rot / STEP)) % N + N) % N

  const next = useCallback(() => setRot(r => r - STEP), [])
  const prev = useCallback(() => setRot(r => r + STEP), [])

  const goTo = useCallback((idx) => {
    setRot(r => {
      const c    = ((-Math.round(r / STEP)) % N + N) % N
      const diff = ((idx - c) % N + N) % N
      const step = diff > N / 2 ? diff - N : diff
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

  // Non-passive wheel listener so we can preventDefault
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const handler = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) { next(); resetAuto() }
      else              { prev(); resetAuto() }
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [next, prev, resetAuto])

  const handleMouseMove = useCallback((e) => {
    setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 18,
      y: (e.clientY / window.innerHeight - 0.5) * 11,
    })
    if (drag.current && Math.abs(e.clientX - drag.current.x) > 8) {
      drag.current.moved = true
    }
  }, [])

  const onDown = (e) => {
    drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX, moved: false }
  }
  const onUp = (e) => {
    if (!drag.current) return
    const x  = e.clientX ?? e.changedTouches?.[0]?.clientX
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

  const cm = MODULES[cur]

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseDown={onDown} onMouseUp={onUp}
      onMouseLeave={() => { drag.current = null }}
      onTouchStart={onDown}
      onTouchMove={(e) => {
        if (drag.current && Math.abs(e.touches[0].clientX - drag.current.x) > 8)
          drag.current.moved = true
      }}
      onTouchEnd={onUp}
      style={{
        position: 'relative', width: '100vw', height: '100vh',
        background: '#000', overflow: 'hidden', userSelect: 'none',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '80px 80px',
      }} />

      {/* Top nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.4rem 2.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.045)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(0,0,0,0.55)',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <polygon points="14,2 25,8 25,20 14,26 3,20 3,8"
              stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
            <polygon points="14,8 19,11 19,17 14,20 9,17 9,11"
              stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.73rem', letterSpacing: '0.12em', fontWeight: 500 }}>
            DIGITAL CHEMISTRY
          </span>
        </div>

        {/* Center label */}
        <div style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.7rem', letterSpacing: '0.14em' }}>
          spiral · {String(cur + 1).padStart(2, '0')}
        </div>

        {/* Right hint */}
        <div style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.68rem', letterSpacing: '0.08em' }}>
          scroll / drag to explore
        </div>
      </nav>

      {/* 3D Stage */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        perspective: '1100px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Mouse parallax wrapper — instant, no transition */}
        <div style={{
          width: 0, height: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-mouse.y}deg) rotateY(${mouse.x}deg)`,
        }}>
          {/* Rotation wrapper — animated */}
          <div style={{
            width: 0, height: 0,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rot}deg)`,
            transition: 'transform 0.85s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {MODULES.map((m, i) => {
              const active = i === cur
              const t = TILTS[i]
              return (
                <div
                  key={i}
                  onClick={() => handleCardClick(m, i)}
                  style={{
                    position: 'absolute',
                    width: 310, height: 410,
                    left: -155, top: -205,
                    transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px) translateY(${t.dy}px) rotateZ(${t.rz}deg)`,
                    backfaceVisibility: 'hidden',
                    background: m.bg,
                    borderRadius: 16,
                    border: active
                      ? `1px solid rgba(${m.glow},0.55)`
                      : '1px solid rgba(255,255,255,0.05)',
                    boxShadow: active
                      ? `0 0 70px rgba(${m.glow},0.22), 0 0 140px rgba(${m.glow},0.08), 0 40px 80px rgba(0,0,0,0.95)`
                      : '0 20px 55px rgba(0,0,0,0.88)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    padding: '1.75rem',
                    display: 'flex', flexDirection: 'column',
                    transition: 'box-shadow 0.5s, border-color 0.5s',
                  }}
                >
                  {/* Large number watermark */}
                  <div style={{
                    position: 'absolute', bottom: '-1.5rem', right: '-0.5rem',
                    fontSize: '10rem', fontWeight: 900, lineHeight: 1,
                    color: `rgba(${m.glow},0.055)`,
                    letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none',
                  }}>
                    {m.num}
                  </div>

                  {/* Thin accent line at top */}
                  <div style={{
                    position: 'absolute', top: 0, left: '1.75rem', right: '1.75rem', height: 2,
                    background: active
                      ? `linear-gradient(90deg, transparent, rgba(${m.glow},0.7), transparent)`
                      : 'transparent',
                    transition: 'background 0.5s',
                    borderRadius: 1,
                  }} />

                  {/* Tag chip */}
                  <div style={{
                    alignSelf: 'flex-start',
                    fontSize: '0.57rem', letterSpacing: '0.18em', fontWeight: 600,
                    color: `rgba(${m.glow},0.8)`,
                    border: `1px solid rgba(${m.glow},0.25)`,
                    borderRadius: 20, padding: '0.2rem 0.65rem',
                  }}>
                    {m.tag}
                  </div>

                  {/* Main content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '0.4rem' }}>
                    <div style={{
                      fontSize: '0.65rem', letterSpacing: '0.09em',
                      color: `rgba(${m.glow},0.45)`, marginBottom: '0.55rem',
                    }}>
                      {m.subtitle}
                    </div>
                    <div style={{
                      fontSize: '1.65rem', fontWeight: 800, color: '#fff',
                      lineHeight: 1.22, letterSpacing: '-0.02em',
                    }}>
                      {m.title}
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div>
                    <div style={{
                      fontSize: '0.7rem', color: 'rgba(255,255,255,0.27)',
                      lineHeight: 1.8, marginBottom: '1rem',
                    }}>
                      {m.desc}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.66rem', letterSpacing: '0.04em' }}>
                        {m.chapters} chapters
                      </span>
                      {active && (
                        <span style={{
                          color: m.accent, fontSize: '0.77rem', fontWeight: 600,
                          letterSpacing: '0.02em',
                        }}>
                          Begin →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '1.25rem 2.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.045)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(0,0,0,0.55)',
      }}>
        {/* Current module info */}
        <div style={{ minWidth: 0 }}>
          <div style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.6rem', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>
            {String(cur + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', fontWeight: 700,
            letterSpacing: '-0.01em', lineHeight: 1.3,
          }}>
            {cm.title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.7rem', marginTop: '0.15rem' }}>
            {cm.subtitle}
          </div>
        </div>

        {/* Controls: dots + arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
          {MODULES.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetAuto() }}
              style={{
                width: i === cur ? 22 : 6, height: 6, borderRadius: 3,
                border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0,
                background: i === cur ? cm.accent : 'rgba(255,255,255,0.18)',
                transition: 'all 0.35s',
              }}
            />
          ))}
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />
          <button
            style={arrowStyle}
            onClick={() => { prev(); resetAuto() }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >‹</button>
          <button
            style={arrowStyle}
            onClick={() => { next(); resetAuto() }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >›</button>
        </div>
      </div>
    </div>
  )
}
