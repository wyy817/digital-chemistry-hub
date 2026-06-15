import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'

const PATHS = [
  {
    id: 'chemistry-fundamentals',
    icon: '⚗️',
    title: 'Chemistry Fundamentals',
    subtitle: '化学基础 · Key Concepts in Chemistry',
    priority: '🔴 最高优先',
    totalLessons: 2,
    firstLesson: '/learn/ch1-atomic-structure',
    locked: false,
  },
  {
    id: 'cheminformatics',
    icon: '🔬',
    title: 'Cheminformatics',
    subtitle: '化学信息学 · Data Analytics in Chemistry',
    priority: '🔴 最高优先',
    totalLessons: 8,
    firstLesson: null,
    locked: true,
  },
  {
    id: 'ai-drug-discovery',
    icon: '💊',
    title: 'AI in Drug Discovery',
    subtitle: 'AI 药物发现 · AI in Chemistry',
    priority: '🔴 最高优先',
    totalLessons: 12,
    firstLesson: null,
    locked: true,
  },
  {
    id: 'ai-materials',
    icon: '🧱',
    title: 'AI in Materials Science',
    subtitle: 'AI 材料科学 · Materials',
    priority: '🟠 较高',
    totalLessons: 10,
    firstLesson: null,
    locked: true,
  },
]

function daysUntil(targetDate) {
  const now = new Date()
  const target = new Date(targetDate)
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)))
}

export default function Dashboard() {
  const { user } = useAuth()
  const [progress, setProgress] = useState({})

  useEffect(() => {
    if (!user) return
    supabase
      .from('progress')
      .select('lesson_id, status, quiz_score')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) {
          const map = {}
          data.forEach(p => { map[p.lesson_id] = p })
          setProgress(map)
        }
      })
  }, [user])

  const completedFundamentals = ['ch1-1-atomic-structure', 'ch1-2-chemical-bonds']
    .filter(id => progress[id]?.status === 'completed').length

  const daysLeft = daysUntil('2026-09-01')

  return (
    <Layout progress={progress} showAnnotations={false}>
      <div className="dashboard">
        {/* Greeting */}
        <div className="dashboard-greeting">
          <h1>欢迎回来 👋</h1>
          <p>坚持每天学习，入学前打好基础。</p>
        </div>

        {/* Countdown */}
        <div className="countdown-card">
          <div className="countdown-icon">🎓</div>
          <div>
            <div className="countdown-days">{daysLeft} 天</div>
            <div className="countdown-label">距离 IC Digital Chemistry MSc 入学（2026年9月1日）</div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="dashboard-section-title">学习路径 Learning Paths</div>
        <div className="path-cards">
          {PATHS.map(path => {
            const completed = path.id === 'chemistry-fundamentals' ? completedFundamentals : 0
            const pct = path.totalLessons > 0 ? Math.round((completed / path.totalLessons) * 100) : 0
            return (
              <div key={path.id} className={`path-card ${path.locked ? 'locked' : ''}`}>
                <div className="path-card-header">
                  <span className="path-card-icon">{path.icon}</span>
                  <div>
                    <div className="path-card-title">{path.title}</div>
                    <div className="path-card-subtitle">{path.subtitle}</div>
                  </div>
                </div>
                <div>
                  <div className="path-progress-bar">
                    <div className="path-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="path-progress-label" style={{ marginTop: '4px' }}>
                    {completed}/{path.totalLessons} 节完成 · {pct}%
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{path.priority}</span>
                  {path.locked ? (
                    <span className="path-card-action disabled">即将上线 →</span>
                  ) : (
                    <Link to={path.firstLesson} className="path-card-action">
                      {pct > 0 ? '继续学习' : '开始学习'} →
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick start */}
        <div className="dashboard-section-title">推荐现在学 · Start Here</div>
        <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.25rem', background: 'var(--color-surface)', maxWidth: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>⚛️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                Ch1.1 — Atomic Structure
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                原子结构 · 25分钟 · 🟢 入门 · 包含 Quick Check 测试
              </div>
              <Link
                to="/learn/ch1-atomic-structure"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'var(--color-primary)', color: 'white',
                  padding: '0.45rem 1rem', borderRadius: '8px',
                  textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
                }}
              >
                {progress['ch1-1-atomic-structure']?.status === 'completed' ? '复习这节' : '开始学习'} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
