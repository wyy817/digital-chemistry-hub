import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MODULES = [
  {
    num: '01',
    title: 'Chemistry Fundamentals',
    subtitle: '化学基础',
    tag: 'FUNDAMENTALS',
    lines: [
      'Atomic Structure & Electron Configuration',
      'Chemical Bonds & Hybridization',
      'Molecular Shape · VSEPR Theory',
    ],
    accent: '#60a5fa',
    glow: '96,165,250',
    bg: 'linear-gradient(155deg, #020818 0%, #071530 55%, #1e3a8a 100%)',
    to: '/learn/ch1-atomic-structure',
    chapters: 3,
  },
  {
    num: '02',
    title: 'Cheminformatics',
    subtitle: '化学信息学',
    tag: 'INFORMATICS',
    lines: [
      'Functional Groups & Classification',
      'SMILES · InChI Molecular Notation',
      'Molecular Graph Representation',
    ],
    accent: '#c084fc',
    glow: '192,132,252',
    bg: 'linear-gradient(155deg, #080315 0%, #12052a 55%, #4c1d95 100%)',
    to: '/learn/ch2-functional-groups',
    chapters: 2,
  },
  {
    num: '03',
    title: 'AI Drug Discovery',
    subtitle: 'AI 药物发现',
    tag: 'AI · PHARMA',
    lines: [
      "Molecular Properties · Lipinski's Rule of Five",
      'Drug Discovery Pipeline & Stages',
      'Reaction Mechanisms & Catalysis',
    ],
    accent: '#34d399',
    glow: '52,211,153',
    bg: 'linear-gradient(155deg, #010f09 0%, #042816 55%, #065f46 100%)',
    to: '/learn/ch3-molecular-properties',
    chapters: 3,
  },
  {
    num: '04',
    title: 'Computational Chemistry',
    subtitle: '计算化学',
    tag: 'COMP · CHEM',
    lines: [
      'RDKit Installation & Molecule Handling',
      'Fingerprints & Molecular Similarity',
      'QSAR Modeling & Property Prediction',
    ],
    accent: '#fbbf24',
    glow: '251,191,36',
    bg: 'linear-gradient(155deg, #0f0800 0%, #1e0d00 55%, #78350f 100%)',
    to: '/learn/ch4-rdkit-basics',
    chapters: 3,
  },
  {
    num: '05',
    title: 'AI in Drug Discovery',
    subtitle: 'AI 驱动的药物发现',
    tag: 'AI · PIPELINE',
    lines: [
      'Drug Discovery Pipeline Overview',
      'Target Identification & Validation',
      'Hit → Lead → Candidate Selection',
    ],
    accent: '#f472b6',
    glow: '244,114,182',
    bg: 'linear-gradient(155deg, #0f0008 0%, #250014 55%, #831843 100%)',
    to: '/learn/ch5-drug-pipeline-overview',
    chapters: 3,
  },
  {
    num: '06',
    title: 'ADMET & Drug-likeness',
    subtitle: '类药性与先导优化',
    tag: 'ADMET · DMPK',
    lines: [
      'ADMET: Absorption, Distribution, Metabolism',
      'Drug-likeness Rules & Structural Alerts',
      'Multi-Parameter Optimization (MPO)',
    ],
    accent: '#fb923c',
    glow: '251,146,60',
    bg: 'linear-gradient(155deg, #0f0500 0%, #200a00 55%, #7c2d12 100%)',
    to: '/learn/ch6-admet-deep-dive',
    chapters: 2,
  },
]

// Molecule SVG node/bond data per module
const VIZ = [
  // 01 – Benzene-like hexagon + center (atomic structure)
  {
    nodes: [
      { x: 200, y: 200, r: 30, primary: true },
      { x: 200, y: 95,  r: 14 },
      { x: 292, y: 148, r: 14 },
      { x: 292, y: 252, r: 14 },
      { x: 200, y: 305, r: 14 },
      { x: 108, y: 252, r: 14 },
      { x: 108, y: 148, r: 14 },
    ],
    bonds: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1]],
  },
  // 02 – Zigzag chain with branch (SMILES / cheminformatics)
  {
    nodes: [
      { x: 55,  y: 200, r: 16 },
      { x: 140, y: 140, r: 16 },
      { x: 225, y: 200, r: 24, primary: true },
      { x: 310, y: 140, r: 16 },
      { x: 395, y: 200, r: 16 },
      { x: 225, y: 295, r: 12 },
      { x: 140, y: 265, r: 10 },
    ],
    bonds: [[0,1],[1,2],[2,3],[3,4],[2,5],[1,6]],
  },
  // 03 – 3-layer neural net (AI drug discovery)
  {
    nodes: [
      { x: 75,  y: 130, r: 12 },
      { x: 75,  y: 200, r: 12 },
      { x: 75,  y: 270, r: 12 },
      { x: 210, y: 130, r: 16 },
      { x: 210, y: 200, r: 22, primary: true },
      { x: 210, y: 270, r: 16 },
      { x: 340, y: 200, r: 30, primary: true },
    ],
    bonds: [[0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,6],[4,6],[5,6]],
  },
  // 04 – 3×3 grid lattice (computational / QSAR)
  {
    nodes: [
      { x: 80,  y: 80,  r: 10 },
      { x: 200, y: 80,  r: 10 },
      { x: 320, y: 80,  r: 10 },
      { x: 80,  y: 200, r: 10 },
      { x: 200, y: 200, r: 26, primary: true },
      { x: 320, y: 200, r: 10 },
      { x: 80,  y: 320, r: 10 },
      { x: 200, y: 320, r: 10 },
      { x: 320, y: 320, r: 10 },
    ],
    bonds: [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[0,3],[3,6],[1,4],[4,7],[2,5],[5,8]],
  },
  // 05 – Drug discovery funnel: layered cascade (pipeline stages)
  {
    nodes: [
      { x: 200, y: 60,  r: 28, primary: true },
      { x: 130, y: 150, r: 16 },
      { x: 270, y: 150, r: 16 },
      { x: 90,  y: 240, r: 12 },
      { x: 200, y: 240, r: 20, primary: true },
      { x: 310, y: 240, r: 12 },
      { x: 155, y: 325, r: 10 },
      { x: 200, y: 345, r: 14 },
      { x: 245, y: 325, r: 10 },
    ],
    bonds: [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[4,6],[4,7],[4,8]],
  },
  // 06 – Molecular filter: diamond + radial spokes (ADMET / drug-likeness)
  {
    nodes: [
      { x: 200, y: 200, r: 32, primary: true },
      { x: 200, y: 80,  r: 14 },
      { x: 310, y: 155, r: 14 },
      { x: 310, y: 245, r: 14 },
      { x: 200, y: 320, r: 14 },
      { x: 90,  y: 245, r: 14 },
      { x: 90,  y: 155, r: 14 },
      { x: 200, y: 130, r: 8 },
      { x: 270, y: 200, r: 8 },
      { x: 200, y: 270, r: 8 },
      { x: 130, y: 200, r: 8 },
    ],
    bonds: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,7],[2,8],[4,9],[6,10],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1]],
  },
]

function MoleculeViz({ viz, glow, idx }) {
  const filterId = `mol-glow-${idx}`
  return (
    <svg viewBox="0 0 400 400" width="340" height="340" style={{ overflow: 'visible', flexShrink: 0 }}>
      <defs>
        <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Bonds */}
      {viz.bonds.map(([a, b], i) => (
        <line
          key={i}
          className="atom-bond"
          x1={viz.nodes[a].x} y1={viz.nodes[a].y}
          x2={viz.nodes[b].x} y2={viz.nodes[b].y}
          stroke={`rgba(${glow},0.22)`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}

      {/* Nodes */}
      {viz.nodes.map((n, i) => (
        <g key={i} className="atom-node" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          {n.primary && (
            <circle cx={n.x} cy={n.y} r={n.r + 16}
              fill={`rgba(${glow},0.06)`} />
          )}
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill={`rgba(${glow},${n.primary ? 0.2 : 0.1})`}
            stroke={`rgba(${glow},${n.primary ? 0.7 : 0.38})`}
            strokeWidth={n.primary ? 2 : 1.5}
            filter={n.primary ? `url(#${filterId})` : undefined}
          />
          {n.primary && (
            <circle cx={n.x} cy={n.y} r={n.r * 0.42}
              fill={`rgba(${glow},0.4)`} />
          )}
        </g>
      ))}
    </svg>
  )
}

export default function MolecularDirectory() {
  const navigate = useNavigate()
  const heroRef     = useRef(null)
  const sectionsRef = useRef([])
  const outroRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──────────────────────────────────────────────
      gsap.timeline({ delay: 0.15 })
        .from('.hero-badge',  { y: -24, opacity: 0, duration: 0.5, ease: 'power2.out' })
        .from('.hero-word',   { y: 100, opacity: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out' }, 0.2)
        .from('.hero-rule',   { scaleX: 0, transformOrigin: 'center', duration: 0.55, ease: 'power2.inOut' }, 0.72)
        .from('.hero-sub',    { y: 22, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.88)
        .from('.hero-meta',   { y: 18, opacity: 0, duration: 0.4, ease: 'power2.out' }, 1.05)
        .from('.hero-scroll', { y: 18, opacity: 0, duration: 0.5, ease: 'power2.out' }, 1.35)

      // Looping scroll arrow bounce
      gsap.to('.hero-scroll-arrow', {
        y: 9, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut', delay: 2.0,
      })

      // ── Module sections – scroll-pinned storytelling ────────────────
      sectionsRef.current.forEach((section, i) => {
        if (!section) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: '+=780',
            scrub: 0.65,
            anticipatePin: 1,
          },
        })

        tl
          .from(section.querySelector('.sec-num'),   { x: -110, opacity: 0, duration: 0.3 },        0)
          .from(section.querySelector('.sec-tag'),   { x: -55,  opacity: 0, duration: 0.22 },       0.12)
          .from(section.querySelector('.sec-title'), { y: 65,   opacity: 0, duration: 0.38 },       0.18)
          .from(section.querySelector('.sec-sub'),   { opacity: 0, y: 18,   duration: 0.22 },       0.38)
          .from(section.querySelector('.sec-rule'),  { scaleX: 0, transformOrigin: 'left center', duration: 0.3 }, 0.44)
          .from(section.querySelectorAll('.sec-line'), { x: -38, opacity: 0, stagger: 0.07, duration: 0.22 }, 0.5)
          .from(section.querySelector('.sec-cta'),   { y: 20,   opacity: 0, duration: 0.22 },       0.75)
          // Molecule: bonds first, then nodes pop in
          .from(section.querySelectorAll('.atom-bond'), { opacity: 0, stagger: 0.03, duration: 0.12 }, 0.06)
          .from(section.querySelectorAll('.atom-node'), { opacity: 0, scale: 0,    stagger: 0.07, duration: 0.18, ease: 'back.out(2)' }, 0.14)
      })

      // ── Outro overview grid ─────────────────────────────────────────
      if (outroRef.current) {
        gsap.from(outroRef.current.querySelector('.outro-heading'), {
          y: 45, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: outroRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.from(outroRef.current.querySelectorAll('.outro-card'), {
          y: 55, opacity: 0, stagger: 0.12, duration: 0.65, ease: 'power3.out',
          scrollTrigger: {
            trigger: outroRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div style={{
      background: '#000', overflowX: 'hidden',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    }}>

      {/* ── Fixed nav ──────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.2rem 2.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.045)',
        backdropFilter: 'blur(14px)',
        background: 'rgba(0,0,0,0.6)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <polygon points="14,2 25,8 25,20 14,26 3,20 3,8"
              stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
            <polygon points="14,8 19,11 19,17 14,20 9,17 9,11"
              stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.7rem', letterSpacing: '0.14em', fontWeight: 500 }}>
            DIGITAL CHEMISTRY
          </span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.14)', fontSize: '0.64rem', letterSpacing: '0.1em' }}>
          scroll to explore modules
        </span>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', background: '#000',
      }}>
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)',
            'linear-gradient(90deg,rgba(255,255,255,0.018) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '90px 90px',
        }} />

        {/* Radial ambient */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(60,80,180,0.12) 0%, transparent 70%)',
        }} />

        <div className="hero-badge" style={{
          fontSize: '0.58rem', letterSpacing: '0.22em', fontWeight: 600,
          color: 'rgba(255,255,255,0.28)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '0.3rem 1rem', marginBottom: '2.2rem',
        }}>
          IMPERIAL COLLEGE · MSC DIGITAL CHEMISTRY
        </div>

        {/* Split title for word-by-word stagger */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.3em', marginBottom: '2rem' }}>
          {['Module', 'Directory'].map((word, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <div className="hero-word" style={{
                fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)',
                fontWeight: 900, color: '#fff',
                letterSpacing: '-0.045em', lineHeight: 1.05,
              }}>{word}</div>
            </div>
          ))}
        </div>

        <div className="hero-rule" style={{
          width: '11rem', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
          marginBottom: '1.6rem',
        }} />

        <p className="hero-sub" style={{
          color: 'rgba(255,255,255,0.32)', fontSize: '0.84rem',
          letterSpacing: '0.06em', marginBottom: '0.55rem', textAlign: 'center',
        }}>
          Chemistry · Informatics · Computation · AI Drug Discovery · ADMET
        </p>

        <p className="hero-meta" style={{
          color: 'rgba(255,255,255,0.14)', fontSize: '0.68rem',
          letterSpacing: '0.15em', marginBottom: '5rem',
        }}>
          6 MODULES · 17 CHAPTERS
        </p>

        {/* Scroll indicator */}
        <div className="hero-scroll" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem' }}>
          <svg className="hero-scroll-arrow" width="18" height="30" viewBox="0 0 18 30" fill="none">
            <rect x="7.5" y="1" width="3" height="16" rx="1.5" fill="rgba(255,255,255,0.28)" />
            <path d="M9 26 L4 20 M9 26 L14 20"
              stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.58rem', letterSpacing: '0.18em' }}>
            SCROLL
          </span>
        </div>
      </section>

      {/* ── MODULE SECTIONS ────────────────────────────────────────── */}
      {MODULES.map((m, i) => (
        <section
          key={i}
          ref={el => { sectionsRef.current[i] = el }}
          style={{
            height: '100vh', display: 'flex', alignItems: 'center',
            background: m.bg, position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px)',
              'linear-gradient(90deg,rgba(255,255,255,0.013) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '80px 80px',
          }} />

          {/* Ambient glow blob (right side) */}
          <div style={{
            position: 'absolute', right: '-5%', top: '50%',
            transform: 'translateY(-50%)',
            width: 520, height: 520, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${m.glow},0.1) 0%, transparent 68%)`,
            pointerEvents: 'none',
          }} />

          {/* Left progress bar */}
          <div style={{
            position: 'absolute', left: '2rem', top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
          }}>
            {MODULES.map((_, j) => (
              <div key={j} style={{
                width: j === i ? 2 : 1,
                height: j === i ? 26 : 11,
                background: j === i ? `rgba(${m.glow},0.85)` : 'rgba(255,255,255,0.14)',
                borderRadius: 1,
              }} />
            ))}
          </div>

          {/* Content wrapper */}
          <div style={{
            width: '100%', maxWidth: 1180, margin: '0 auto',
            padding: '0 4rem 0 5.5rem',
            display: 'flex', alignItems: 'center', gap: '2.5rem',
          }}>
            {/* ── Left: text content ── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Large ghost number */}
              <div className="sec-num" style={{
                fontSize: 'clamp(5.5rem, 13vw, 11rem)',
                fontWeight: 900, lineHeight: 0.85,
                color: `rgba(${m.glow},0.09)`,
                letterSpacing: '-0.06em',
                marginBottom: '0.6rem', marginLeft: '-0.08em',
              }}>{m.num}</div>

              {/* Tag chip */}
              <div className="sec-tag" style={{
                display: 'inline-block', marginBottom: '1.15rem',
                fontSize: '0.57rem', letterSpacing: '0.2em', fontWeight: 700,
                color: `rgba(${m.glow},0.9)`,
                border: `1px solid rgba(${m.glow},0.32)`,
                borderRadius: 20, padding: '0.25rem 0.75rem',
              }}>{m.tag}</div>

              {/* Module title */}
              <div className="sec-title" style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                fontWeight: 800, color: '#fff',
                lineHeight: 1.1, letterSpacing: '-0.03em',
                marginBottom: '0.5rem',
              }}>{m.title}</div>

              {/* Subtitle */}
              <div className="sec-sub" style={{
                fontSize: '0.76rem', letterSpacing: '0.08em',
                color: `rgba(${m.glow},0.82)`, marginBottom: '2rem',
              }}>{m.subtitle}</div>

              {/* Accent rule */}
              <div className="sec-rule" style={{
                height: 1,
                background: `linear-gradient(90deg, rgba(${m.glow},0.45), rgba(${m.glow},0.04))`,
                marginBottom: '1.6rem',
              }} />

              {/* Topic lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.6rem' }}>
                {m.lines.map((line, li) => (
                  <div key={li} className="sec-line" style={{
                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                    color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', lineHeight: 1.5,
                  }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: `rgba(${m.glow},0.72)`, flexShrink: 0,
                    }} />
                    {line}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="sec-cta"
                onClick={() => navigate(m.to)}
                style={{
                  padding: '0.78rem 1.9rem',
                  background: `rgba(${m.glow},0.1)`,
                  border: `1px solid rgba(${m.glow},0.38)`,
                  borderRadius: 8, color: m.accent,
                  fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.05em', cursor: 'pointer',
                  transition: 'background 0.22s, border-color 0.22s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `rgba(${m.glow},0.2)`
                  e.currentTarget.style.borderColor = `rgba(${m.glow},0.65)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `rgba(${m.glow},0.1)`
                  e.currentTarget.style.borderColor = `rgba(${m.glow},0.38)`
                }}
              >
                Begin Module {m.num} →
              </button>
            </div>

            {/* ── Right: molecule visualization ── */}
            <MoleculeViz viz={VIZ[i]} glow={m.glow} idx={i} />
          </div>

          {/* Bottom-right: chapter hint */}
          <div style={{
            position: 'absolute', bottom: '2.5rem', right: '4.5rem',
            color: 'rgba(255,255,255,0.11)', fontSize: '0.6rem', letterSpacing: '0.1em',
          }}>
            {m.chapters} chapters · module {m.num}
          </div>
        </section>
      ))}

      {/* ── OUTRO / OVERVIEW GRID ──────────────────────────────────── */}
      <section ref={outroRef} style={{
        minHeight: '100vh', padding: '9rem 4rem 7rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#030303',
      }}>
        <div className="outro-heading" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{
            fontSize: '0.58rem', letterSpacing: '0.22em', fontWeight: 600,
            color: 'rgba(255,255,255,0.22)', marginBottom: '1rem',
          }}>LEARNING PATH OVERVIEW</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.03em',
            marginBottom: '0.65rem', margin: '0 0 0.65rem',
          }}>Your Complete Journey</h2>
          <p style={{
            color: 'rgba(255,255,255,0.28)', fontSize: '0.8rem', letterSpacing: '0.04em',
          }}>六个模块 · 系统学习 · 从化学基础到 AI 药物发现</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.2rem', maxWidth: 980, width: '100%',
        }}>
          {MODULES.map((m, i) => (
            <div
              key={i}
              className="outro-card"
              onClick={() => navigate(m.to)}
              style={{
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.024)',
                border: `1px solid rgba(${m.glow},0.14)`,
                borderRadius: 14, padding: '1.75rem',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.28s, background 0.28s, transform 0.28s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `rgba(${m.glow},0.07)`
                e.currentTarget.style.borderColor = `rgba(${m.glow},0.38)`
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.024)'
                e.currentTarget.style.borderColor = `rgba(${m.glow},0.14)`
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Ghost number watermark */}
              <div style={{
                position: 'absolute', bottom: '-1.2rem', right: '-0.4rem',
                fontSize: '6rem', fontWeight: 900, lineHeight: 1,
                color: `rgba(${m.glow},0.055)`, letterSpacing: '-0.04em',
                pointerEvents: 'none', userSelect: 'none',
              }}>{m.num}</div>

              <div style={{
                fontSize: '0.53rem', letterSpacing: '0.2em', fontWeight: 700,
                color: `rgba(${m.glow},0.78)`, marginBottom: '0.55rem',
              }}>{m.tag}</div>
              <div style={{
                fontSize: '1.15rem', fontWeight: 700, color: '#fff',
                letterSpacing: '-0.01em', marginBottom: '0.25rem',
              }}>{m.title}</div>
              <div style={{
                fontSize: '0.7rem', color: 'rgba(255,255,255,0.52)',
                marginBottom: '1.3rem',
              }}>{m.subtitle}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  color: 'rgba(255,255,255,0.42)', fontSize: '0.63rem', letterSpacing: '0.06em',
                }}>{m.chapters} chapters</span>
                <span style={{ color: m.accent, fontSize: '0.72rem', fontWeight: 600 }}>Enter →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
